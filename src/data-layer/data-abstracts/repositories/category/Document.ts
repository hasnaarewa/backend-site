import mongoose = require("mongoose");

export interface DocumentCategory extends mongoose.Document {
    title: string;
    description: string;
    image: string;
    ref: string;
    createdAt: Date;
    lastUpdated: Date;
}
