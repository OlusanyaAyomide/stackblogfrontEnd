import React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Icons } from '@/utils/icons'
import useMounted from '@/hooks/useMounted'

//used totoolge between light anddark mode
export default function SwitchTheme() {
  const {theme,setTheme} = useTheme()
  const {ismounted} = useMounted()
  return (
    <>
       {ismounted &&  <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`flex justify-start px-2  md:py-4 rounded-none  relative items-center w-full active:bg-transparent`} variant={"ghost"}>
          <span className='text-[22px] text-shade'>
            {theme === "light"?<Icons.moon/>:<Icons.sun/>}
          </span>
      </Button>}
    </>

  )
}
