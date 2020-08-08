import mongoose = require("mongoose");

export interface DocumentProduct extends mongoose.Document {
    title: string;
    description: string;
    image: string;
    refcat: string;
    ref:string;
    qte:number;
    price:number;
    createdAt: Date;
    lastUpdated: Date;
}
