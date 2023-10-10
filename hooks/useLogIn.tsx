import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { usePostRequest } from './useRequestProcessor';
import { getUserCredentials as mutationFn } from './requests/google-request';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ISignInresponse, IgoogleResponse } from '@/interfaces/interface';
import { signInRequest } from './requests/endpoints';
import { useAppDispatch } from './reduxHooks';
import Cookies from "js-cookie";
import { setCookieAsync } from '@/lib/utils';
import { userActions } from '@/store/userSlice';

//custom hooks for signUp and signIn with google
export default function useLogIn() {
    const dispatch = useAppDispatch()
    //obtain goggle auth token step 1
    const signIn = useGoogleLogin({
        onSuccess: (res) => mutate({token:res.access_token}),
        onError: (error) => console.log('Login Failed:', error)
    });

    //set data from seerver to global state and authenticate user step 3
    const {mutate:login,isLoading:loading} = usePostRequest({mutationFn:signInRequest,
    onSuccess:async ({data}:AxiosResponse<ISignInresponse>)=>{
        const {token,user} =data
        const authCookie = Cookies.get("authCookie")
        if (authCookie){
            Cookies.remove("authCookie")
        } 
        await setCookieAsync(token)
        dispatch(userActions.setUserProfile(user))
    }
    }) 
    //use google auth token to get user google data and forward data to server step 2
    const {isLoading,mutate} = useMutation(["google-request"],mutationFn,{
        onSuccess:({data}:AxiosResponse<IgoogleResponse>)=>{
            console.log(data)
            login({
                username:data.email,
                password:data.id,
                image:data.picture,
                firstName:data.given_name,
                lastName:data.family_name || "not-set"
            })
    }})

    return {signIn,loading:(isLoading || loading)}


}
