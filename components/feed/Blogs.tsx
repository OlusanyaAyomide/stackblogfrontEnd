import { blogDemo } from '@/utils/constants'
import React from 'react'
import BlogCard from './BlogCard'
import Paginator from './Paginator'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import BlogCardSkeleton from '../utils/BlogCardSkeleton'
import { useGetRequest } from '@/hooks/useRequestProcessor'
import { allBlogRequest as queryFn } from '@/hooks/requests/endpoints'
import { AxiosResponse } from 'axios'
import { IBlogResponse } from '@/interfaces/interface'
import { blogListActions } from '@/store/blogSlice'
import { userActions } from '@/store/userSlice'

const skeletons = [1,2,3,4,5,6]


export default function Blogs() {
    const {blogsInView} = useAppSelector((state=>state.bloglist))
    const dispatch = useAppDispatch()

    const {isLoading} = useGetRequest({queryKey:['all-blog'],queryFn,
    onSuccess:({data}:AxiosResponse<IBlogResponse>)=>{
        dispatch(blogListActions.setAllBlog(data.blog))

    }
    })
    //gets all blogs and passes as a prop to blogcard 
    return (
    <>
    <div className='flex flex-wrap sm:px-8 lg:px-12 justify-between'>
        {blogsInView.map((item,key)=>(
            <BlogCard showLikes={true} {...item} key={key}/>
        ))}
        {/* rendred if blogs is still loading */}
        {isLoading && skeletons.map((_,key)=>(<BlogCardSkeleton key={key}/>))}
    </div>
    <div className="mt-3">
        <Paginator/>
    </div>
    </>

  )
}
