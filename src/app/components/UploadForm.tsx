type FormProps={
    handleSubmit: (formData:FormData)=>Promise<void>
}
import Form from "next/form"
export default async function UploadForm({handleSubmit: handleSubmitAction}: FormProps) {
  // const [image, setImage] = useState<null|Image>(null)
  // const [isPending, startTransition] = useTransition() //usar en casos de ui con operaciones costosa y cuando el usuario interactúa mientras la UI se actualiza (en este caso no debe hacerlo entonces lo uamos)
  //const handleFormSubmit = async(formData: FormData)=>{
    // startTransition(async()=>{
    //const newImage = await handleSubmit(formData);
    //   setImage(newImage)
    // })
  //};
  return(
    <>
      <div>
        <Form action={handleSubmitAction}>
          <input name="prompt" placeholder="generate a new image"/>
          <button aria-autocomplete="none" type="submit">generar</button>
        </Form>
      </div>
      {/* <div className="genImageContainer">
        {
          isPending ? <p>...loading</p> : (image ? <img src={image.image_url} alt={image.image_alt} width={200} height={200} /> : <p>no hay imagen tdva</p>)
        }
      </div> */}
    </>
  )
}
