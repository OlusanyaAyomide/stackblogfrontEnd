import React, { useState } from 'react'
import Logo from '../utils/Logo'
import BlogSearch from './BlogSearch'
import SwitchTheme from '../utils/SwitchTheme'
import { Icons } from '@/utils/icons'
import GoogleAuth from './GoogleAuth'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { useAppSelector } from '@/hooks/reduxHooks'
import { Input } from '../ui/input'

export default function Header() {
    const {isAuthenticated} = useAppSelector((state=>state.user))
    const [isInputOpended,setIsInputOpened] = useState(false)
    
  return (
    <div className='paddingx fixed z-40 w-full top-0 left-0 py-1 bg-background  flex-center justify-between shadow-sm border-b'>
        <div className='flex-center'>
            <Logo/>
            <div className='px-1 max-md:hidden'>
                <Popover onOpenChange={(val)=>{setIsInputOpened(val)}}>
                    <PopoverTrigger>
                        {<Input placeholder='Search blog' className={`w-[320px] ${isInputOpended?"opacity-0":""}`}/>}
                    </PopoverTrigger>
                    <PopoverContent className='w-[380px] h-[335px] overflow-scroll default-scroll relative left-12 max-md:hiddden'>
                        <BlogSearch/>
                    </PopoverContent>
                </Popover>
            </div>
        </div>

        <div className='flex-center shrink-0'>
            <Link href={"/"}>
                <button className='ml-2 flex-center font-medium text-base mr-3'>
                    <span>Home</span>
                    <span className='ml-[2px] text-lg'><Icons.home/></span>
                </button>
            </Link>
            {isAuthenticated && 
            <Link href={'/write'}>
                <div className="flex-center font-medium text-base mr-3">
                    <span>write</span>
                    <span className="text-lg"><Icons.write/></span>
                </div>
            </Link>

            }
            <Link href={"/write"}>
        
            </Link>
   
            <div className="w-[32px] sm:w-[40px] mr-1">
            <SwitchTheme/>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} className='ml-[2px] md:hidden'>
                        <Icons.search className = "text-[22px] text-shade"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='relative right-4 min-w-[300px] md:hidden sm:w-[400px] h-[335px] overflow-scroll default-scroll'>
                        <BlogSearch/>
                </PopoverContent>
            </Popover>
            <GoogleAuth/>
 
        </div>
    </div>
  )
}
