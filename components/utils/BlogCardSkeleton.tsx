import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTheme } from 'next-themes'
import useMounted from '@/hooks/useMounted'
import UserSkeleton from './UserSkeleton'

export default function BlogCardSkeleton() {
    const {theme} = useTheme()
    const isLight =theme === "light"
    const {ismounted} = useMounted()
    return (
    <div className='rounded-md mx-auto md:mx-3 w-full sm:max-w-[450px] md:max-w-[370px] lg:max-w-[390px] xl:max-w-[340px] mb-8 md:mb-16 xl:mb-28 full-shadow overflow-hidden '>
        {ismounted && <SkeletonTheme baseColor={isLight?"#ebebeb":"#222222"} highlightColor={isLight?"#f5f5f5":"#525252"}>
            <div className='aspect-[3/2] relative overflow-hidden'>
                <Skeleton className='relative bottom-4 w-full h-[400px]'/>
            </div>
            <div className="w-full mt-2 h-12 rounded-sm overflow-hidden">
                <Skeleton className='relative bottom-4 w-full h-[100px]'/>
            </div>  
            <p className='leading-6'>
                <Skeleton count={3} className='leading-6'/>
            </p>
            <div className="mb-4 flex-center px-3">
                <UserSkeleton className='h-10 w-10'/>
                <div className="ml-3 grow">
                    <p><Skeleton count={1}/></p>
                </div>
            </div>
        </SkeletonTheme>}

    </div>
  )
}
