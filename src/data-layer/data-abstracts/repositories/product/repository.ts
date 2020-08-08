
import { Model,model } from "mongoose";
import { MongooseAccess } from "../../../adapter/MongoAccess"
import { DocumentProduct } from "./Document";
import { productSchema } from "./Schema";

export type ProductRepos = Model<DocumentProduct>;
//name of database marketplace
export const productRepos:ProductRepos = MongooseAccess.mongooseConnection.model<DocumentProduct>("products", productSchema);

