import mongoose from "mongoose";

const imagesCollection = "images";

const imagesSchema = new mongoose.Schema({
    image_url:{type:String, required:true},
    image_alt:{type:String, required:true}
});


export const imagesModel = mongoose.models.images || mongoose.model(imagesCollection, imagesSchema)