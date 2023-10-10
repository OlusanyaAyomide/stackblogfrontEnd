import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '../ui/button'

export default function BlogTextArea({onSubmit}:{onSubmit:(text:string)=>void}) {
    const [text,setText] = useState("")
    return (
    <div>
        <TextareaAutosize
            maxRows={6} 
            onChange={(e)=>{setText(e.target.value)}}
            value={text}
            className='resize-none border-b my-4 block mx-1 default-scroll w-full outline-none bg-transparent' 
            placeholder='Comment on johnson post'
        />
        <Button disabled={!text} 
        onClick={()=>{onSubmit(text);setText("")}}
        className='bg-main h-8 ml-auto flex items-center justify-center mt-[2px] text-white px-6 '>
            Submit
        </Button>
    </div>

  )
}
