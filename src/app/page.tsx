import { getImages, postImage, uploadFsFile } from "./actions/images";
import { postPredictionFile } from "./actions/predictions";
import { revalidatePath } from "next/cache";
import UploadForm from "./components/UploadForm";
import { isError } from "./lib/utils/utils";
export default async function Home() {
  const myImages = await getImages();
  const handleSubmit = async(formData:FormData): Promise<void>=>{
    "use server"
    try {
      const prompt = formData.get("prompt");
      if(prompt !== null && typeof prompt === 'string'){
        let image = await postPredictionFile(prompt);
        if(image instanceof Response){
          const image_url = await uploadFsFile(image);
          await postImage({image_alt: prompt, image_url});
          revalidatePath('/')
        }else{
          throw new Error('prediction wasnt succeeded')
        }
      }else{
        throw new Error('prompt isnt valid')
      }
    } catch (error) {
      if(isError(error)) throw new Error(error.message)
      else throw new Error("unknown error.")
    }
  }
  return (
    <>
      <main>
        <section className="formContainer">
          <UploadForm handleSubmit={handleSubmit}/>
        </section>
        <section>
          <ul className="gridContainerImages">
            {
              myImages.length > 0 ? myImages.map((i,index)=><li key={index}><a href={i.image_url} target="_blank"><img width={100} height={100} alt={i.image_alt} src={i.image_url}/></a></li>).reverse() : <p>no hay imagenes</p>
            }
          </ul>
        </section>
      </main>
    </>
  );
}
