import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from "./RootState";
import { blogDemo } from "@/utils/constants";
import { blogSlicedArray } from "@/hooks/usePagination";
import { IBlogslice } from "./interface";
import { IBlog } from "@/interfaces/interface";
import { pageSize } from "@/utils/constants";





export const initalState:IBlogslice={
    blogs:[],
    page:1,
    blogsInView:[]
}
export const blogListSlice = createSlice({
    name:"bloglist",
    initialState:initalState,
    reducers:{
        setBlogsInView(state,action:PayloadAction<number>){
            const [ start,end]  = [(action.payload-1)*pageSize, ((action.payload-1)*pageSize)+pageSize]
            const newArray = blogSlicedArray(state.blogs,start,end)
            state.blogsInView = newArray
            state.page = action.payload
        },
        setPage(state,action:PayloadAction<number>){
            state.page = action.payload
        },
        setAllBlog(state,action:PayloadAction<IBlog[]>){
            state.blogs = action.payload
            const blogsInView = blogSlicedArray(action.payload,0,pageSize)
            state.blogsInView = blogsInView
        },
        updateSingleBlog(state,action:PayloadAction<IBlog>){
            const newBlog:IBlog[] = [] 
            state.blogs.map((item)=>{
                if(item.id !== action.payload.id){
                    newBlog.push(item)
                }else{
                    newBlog.push(action.payload)
                }
            })

            const [ start,end] = [(state.page-1)*pageSize, ((state.page-1)*pageSize)+pageSize]
            const paginatedblog = blogSlicedArray(newBlog,start,end)
            state.blogs = newBlog
            state.blogsInView = paginatedblog
        }
    }
})

export const blogListActions = blogListSlice.actions
export const authType = (state:IRootState)=>state.blogs
export default blogListSlice.reducer
