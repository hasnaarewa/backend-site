import { IDocument } from "../data-abstracts/repositories/IDocument";
import { modelRepos } from "../data-abstracts/repositories/Repository";
import * as mongoose from "mongoose";
import * as config from 'config'
import { v4 as uuidv4 } from 'uuid';
import { Processing } from "../../service-layer/imags/services";
import { MailerService } from "../../service-layer/mailer";
import { HttpError } from "routing-controllers";
import { categoryRepos } from "../data-abstracts/repositories/category";
import { productRepos } from "../data-abstracts/repositories/product";
import { DocumentCategory } from "data-layer/data-abstracts/repositories/category/Document";
import { DocumentProduct } from "data-layer/data-abstracts/repositories/product/Document";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = config.get('jwt.secret')
export class modelDataAgents {
  constructor() { }


  public async activateUser(tkt: any): Promise<any> {
    let decoded

    try {
      decoded = jwt.verify(tkt, secret);

    } catch (err) {

      throw new HttpError(500, "error occured ,try again later.")
    }
    let updated = await modelRepos.findOneAndUpdate({ email: decoded.data.email }, {
      activated: true
    })
    if (updated && !updated.activated) {
      let user = await modelRepos.findOne({ email: decoded.data.email })
      return { user: user, status: "your account was successfully activated" }
    }
    throw new HttpError(500, "error occured ,try again later.")
  }
  

  /**
   * 
   * @param idcat 
   * @param request 
   * @param file 
   */
  public async saveProduct(idcat: any, request: any,file:any): Promise<any> {
    let imgid = uuidv4()
    let exist = await categoryRepos.findById(idcat)
    console.log(exist)
    if (!exist || exist.errors) {
      throw new HttpError(500, "error occured ,try again later.")
    }
    let prod=<DocumentProduct>{
      title: request.title,
      description: request.description,
      qte:request.qte,
      ref:exist.ref,
      price:request.price,
      refcat: idcat,
      image:imgid
    }
    let saved = await productRepos.create(prod)
    if (saved) {
 try {
  await Processing.uploadImageProduct(file,imgid,exist.ref,exist.id)
  return await productRepos.find({ refcat: idcat })
 } catch (error) {
  throw new HttpError(500, "error occured ,try again later.")
 }
   
    }
    throw new HttpError(500, "error occured ,try again later.")
  }

  /**
   * 
   * @param idmarketplace 
   * @param request 
   */
  public async saveCategory(idmarketplace: any, request: any,file:any): Promise<any> {
    let imgid = uuidv4()
    let exist = await modelRepos.findOne({ ref: idmarketplace })
    if (!exist || exist.errors) {
      throw new HttpError(500, "error occured ,try again later.")
    }
    let cat=<DocumentCategory>{
      title: request.category_title,
      description: request.category_description,
      ref: idmarketplace,
      image:imgid
    }
    let saved = await categoryRepos.create(cat)
    if (saved) {
 try {
  await Processing.uploadImageCategory(file,imgid,idmarketplace,saved.id)
  return await categoryRepos.find({ ref: idmarketplace })
 } catch (error) {
  throw new HttpError(500, "error occured ,try again later.")
 }
   
    }
    throw new HttpError(500, "error occured ,try again later.")
  }

  /**
   * 
   * @param idmarketplace 
   */
  public async getAllCategory(idmarketplace: any): Promise<any> {
   
    let exist = await modelRepos.findOne({ ref: idmarketplace })
    if (!exist || exist.errors) {
      throw new HttpError(500, "error occured ,try again later.")
    }

    return await categoryRepos.find({ ref: idmarketplace })

  }
  public async getAllproducts(idmarketplace: any): Promise<any> {
   
    let exist = await modelRepos.findOne({ ref: idmarketplace })
    if (!exist || exist.errors) {
      throw new HttpError(500, "error occured ,try again later.")
    }

    return await productRepos.find({ ref: idmarketplace })

  }
  /**
   * 
   * @param token 
   */
  public async getUser(token: any): Promise<any> {
    let decoded;
    try {
      decoded = jwt.verify(token, secret);

    } catch (err) {
      throw new HttpError(500, "error occured ,try again later.")
    }

    let u = await modelRepos.findOne({ email: decoded.data.email }, {
      access_token: 1,
      ref: 1,
      email: 1,
      name: 1,
      type: 1,
      _id: 0
    })
    if (u) {
      return u
    }
    throw new HttpError(500, "error occured ,try again later.")
  }
  public async getMArketplaceStatus(id: any): Promise<any> {
    console.log(id)
    let result = await modelRepos.findById(id)
    console.log(result)
    if (!result) {
      throw new HttpError(500, "error occured ,try again later.")
    }
    if (!result.activated) {
      throw new HttpError(500, "error occured ,try again later.")

    }
    return result

  }

  public async deleteCategory(id: any,ref:any): Promise<any> {
    let result=await categoryRepos.deleteOne({_id:id,ref:ref})
    if(result){
      return await categoryRepos.find({ref:ref})
    }
    throw new HttpError(500, "error occured ,try again later.")


  }
  /**
   * 
   * @param request 
   */
  public async authUser(request: any): Promise<any> {
   
    let user = await modelRepos.findOne({ email: request.e })
    if (user.errors || !user.activated) {
      console.log("errror")
      throw new HttpError(500, "error occured ,try again later.")
    }
    try {
      await bcrypt.compare(user.password, user.password)
    } catch (error) {
      throw new HttpError(500, "error occured ,try again later.")
    }

    let token = await jwt.sign({
      data: {
        email: user.email,
        ref: user.ref
      }
    }, secret, { expiresIn: '30d' });
    let updated = await modelRepos.updateOne({ ref: user.ref }, {
      access_token: token
    })
    if (updated) {
      let u = await modelRepos.findOne({ ref: user.ref }, {
        access_token: 1,
        ref: 1,
        email: 1,
        _id: 0
      })
      return u
    }
    throw new HttpError(500, "error occured ,try again later.")
  }


  /**
   *
   * @param account
   */
  async saveMarketplace(account: any, file: any): Promise<any> {
    let imgid = uuidv4()
      let r=uuidv4()
    let haspassword = bcrypt.hashSync(account.password, 10)
    let token = this.generateSecuretoken(account.email)
    account.secure_token = token
    account.image = imgid
    account.ref = r
    account.password = haspassword
    let result = await modelRepos.create(account)
    if (result) {
      let isimageSaved = await Processing.uploadImage(file, r,imgid)
      if (isimageSaved) {
        MailerService.send(result.id, account.name, account.email, token)
        return result
      }
    }

    throw new HttpError(500, "error occured ,try again later.")



  }
  /**
   * 
   * @param email 
   */
  public generateSecuretoken(email) {

    //  Const res=await crypto.randomBytes(48);
    const res = jwt.sign(
      {
        data: {
          email,
        },
      },
      secret,
      { expiresIn: 60 * 60 * 24 },
    );
    return res;
  }
}
