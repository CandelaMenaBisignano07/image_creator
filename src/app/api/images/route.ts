import { getImagesController, postImageController } from "../controllers/images.controllers";
import {connect} from "../lib/connection"
import { Image } from "@/app/types/types";
import { isError } from "@/app/lib/utils/utils";
export async function GET(request:Request): Promise<Response>{
    try {
        await connect()
        const myImages = await getImagesController();
        return Response.json({status:'success', payload:myImages});
    } catch (error: unknown) {
        if(isError(error)) return Response.json({status:'error', error:error.message}, {status:500});
        else  return Response.json({status:'error', error:"unknown error"}, {status:500});
    }
};

export async function POST(request:Request): Promise<Response>{
    const image : unknown | undefined = await request.json();
    if(image == undefined) return Response.json({status:'error', error:"body was not recieved"}, {status:400});
    const {image_url, image_alt} = image as Image
    try {
        await connect()
        if(!image || !image_alt || !image_url) return Response.json({status:'error', error:"a campus was forgotten"}, {status:400});
        const myNewImages = await postImageController({image_url, image_alt});
        return Response.json({status:"succeed", payload:myNewImages});
    } catch (error: unknown) {
        if(isError(error)) return Response.json({status:'error', error:error.message}, {status:500});
        else return Response.json({status:'error', error:"unknown error"}, {status:500});
    }
};