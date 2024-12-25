import { Image } from "@/app/types/types";
import { imagesModel } from "../models/images.model"
export default class ImagesManager{
    getImages=async()=>{
        const myImages = await imagesModel.find({}).lean();
        return myImages
    };

    postImage=async(image:Image)=>{
        const myNewImages = await imagesModel.create(image);
        return myNewImages;
    };
}