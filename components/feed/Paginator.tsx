import React, { useContext, useState } from 'react'
import { usePagination } from '@/hooks/usePagination'
import { Icons } from '@/utils/icons'
import {Link} from "react-scroll"


export default function Paginator() { 
    const {paginationRange,handleChange,page,isbackDisabled} = usePagination()

    return (
        <>
        {paginationRange  && <div className='mt-8 border-t default-scroll overflow-auto pt-6 flex-center justify-center'>
        <Link duration={300} smooth offset={-50} to="blog-top">
            <button 
                onClick={()=>{handleChange({currentPage:page-1})}} 
                disabled={page===1}  className='disabled:opacity-40 flex-center mr-2'>
                <Icons.right className={`text-lg mr-1 ${page===1?"opacity-40":""} rotate-180`}/>
                <span>Prev</span>
                <span className='max-md:hidden'>ious</span>
               
            </button>
        </Link>

        <div className='flex'>
            {paginationRange?.map((item,key)=>{
            const isActive = item === page
            const isDot = typeof(item) === "string"
            if(isDot){
                return <span key={key} className='text-lg mr-3'>...</span>
            }
            return(
            <Link duration={300} key={key} smooth offset={-50} to="blog-top">
                <button onClick={()=>{handleChange({currentPage:item})}} key={key} className={`h-5 w-5 grid text-sm place-content-center ${isActive?"bg-main text-white":""} w-4 mr-1 sm:mr-3 rounded-full`}>  
                {item} 
                </button>
            </Link> 
            )
        })}
        </div>
        
        <Link duration={300} smooth offset={-50} to="blog-top">
            <button onClick={()=>{handleChange({currentPage:page+1})}} 
                disabled={isbackDisabled}
                className='disabled:opacity-40 flex-center'>
                <span>Next</span>
                <Icons.right className={`text-lg ml-1 ${isbackDisabled?"opacity-40":""}`} />
            </button>
        </Link>   
    </div>}
        </>

  )
}
