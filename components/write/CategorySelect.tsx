import React, { useState } from 'react'
import { Popover, PopoverTrigger,PopoverContent } from '../ui/popover'
import { Icons } from '@/utils/icons'
import { categories } from '@/utils/constants'
import { Button } from '../ui/button'


interface ICategorySelct{
    setCategory:React.Dispatch<React.SetStateAction<string>>
    selected:string
}

//used to select the category of the blog
export default function CategorySelect({selected,setCategory}:ICategorySelct) {
    const [isOpen,setisOpen] =useState(false)
  return (
    <Popover onOpenChange={(val)=>{setisOpen(val)}}>
        <PopoverTrigger asChild>
            <button className='flex-center px-2'>
                <span className='font-semibold'>
                     {selected?selected:"select category"}
                </span>
                <span className='ml-2'><Icons.angleDown className = {`text-lg text-shade transition-all duration-300 ${isOpen?"rotate-180":""}`}/></span>
            </button>
        </PopoverTrigger>
        <PopoverContent className='px-2 relative left-2 sm:left-5 md:left-16 
         py-4 flex justify-between flex-wrap'>
            {categories.map((item,key)=>(
                <Button variant={'ghost'} key={key} onClick={()=>{setCategory(item)}}
                className={`px-4 blovk mb-2 h-8 flex items-center ml-1 py-1 rounded-md ${selected === item?"border-main border":""}`}>
                    <span>{item}</span>
                </Button>
            ))}
        </PopoverContent>
    </Popover>
  )
}
