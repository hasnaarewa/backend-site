import mongoose = require("mongoose");

export interface IDocument extends mongoose.Document {
  name: string;
  address1: string;
  address2: string;
  type: string;
  color1: string;
  image:string;
  color2: string;
  activated:boolean;
  email: string;
  password: string;
  access_token: string,
  ref: string,
  createdAt: Date;
  lastUpdated: Date;
}
