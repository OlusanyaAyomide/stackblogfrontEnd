import { useTheme } from 'next-themes'
import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useMounted from '@/hooks/useMounted'
import { cn } from '@/lib/utils'

export default function UserSkeleton({className}:{className?:string}) {
  const {theme} = useTheme()
  const isLight =theme === "light"
  const {ismounted} = useMounted()
  return (
    <div className=''>
      {ismounted && <SkeletonTheme baseColor={isLight?"#ebebeb":"#222222"} highlightColor={isLight?"#f5f5f5":"#525252"}>
        <div className={cn("h-8 w-8 rounded-full overflow-hidden",className)}>
            <Skeleton className='h-24 w-24 relative bottom-4'/>
        </div>
      </SkeletonTheme>}
    </div>
  )
}



