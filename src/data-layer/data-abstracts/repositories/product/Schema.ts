import { Schema } from "mongoose";
// import { MongooseAccess } from "../../adapter/MongoAccess";
import { DocumentProduct } from "./Document";
import * as faker from 'faker'
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let productSchema:Schema=new Schema({
  
    title: { type: String},
    description: { type: String},
    image:{type:String},
    refcat:{type:String},
    ref:{type:String},
    
    qte:{type:Number},
    price:{type:Number},
    createdAt:{type:Date},
    updatedAt:{type:Date}
    
})

productSchema.pre("save",(next:any)=>{
    if(this._doc){
        let doc=<DocumentProduct>this._doc;
        let now=new Date();

        if(!doc.createdAt){
            doc.createdAt=now;
        }
        doc.lastUpdated=now;
    }
    next();
})

export {productSchema};