import React, { useState } from 'react'
import {Input} from '../ui/input'
import { searchBlogRequest as mutationFn } from '@/hooks/requests/endpoints'
import { usePostRequest } from '@/hooks/useRequestProcessor'
import { AxiosResponse } from 'axios'
import { IBlog } from '@/interfaces/interface'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogSearch() {
    const [text,setText] = useState("")
    const {data,mutate} = usePostRequest({mutationFn})
    const res:AxiosResponse<IBlog[]>|undefined = data
    const blogs = res?.data
    

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const target = e.target as any
        setText(target.value)
        console.log("mutating")
        mutate({keyword:target.value})
        
    }
  
    return (
    <div>
        <Input value={text} autoFocus onChange={handleChange} 
        className=' w-full md:w-[350px] lg:w-full' placeholder='Search blogs'/>
        {(!text || blogs?.length === 0) && <div className='mt-3 relative w-full h-[200px] flex items-center'>
            <div className="absolute inset-0">
            <Image alt='search-img' src={"/search.svg"} fill className='object-contain opacity-30'/>
            </div>
            <div className="inset-0 absolute  grid place-content-center">
            {!text?
                <span  className='font-medium text-base'>Search blogs by title</span>:
                <span  className='font-medium text-base'>No result found</span>
            }
        </div>
            
        </div>}

        {blogs && <div className='mt-3'>
            {blogs.map((item,key)=>(
                <Link href={`/blog/${item.slug}`} key={key}>
                    <div className='flex-center mb-2 hover:bg-accent'>
                        <div className="h-[48px] shrink-0 w-[48px] relative rounded-sm overflow-hidden">
                            <Image fill className='object-cover h-full w-full' alt='result' src={item.image}/>
                        </div>
                        <h1 className="ml-1 font-medium text-[13px]">{item.title}</h1>
                    </div>
                </Link>
            ))}
        </div>}
    </div>
  )
}
