
import { Model,model } from "mongoose";
import { MongooseAccess } from "../../../adapter/MongoAccess"
import { DocumentCategory } from "./Document";
import { categorySchema } from "./Schema";

export type CategoryRepos = Model<DocumentCategory>;
//name of database marketplace
export const categoryRepos:CategoryRepos = MongooseAccess.mongooseConnection.model<DocumentCategory>("category", categorySchema);

