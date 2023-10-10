import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import useLogIn from '@/hooks/useLogIn'
import { Icons } from '@/utils/icons'
import React from 'react'
import UserSkeleton from '../utils/UserSkeleton'
import UserAvatar from '../utils/UserAvatar'
import { useGetRequest } from '@/hooks/useRequestProcessor'
import { profileRequest as queryFn } from '@/hooks/requests/endpoints'
import { AxiosResponse } from 'axios'
import { IUser } from '@/interfaces/interface'
import { userActions } from '@/store/userSlice'

//signing up or siggning in users using google Auth
export default function GoogleAuth() {
  const {profile,isAuthenticated} = useAppSelector((state=>state.user))

  const dispatch = useAppDispatch()
  const {loading,signIn} = useLogIn()
  const  {isLoading} = useGetRequest({queryKey:["user-profile"],queryFn,
    onSuccess:({data}:AxiosResponse<IUser>)=>{
        dispatch(userActions.setUserProfile(data))
    }})

   return (
    <div className='flex justify-end '>
        {(!isAuthenticated  && !loading && !isLoading)  && 
            <button disabled={loading} onClick={()=>{signIn()}} 
            className='h-8 flex-center px-3 rounded-md justify-center bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500'>
                <span className='text-foreground mr-1'>SignIn</span>
                <span className='text-[22px]'><Icons.google/></span>
            </button>}
        {(isLoading || loading ) && <UserSkeleton/>}
        {isAuthenticated && <UserAvatar src={profile.image} className='h-8 w-8'/>}

    </div>

  )
}
