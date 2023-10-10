import axios,{AxiosResponse} from "axios";

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || ""
const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME || ""

export interface IResponse{
    public_id:string
 }
 
export const cloudinaryUploader = ({file}:{file:File})=>{
    const data = new FormData

    data.append("file", file, file.name);
    data.append("upload_preset", uploadPreset);
    data.append("cloud_name", cloudName);
    data.append("folder", "Cloudinary-React");

    return axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        data
    ) as Promise<AxiosResponse<IResponse>>
}

export const imgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1694271070/`