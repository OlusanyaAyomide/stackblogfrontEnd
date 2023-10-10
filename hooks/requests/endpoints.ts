import { ICreatePost, ISignInRequest } from "@/interfaces/interface";
import request from "./request";
import { AxiosResponse } from "axios";


//list of all endpoints in the application
export const signInRequest = (body:ISignInRequest)=>{
    return request.post<AxiosResponse<any>>("/auth/login",body)
}

export const allBlogRequest = ()=>{
    return request.get<AxiosResponse<any>>("/blogs/all")
}

export const likeblogRequest=(body:{slug:string})=>{
    return request.post<AxiosResponse<any>>("/blog/like",body)
}

export const profileRequest=()=>{
    return request.get<AxiosResponse<any>>("/profile")
}

export const blogDetailRequest=(slug:string)=>{
    return request.get<AxiosResponse<any>>(`/blog/${slug}`)
}


export const blogCommentRequest=(body:{slug:string,text:string})=>{
    return request.post<AxiosResponse<any>>("/blog/comment",body)
}

export const createNewBlogRequest=(body:ICreatePost)=>{
    return request.post<AxiosResponse<any>>("/blog/create",body)
}

export const editBlogRequest=(body:ICreatePost)=>{
    return request.post<AxiosResponse<any>>("/blog/edit",body)
}

export const searchBlogRequest=(body:{keyword:string})=>{
    return request.post<AxiosResponse<any>>("/blog/search",body)
}