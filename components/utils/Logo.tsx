import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='w-[40px]  sm:w-[140px] h-[42px] relative'>
        <Image src={"/logo.png"} className='object-cover sm:scale-75 w-full h-full' fill alt=''/>
    </div>
  )
}
