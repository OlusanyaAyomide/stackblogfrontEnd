import { useAppSelector } from '@/hooks/reduxHooks'
import DateFormatter from '@/utils/DateFormatter'
import React from 'react'
import WelcomeSkeleton from '../utils/WelcomeSkelton'

export default function Welcome() {
    const {isAuthenticated,profile,loading}= useAppSelector((state=>state.user))
    const {blogs} = useAppSelector((state=>state.bloglist))
    const date = new DateFormatter()
  return (
    <div className='mt-3 mb-8 sm:mb-5 sm:px-10 lg:px-14 text-shade'>
       {blogs.length === 0 ?<WelcomeSkeleton/>:
        <h1 className='text-2xl lg:text-3xl font-semibold'>
            {isAuthenticated?`${date.getGreeting()} ${profile.firstName}`:"Explore StackBlog"}
        </h1>}
        {isAuthenticated && <h1 className='font-medium mt-1' id='blog-top'>Explore personalized blogs content made just for you,happy reading </h1>}
    </div>
  )
}
