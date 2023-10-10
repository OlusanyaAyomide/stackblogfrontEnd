import { Icons } from '@/utils/icons'
import React, { useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { Button } from '../ui/button';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
import { cloudinaryUploader,imgUrl } from '@/utils/cloudinaryUploader';
import { usePostRequest } from '@/hooks/useRequestProcessor';
import {  ICreateorEditBlog, ILikeResponse, IResponse } from '@/interfaces/interface';
import { useCustomToast } from '../utils/useCustomToast';
import { createNewBlogRequest,editBlogRequest } from '@/hooks/requests/endpoints';
import { AxiosResponse } from 'axios';
import CategorySelect from './CategorySelect';
import { textToHtml } from '@/lib/utils';
import RadioLoader from '../utils/Loader';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/hooks/reduxHooks';
import useLogIn from '@/hooks/useLogIn';

const fileTypes = ["JPG", "PNG"]

interface IWriteMain{
    text?:string
    fileBlob?:string
    title?:string
    selected?:string
    isEditing:boolean
    slug?:string
}
//used to write or edit a blog
export default function WriteMain(data:IWriteMain) {
    //data is prefilled with default blog data if user is editing
    const [text,setText] = useState<string>(data.text || "")
    const [blogFile,setBlogFile] = useState<File | null>(null)
    const [fileBlob,setFileBlob] = useState<string>(data.fileBlob || "")
    const [title,setTitle] = useState<string>(data.title || "")
    const [selected,setSelected] = useState<string>(data.selected || "")
    const toaster = useCustomToast()
    const router = useRouter()
    const queryClient = useQueryClient()
    const {isAuthenticated} = useAppSelector((state=>state.user))
    const {signIn} = useLogIn()

    
    const {isLoading:loading,mutate} = usePostRequest({
        //if user is editing a blog an edit mutationFn is called otherwise a createMutationFn is called
        mutationFn:data.isEditing?editBlogRequest:createNewBlogRequest,
        sucessText:`${data.isEditing?"Blog updates succesfully":"New blog has been created"}`,
        onSuccess:({data}:AxiosResponse<ILikeResponse>)=>{
            //invalidate query before pushing to new blog to ensure users see an updated version of the blog
            queryClient.invalidateQueries({queryKey:['detail',data.blog.slug]})
            router.push(`/blog/${data.blog.slug}`)  
        }})

    const {mutate:upload,isLoading} = usePostRequest({mutationFn:cloudinaryUploader,
        onSuccess:({data:res}:AxiosResponse<IResponse>)=>{
            const mutateObject:ICreateorEditBlog = {
                image:`${imgUrl}${res.public_id}`,text,
                html:textToHtml(text),title,
                selected_category:selected,
            }

            //if blog is being edited ,add a slug keyword to the object
            if (data.isEditing){
                mutateObject.slug = data.slug
            }
            mutate(mutateObject)
        }
    })

    //revoke former url before setting new file to state
    const handleFileChange = (file:File)=>{
        if(blogFile){
            URL.revokeObjectURL(fileBlob)
        }
        setBlogFile(file)
        const blob = URL.createObjectURL(file)
        setFileBlob(blob)    
    }


    const handleSubmit = ()=>{
        //mimimal blog validations
        if(!isAuthenticated){
            //if user is not authenticated, authentictate first
            return signIn()
        }
        const wordLength =text.split(' ').length
        const titleLength = title.split(' ').length
        if(wordLength < 120){
            return toaster("bad","Minimum blog length is 120 words")
        }   
        if(!fileBlob){
            return toaster("bad","Please upload an image file")
        }
        if(!selected){
            return toaster("bad","select blog category")
        }
        if(titleLength > 30 || title.length < 3){
            return toaster("bad","Blog title is not valid")
        }
        console.log(title.length)

        //if file has been uploaded ,we upload image to cloudinary first before sending string to server
        if(blogFile){
            upload({file:blogFile})
        }else{
            const mutateObject:ICreateorEditBlog = {
                image:fileBlob,text,
                html:textToHtml(text),title,
                selected_category:selected,
            }
            //if blog is being edited ,add a slug keyword to the object
            if (data.isEditing){
                mutateObject.slug = data.slug
            }
            mutate(mutateObject)
        }
    }

    return (
    <div className='max-w-[800px] mx-auto pt-6'>
        <h1 className="text-xl sm:text-[22px] flex-center whitespace-nowrap font-medium">
            <span>{data.isEditing?"Edit blog":"Create a new blog"}</span>
             {data.isEditing?
                <span><Icons.edit className = "text-main text-2xl ml-2"/></span>
             :
                <span><Icons.plus className = "text-main text-2xl ml-2"/></span>
             }
        </h1>
        <div className='mt-6'>
            <h1 className="mb-3">Upload blog image</h1>
            {/* drag and drop component takes a reactNode children  */}
            <FileUploader  types={fileTypes} name="file" handleChange ={handleFileChange}>
                {!fileBlob && <div className='aspect-[3/1.6] cursor-pointer md:aspect-[3/1.3] border-2 border-dashed rounded-md grid place-content-center border-main'>
                    <div className='w-fit mx-auto'>
                        <h1 className="text-center  text-[100px] text-main opacity-80"><Icons.upload className ="block mx-auto"/></h1>
                        <h1 className="text-xs mt-1 text-shade">
                            <span>Click or drag and drop to upload</span>
                        </h1>
                    </div>
                </div>}
                {fileBlob && <div className='aspect-[3/1.6] cursor-pointer relative'>
                    <Image alt='blog-img' src={fileBlob} fill className='object-cover w-full h-full'/>    
                </div>}
            </FileUploader>

            <h1 className="mt-6">Blog Title</h1>
            <Textarea rows={2} value={title} onChange={(e)=>{setTitle(e.target.value)}}
             className='block w-full resize-none mt-2 default-scroll'placeholder='write content'>
            </Textarea>

            <CategorySelect setCategory={setSelected} selected={selected}/>

            <h1 className="mt-6">Blog Content</h1>
            <Textarea value={text} onChange={(e)=>{setText(e.target.value)}}
             className='block w-full mt-2 min-h-[420px] default-scroll'placeholder='write content'>
            </Textarea>

            <Button disabled={(isLoading || loading)} onClick={handleSubmit}
             className='h-8 bg-main mt-4 px-6 dark:hover:bg-purple-500 text-white flex items-center ml-auto'>
                {(isLoading || loading)?<RadioLoader/>:<span>Submit</span>}
             </Button>
        </div>
    </div>
  )
}
