import { Image } from "@/app/types/types";
import ImagesManager from "../dao/managers/images.manager";

const manager = new ImagesManager();

export const getImagesService = async()=>{
    const myImages = await manager.getImages();
    return myImages;
};

export const postImageService = async(image:Image)=>{
    const myNewImages = await manager.postImage(image);
    return myNewImages;
};