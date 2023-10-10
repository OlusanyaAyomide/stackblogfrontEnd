import { Icons } from '@/utils/icons'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserAvatar from '../utils/UserAvatar'
import { Separator } from '../ui/separator'
import { IBlog, ILikeResponse } from '@/interfaces/interface'
import { trimSentence } from '@/lib/utils'
import DateFormatter from '@/utils/DateFormatter'
import { usePostRequest } from '@/hooks/useRequestProcessor'
import { likeblogRequest as  mutationFn } from '@/hooks/requests/endpoints'
import { AxiosResponse } from 'axios'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { blogListActions } from '@/store/blogSlice'
import useLogIn from '@/hooks/useLogIn'



export default function BlogCard(blogData:IBlog) {
    const {category,createdAt,likeCount,post_comment,isLiked,image,author,slug,title,text} = blogData
    const date = new DateFormatter()
    const dispatch = useAppDispatch()
    const {isAuthenticated} = useAppSelector((state=>state.user))
    
    const {signIn} = useLogIn()

    const {isLoading,mutate} = usePostRequest({mutationFn,sucessText:"blog post liked",
    onSuccess:({data:{blog}}:AxiosResponse<ILikeResponse>)=>{
        dispatch(blogListActions.updateSingleBlog(blog))
    }})

    return (
    <div className='rounded-md mx-auto md:mx-3 w-full sm:max-w-[450px] md:max-w-[370px] lg:max-w-[390px] xl:max-w-[340px] mb-8 md:mb-16 xl:mb-28 full-shadow overflow-hidden bg-background '>
        <div className='aspect-[3/2] relative'>
            <Image alt='blog-img'  fill src={image} className='brightness-50 bg-gray-600 object-cover'/>
            <div className="absolute z-20 w-full px-2 bottom-2">
                <Link href={`/blog/${slug}`}>
                    <div className="flex-center px-2 hover:w-[140px] relative mb-6 w-[120px] backdrop-blur-sm h-[30px] border border-white rounded-full group overflow-hidden">
                        <div className='read-hover'></div>
                        <span className='ml-1 text-xs relative z-20 text-white'>Read more</span>
                        <span className='text-white group-hover:translate-x-8 relative transition-all duration-200 z-20 text-lg ml-1'><Icons.right/></span>
                    </div>
                </Link>
                <div className="flex-center justify-between">
                    <div className="rounded-xl px-2 py-[2px] opacity-80 text-white text-xs border-white border">
                        {category.name}
                    </div>
                    <div className='flex-center'>
                        <button  disabled={isLoading} className='flex-center text-main mr-1'>
                            <Icons.comment className = "text-[22px] text-main"/>
                            <span className='text-xs ml-[2px]'>{post_comment.length}</span>
                        </button>
                        <button onClick={()=>{isAuthenticated?mutate({slug}):signIn()}} className='flex-center  text-main'>
                        {isLiked?<Icons.heart className = "text-2xl text-main"/>:<Icons.lineHeart className = "text-2xl text-main"/>}
                            <span className='text-xs'>{likeCount}</span>
                        </button>
                    </div>
                </div>                
            </div>
        </div>
        <div className='px-2 sm:px-3 pt-5 pb-3'>
            <h1 className='lg:text-2xl text-xl sm:text-[22px] font-medium  capitalize'>{title}</h1>
            <h1 className="text-shade mt-6">{trimSentence(text,20)}</h1>
        </div>
        <div className="mt-4 mb-8  flex items-end px-2">
        <div className='flex-center'>
            <UserAvatar src={author.image}/>
            <div className="grow flex-center ml-2 text-sm font-semibold">
                <div className="flex-center mx-auto">
                    <span>{author.firstName}</span>
                    <Separator orientation='vertical' className='mx-4 h-4 bg-shade '/>
                    <span>{date.formatDate(createdAt)}</span>
                </div>
            </div>
        </div>  

        </div>
    </div>
  )
}
