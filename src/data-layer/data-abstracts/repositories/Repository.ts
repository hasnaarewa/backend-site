
import { Model,model } from "mongoose";
import { MongooseAccess } from "../../adapter/MongoAccess"
import { IDocument } from "./IDocument";
import { modelSchema } from "./Schema";

export type ModelRepos = Model<IDocument>;
//name of database marketplace
export const modelRepos:ModelRepos = MongooseAccess.mongooseConnection.model<IDocument>("marketplace", modelSchema);

