import { useTheme } from 'next-themes'
import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useMounted from '@/hooks/useMounted'


export default function WelcomeSkeleton({className}:{className?:string}) {
  const {theme} = useTheme()
  const isLight =theme === "light"
  const {ismounted} = useMounted()
  return (
    <div className=''>
      {ismounted && <SkeletonTheme baseColor={isLight?"#ebebeb":"#222222"} highlightColor={isLight?"#f5f5f5":"#525252"}>
        <div className="w-full max-sm:max-w-[300px] sm:max-w-[340px] md:max-w-[396px]">
            <div className="mb-1  w-full h-10 overflow-hidden rounded-sm">
                <Skeleton className='h-24 w-24 relative bottom-4'/>
            </div>
            <p className="mb-1 rounded-sm">
                <Skeleton count={1}/>
            </p>
        </div>
      </SkeletonTheme>}
    </div>
  )
}



