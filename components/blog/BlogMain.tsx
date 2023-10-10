import { Icons } from '@/utils/icons'
import Image from 'next/image'
import React, { useState } from 'react'
import UserAvatar from '../utils/UserAvatar'
import BlogComment from './BlogComment'
import { Button } from '../ui/button'
import BlogCard from '../feed/BlogCard'
import { useGetRequest } from '@/hooks/useRequestProcessor'
import { useRouter } from 'next/router'
import { blogDetailRequest } from '@/hooks/requests/endpoints'
import BlogSkeleton from '../utils/BlogSkeleton'
import { AxiosResponse } from 'axios'
import {  IBlogDetailResponse } from '@/interfaces/interface'
import { useAppSelector } from '@/hooks/reduxHooks'
import Link from 'next/link'
import { calculateReadingTime } from '@/lib/utils'
import DateFormatter from '@/utils/DateFormatter'
import { likeblogRequest as mutationFn } from '@/hooks/requests/endpoints'
import { usePostRequest } from '@/hooks/useRequestProcessor'
import { Separator } from '../ui/separator'
import NotFound from '../utils/NotFound'


//responsible for displaying a single blog detail
export default function BlogMain() {
    const router =useRouter()
    const slug= router.query.slug as string
    const {profile} =useAppSelector((state=>state.user))
    const  date = new DateFormatter()
    const [isLiked,setIsLiked] = useState(false)
    const [likeCount,setLikeCount] = useState<number>(0)
    const [notfound,setNotFound] = useState(false)


    const {mutate} = usePostRequest({mutationFn,sucessText:`blog post ${isLiked?"":"un"}liked`})

    const {data,isLoading} = useGetRequest({queryKey:['detail',slug],staleTime:180000,enabled:!!slug,
    queryFn:()=>{return blogDetailRequest(slug)},setNotFound:()=>{setNotFound(true)},
    onSuccess:({data:{blog}}:AxiosResponse<IBlogDetailResponse>)=>{
        setIsLiked(blog.isLiked)
        setLikeCount(blog.likeCount)
    }
    })
    //data is conditonally destrutured to enable caching,saving it to a local state will not allow this
    const res:AxiosResponse<IBlogDetailResponse>= data
    const blog = res?.data?.blog
    const related = res?.data?.related
    return (
    <>
    {blog &&<>
    <div className='justify-between flex'>
        <Link href={`/`}>
            <button className='text-shade text-2xl '>
                <Icons.shortBack/>
            </button> 
        </Link>

        {(blog.author.id === profile.id) && 
        <Link href={`/blog/edit/${blog.slug}`}>
             <Button className='flex px-6 items-center dark:hover:bg-purple-500  bg-main h-8 text-white'>
                <span>Edit</span>
                <span><Icons.edit className = "text-xl ml-2 text-white"/></span>
            </Button>
        </Link>
       }
    </div>

    <div className='max-w-[800px] lg:max-w-[828px] xl:max-w-[800px] mt-8 sm:mt-12 md:mt-16 mx-auto'>    
        <h1 className="text-xl sm:text-[22px] md:text-3xl font-bold">
            {blog.title}
        </h1>

        <div className='flex-center mt-5'>
            <UserAvatar className='h-12 w-12' src={blog.author.image}/>
            <div className="ml-2">
                <h1 className='font-medium text-base'>{blog.author.firstName} {blog.author.lastName}</h1>
                <h1 className='mt-[2px] opacity-75 text-xs flex'>
                    <span>{calculateReadingTime(blog.text)}</span>
                    <span className='ml-3'>{date.formatDate(blog.createdAt)}</span>
                    {blog.createdAt !== blog.updatedAt && <>
                        <Separator className='bg-shade h-4 mx-2' orientation='vertical'/>
                        <span>last updated {date.formatDate(blog.updatedAt)}</span>
                    </>}
                </h1>
            </div>
        </div>

        <div className="py-1 mt-4 mb-6 pl-3  border-t border-b flex-center">  
            <button className='flex-center'>
                <Icons.chat className ="text-lg text-main"/>
                <span className='text-xs'>{blog.post_comment.length}</span>
            </button>
            <button onClick={()=>{
                mutate({slug:blog.slug})
                setIsLiked((prev=>!prev))
                setLikeCount((prev=>isLiked?prev-1:prev+1))
            }} className='flex-center ml-4 text-shade'>
                {isLiked?<Icons.heart className ="text-lg text-main"/>:
                    <Icons.lineHeart className ="text-lg text-main"/>
                }
                <span className='text-xs'>{likeCount || blog.likeCount}</span> 
            </button>
            <div className="rounded-xl px-3 ml-4 py-[2px] opacity-80 text-sm border">
                {blog.category.name}
            </div>
        </div>
        <div className="relative mt-4 mb-3 w-full aspect-[3/1.6] rounded-sm overflow-hidden">
            <Image  fill alt='my-post' className='object-cover w-full h-full' src={blog.image}/>
        </div>
        <div className="mt-3 leading-6" dangerouslySetInnerHTML={{ __html:blog.html }}
        ></div>
        <BlogComment comment={blog.post_comment} slug={blog.slug}/>
        <div className="mt-5">
            <h1 className="mb-5 font-medium sm:text-center md:text-left md:ml-3">Related posts</h1>
            <div className='flex flex-wrap  justify-between'>
             {related?.map((item,key)=>(
                <BlogCard {...item} key={key}/>
            ))}
            </div>
        </div>
    </div>
    </>}    
    {isLoading && <BlogSkeleton/>}   
    {notfound && <NotFound/>}   
    </>

  )
}
