import React, { useState } from 'react'
import { useGetRequest } from '@/hooks/useRequestProcessor'
import { useRouter } from 'next/router'
import { blogDetailRequest } from '@/hooks/requests/endpoints'
import BlogSkeleton from '../utils/BlogSkeleton'
import { AxiosResponse } from 'axios'
import {  IBlogDetailResponse } from '@/interfaces/interface'
import WriteMain from '../write/WriteMain'

export default function EditMain() {
    const router =useRouter()
    const slug= router.query.slug as string
    const [notFound,setNotFound] = useState("")


    const {data,isLoading} = useGetRequest({queryKey:['detail',slug],staleTime:180000,enabled:!!slug,
    queryFn:()=>{return blogDetailRequest(slug)}})
    const res:AxiosResponse<IBlogDetailResponse>= data
    const blog = res?.data?.blog

    return (
    <>
    {blog && 
        //setting component with initial blog value
        <WriteMain 
            isEditing={true} 
            text={blog.text}
            fileBlob={blog.image}
            slug={blog.slug}
            title={blog.title}
            selected={blog.category.name}
        />}
        {isLoading && <BlogSkeleton/>}
    </>
    )
}
