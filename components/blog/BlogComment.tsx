import React, { useState } from 'react'
import BlogTextArea from './BlogTextArea'
import UserAvatar from '../utils/UserAvatar'
import { IComment } from '@/interfaces/interface'
import { usePostRequest } from '@/hooks/useRequestProcessor'
import { useAppSelector } from '@/hooks/reduxHooks'
import { blogCommentRequest as mutationFn } from '@/hooks/requests/endpoints'

//displays all comments under a post
export default function BlogComment({comment,slug}:{comment:IComment[],slug:string}) {
    //blog comments are set as initial state
    const [comments,setComments] = useState<IComment[]>(comment)
    const {profile} = useAppSelector((state=>state.user))
    const {mutate} = usePostRequest({mutationFn,sucessText:'comment has been added'})
    const currentTime = new Date()

    //blogs are first added to state before being sent to server(optismistic update)
    const handleSubmit = (text:string)=>{
        setComments((prev=>{return[{
            comment:text,
            createdAt:currentTime.toISOString(),
            id:1,
            user:profile
        },...prev]}))
        mutate({slug,comment:text})

    }
    return (
    <div className='mt-6'>
        <h1 className="font-medium pl-1">Comment</h1>
        <BlogTextArea onSubmit={handleSubmit}/>
        <div className="mt-3">
            {comments.map((item,key)=>(
                <div className='mb-6 flex py-2 border-b' key={key}>
                    <UserAvatar src={item.user.image} className='h-8 w-8'/>
                    <div className='ml-2'>
                        <h1 className="font-medium mb-[2px]">{item.user.firstName} {item.user.lastName}</h1>
                        <h1>{item.comment}</h1>
                    </div>
                </div>
            ))}
        </div>
    </div>

  )
}
