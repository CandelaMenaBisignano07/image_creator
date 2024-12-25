export type ImageId = `/${string}-${string}-${string}-${string}-${string}.webp`
export interface Image{
    image_url:ImageId,
    image_alt:string
};
