// import { Request } from 'express-serve-static-core';
// tslint:disable-next-line: max-line-length
import { Request, Response } from 'express';
// tslint:disable-next-line: max-line-length
import {
  Body,
  Controller,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
  HttpError,
  UploadedFile,
} from 'routing-controllers';

import { IModelRequest } from '../request/IModelRequest';
import { MyMiddleware } from '../../middleware/custom-middleware/myMiddleware'
import { modelDataAgents } from '../../data-layer/data-agents/modelDataAgents'
import { modelRepos } from '../../data-layer/data-abstracts/repositories';
import { Processing } from '../../service-layer/imags/services';

@JsonController('/marketplace')
@UseBefore(MyMiddleware)
export class modelController {
  private modelDataAgent: modelDataAgents;
  constructor() {
    this.modelDataAgent = new modelDataAgents();
  }

  @Get('/user/me')
  public async User(
    @Req() req: any,
    @Res() res: any,
  ) {

    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined

    if (!token) {
      throw new HttpError(401, "you are not authorized")
    }
    const result = await this.modelDataAgent.getUser(token)
    if (result) {
      return res.json(result)
    }
    else {
      throw result
    }

  }

  @Post('/signin')
  public async auth(

    @Body() request: any,
    @Req() req: any,
    @Res() res: any,
  ) {

    if (!request.pwd || !request.e) {
      throw new HttpError(422, "missing required parameters")
    }
    let result = await this.modelDataAgent.authUser(request)
    if (result) {
      return res.json(result)
    }
    throw new HttpError(500, "error occured ,try again later.")
  }

  /**
   *
   * @param request
   * @param response
   */
  @Post('/register')
  public async createName(
    @UploadedFile('image') file: any,
    @Body() request: IModelRequest, // email,ad
    @Req() req: any,
    @Res() res: any,
  ) {

    if (!file) {
      throw new HttpError(422, "missing required parameters [image]")
    }

    if (!request.name || !request.email || !request.password
      || !request.type || !request.color1 || !request.color1 ||
      !request.color2) {
      throw new HttpError(422, "missing required parameters")
    }


    let irecordsaved = await this.modelDataAgent.saveMarketplace(request, file)
    if (irecordsaved) {

      let obj = {
        message: "we have just sent confirmation email to"
      }
      return res.json(obj)
    }

    throw new HttpError(500, "error occured please try again later code 500")

  }


  @Post('/user/activate')
  public async activateUser(

    @Body() request: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    if (!request.tkt) {
      throw new HttpError(422,"error occured")
    }
    
    let result=await this.modelDataAgent.activateUser(request.tkt)
    if(result){
      return res.json(result)
    }

    throw new HttpError(500, "error occured ,try again later.")

  }
  @Delete('/:idmarket/category/:idcat')
  public async DeleteCategory(
    @Param("idcat") idcat: string,
    @Param("idmarket") idmarket: string,
    @Req() req: any,
    @Res() res: any,
  ) {
    let result=await this.modelDataAgent.deleteCategory(idcat,idmarket)
    if(result){
      return res.json(result)
    }else{
      throw result
    }


    }
  @Post('/:idmarketplace/category')
  public async saveNewCategory(
    @UploadedFile('image') file: any,
    @Param("idmarketplace") idmarketplace: string,
    @Body() request: any, // email,ad
    @Req() req: any,
    @Res() res: any,
  ) {

    if (!file || !request.category_title || !request.category_description) {
      throw new HttpError(422, "missing required parameters [image]")
    }
    let result = await this.modelDataAgent.saveCategory(idmarketplace, request,file)
    if (result) {
      return res.json(result)
    } else {
      throw result
    }


  }

  @Post('/:idcategory/product')
  public async saveNewProduct(
    @UploadedFile('image') file: any,
    @Param("idcategory") idcategory: string,
    @Body() request: any, // email,ad
    @Req() req: any,
    @Res() res: any,
  ) {

    if (!file || !request.title || !request.description) {
      throw new HttpError(422, "missing required parameters [image]")
    }
    let result = await this.modelDataAgent.saveProduct(idcategory, request,file)
    if (result) {
      return res.json(result)
    } else {
      throw result
    }


  }
  @Get('/:idmarketplace/category')
  public async getAllCategory(
    @UploadedFile('image') file: any,
    @Param("idmarketplace") idmarketplace: string,
    @Req() req: any,
    @Res() res: any,
  ) {


    let result = await this.modelDataAgent.getAllCategory(idmarketplace)
    if (result) {
      return res.json(result)
    } else {
      throw result
    }


  }

  @Get('/:idmarketplace/products')
  public async getAllproducts(
    @Param("idmarketplace") idmarketplace: string,
    @Req() req: any,
    @Res() res: any,
  ) {


    let result = await this.modelDataAgent.getAllproducts(idmarketplace)
    if (result) {
      return res.json(result)
    } else {
      throw result
    }


  }
  @Get('/:idmarketplace/status')
  public async getStatus(
    @Param("idmarketplace") idmarketplace: string,
    @Body() request: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    console.log(idmarketplace)
    if(!idmarketplace){
      throw new HttpError(422, "error occured ,try again later.")

    }
    let marketplace=await this.modelDataAgent.getMArketplaceStatus(idmarketplace)
    if(marketplace){
      return res.json(marketplace)
    }
    else{
      throw marketplace
    }

  }
}