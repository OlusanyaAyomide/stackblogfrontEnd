import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useMounted from '@/hooks/useMounted'
import { useTheme } from 'next-themes'
import UserSkeleton from './UserSkeleton'


export default function BlogSkeleton() {
    const {theme} = useTheme()
    const isLight =theme === "light"
    const {ismounted} = useMounted()
     return (
    <div className='max-w-[800px] mt-8 sm:mt-12 md:mt-16 mx-auto'>
        {ismounted &&  <SkeletonTheme baseColor={isLight?"#ebebeb":"#222222"} highlightColor={isLight?"#f5f5f5":"#525252"}>
            <h1 className='text-xl sm:text-[22px] md:text-3xl font-bold max-w-[500px]'>
                <Skeleton/>
            </h1>
            <div className='flex-center mt-2 mb-6 px-2'>
            <UserSkeleton className='h-12 w-12'/>
            <div className="ml-2 max-w-[435px] grow">
                <h1 className='font-medium text-base'><Skeleton/></h1>
                <h1 className='mt-[2px] opacity-75 text-xs'>
                    <Skeleton/>
                </h1>
            </div>
            </div>
            <div className='mt-4 mb-3 w-full aspect-[3/1.2] overflow-hidden bg-red-400'>
                <Skeleton className='h-96 w-full relative bottom-4 '/>
            </div>
            <p className='my-1 text-lg'>
                <Skeleton count={3}/>
            </p>
        </SkeletonTheme>}
    </div>
  )
}
