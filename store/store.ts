import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./blogSlice";
import userSlice from "./userSlice";


export const store = configureStore({
    reducer:{
        bloglist:blogSlice,
        user:userSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch