import { configs } from "@/app/lib/configs";
import mongoose from "mongoose";
import { isError } from "@/app/lib/utils/utils";
export async function connect(){
    try {
        await mongoose.connect(configs.mongoUrl as string);
        console.log('connected');
    } catch (error) {
        if(isError(error)) throw new Error(error.message)
        else throw new Error('unknown error')
    }
}