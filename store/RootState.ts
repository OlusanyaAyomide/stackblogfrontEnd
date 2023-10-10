import { IUserSlice } from "./interface"
import { IBlogslice } from "./interface"

export interface IRootState{
    blogs:IBlogslice
    user:IUserSlice
}