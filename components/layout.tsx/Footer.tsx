import React from 'react'
import Logo from '../utils/Logo'
import { Separator } from '../ui/separator'

export default function Footer() {
  return (
    <div className='bg-foreground dark:bg-background px-4 dark:text-white text-background mt-12 py-8'>
        <div className="mx-auto w-fit">
            <Logo/>
        </div>
        <Separator orientation='horizontal' className='mb-2 opacity-50'/>
        <h1 className="text-center text-xs">All articles are gotten from medium</h1>
        <h1 className="text-center text-[10px]">All rights reserved</h1>
    </div>
  )
}
