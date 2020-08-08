import { Schema } from "mongoose";
// import { MongooseAccess } from "../../adapter/MongoAccess";
import { DocumentCategory } from "./Document";
/**
 * MongooseSchema
 * @type {"mongoose".Schema}
 * @private
 */
let categorySchema:Schema=new Schema({
  
    title: { type: String},
    description: { type: String},
    image:{type:String},
    ref:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date}
    
})

categorySchema.pre("save",(next:any)=>{
    if(this._doc){
        let doc=<DocumentCategory>this._doc;
        let now=new Date();

        if(!doc.createdAt){
            doc.createdAt=now;
        }
        doc.lastUpdated=now;
    }
    next();
})

export {categorySchema};