import crypto from "crypto";
import path from "path";
import {ImageId } from "../../types/types";
export const generatePaths = ():[ImageId, string]=>{
    const id = crypto.randomUUID();
    const myFsPath = path.join(process.cwd(), 'public', `${id}.webp`)
    const myPublicPath:ImageId = `/${id}.webp`
    return [myPublicPath, myFsPath]
};
export function isError(error:unknown| Error): error is Error{
    return error instanceof Error
}