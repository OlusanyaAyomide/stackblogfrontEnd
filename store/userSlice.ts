import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from "./RootState";
import { IUserSlice } from "./interface";
import { IUser } from "@/interfaces/interface";


const defaultUser:IUser={
    email:"",
    firstName:"",
    lastName:"",
    id:0,
    image:""
}

export const initalState:IUserSlice={
    profile:{} as IUser,
    isAuthenticated:false,
    loading:true
}
export const userSlice = createSlice({
    name:"user",
    initialState:initalState,
    reducers:{
        setUserProfile(state,action:PayloadAction<IUser>){
            state.profile = action.payload
            state.isAuthenticated = true
            state.loading =false
        },
        unAuthenticateUser(state,action:PayloadAction<IUser>){
            state.isAuthenticated = false
            state.profile = defaultUser
        }
    }
})

export const userActions = userSlice.actions
export const authType = (state:IRootState)=>state.user
export default userSlice.reducer
