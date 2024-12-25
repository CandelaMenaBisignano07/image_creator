"use server"

import Replicate from "replicate"
const client = new Replicate({
    auth:configs.replicateSecretKey
})
import { WebhookEventType } from "replicate";
import { configs } from "../lib/configs";
const sleep = (seconds:number): Promise<void> => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const postPredictionFile = async(prompt:string):Promise<Response|never|void>=>{
    try {
        const options:{webhook: string, input: { prompt: string },webhook_events_filter: WebhookEventType[], model: string} = {
            webhook: "https://z7kcddbk-3000.brs.devtunnels.ms/api/webhook",
            input: { prompt },
            webhook_events_filter: ["completed"],
            model: "black-forest-labs/flux-schnell",
        };
        let prediction = await client.predictions.create(options);
        while(!(["succeeded", "failed"].includes(prediction.status))){
            sleep(4)
            prediction = await client.predictions.get(prediction.id);
        };
        let image;
        if(prediction.status == "succeeded"){
            image = await client.fetch(prediction.output[0]);
            return image;
        }else return console.log('failed')
    } catch (error) {
        if(error instanceof Error) throw new Error(error.message)
        else throw new Error("unknown error.")
    }
}