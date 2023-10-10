import { IBlog, IUser } from "@/interfaces/interface"

interface IblogList{
    link:string
    title:string
    category:string
    content:string
}
export interface IBlogslice{
    blogs:IBlog[]
    page:number
    blogsInView:IBlog[]
}



export interface IUserSlice{
    profile:IUser
    isAuthenticated:boolean
    loading:boolean
}