"use server"
import { Image, ImageId} from "../types/types";
import fs from "fs/promises";
import { generatePaths, isError } from "../lib/utils/utils";

type MyResponse={
    status:string,
    payload:Image[]
}
export const getImages = async(): Promise<Image[]|never>  =>{
    try {
        const imagesFetch = await fetch('http://localhost:3000/api/images');
        if(!imagesFetch.ok){
            throw new Error(`error ${imagesFetch.status}`);
        }
        const toJson: MyResponse = await imagesFetch.json()
        return toJson.payload
    } catch (error){
        if(isError(error)) throw new Error(error.message)
        else throw new Error("unknown error.")
    }
};
export const postImage = async(image:Image):Promise<Image|never>=>{
    try {

        const imagePostFetch = await fetch('http://localhost:3000/api/images',{
            method:'POST',
            body:JSON.stringify(image)
        });
        if(!imagePostFetch.ok){
            throw new Error(`error ${imagePostFetch.status}`);
        }
        const toJson = await imagePostFetch.json();
        if(typeof toJson.payload == "object"){
            const {image_url, image_alt} = toJson.payload;
            return {image_alt, image_url}
        }else{
            throw new Error(`${imagePostFetch.status}`)
        }
    } catch (error){
        if(isError(error)) throw new Error(error.message)
        else throw new Error("unknown error.")
    }
};

export const uploadFsFile = async(image:Response):Promise<ImageId|never>=>{
    try {
        const buffer = await image.arrayBuffer();
        const myPaths = generatePaths();
        await fs.writeFile(myPaths[1],Buffer.from(buffer))
        return myPaths[0]
    } catch (error) {
        if(isError(error)) throw new Error(error.message)
        else throw new Error("unknown error.")
    }
}