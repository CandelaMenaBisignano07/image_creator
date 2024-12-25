import { Image} from "@/app/types/types";
import { getImagesService, postImageService } from "../services/images.service";


export const getImagesController = async()=>{
    const myImages = await getImagesService();
    return myImages;
};

export const postImageController = async(image:Image)=>{
    const myNewImages = await postImageService(image);
    return myNewImages;
};

