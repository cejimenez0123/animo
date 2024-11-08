import { createSlice } from "@reduxjs/toolkit"
import logIn from "../actions/user/login"
import getCurrentUser from "../actions/user/getCurrentUser"

const initialState = {
    user: null,
    loading:true,
   
    error:""
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(logIn.pending,(state,) => {
            state.loading = true
            state.error = null
        }).addCase(logIn.fulfilled,(state,{payload})=>{
            state.user = payload.user
            state.loading = false
            state.error= null
        }).addCase(logIn.rejected,(state,{payload})=>{
            state.error = payload.error
        }).addCase(getCurrentUser.pending,(state,) => {
            state.loading = true
            state.error = null
        }).addCase(getCurrentUser.fulfilled,(state,{payload})=>{
            state.user = payload.user
            state.loading = false
            state.error= null
        }).addCase(getCurrentUser.rejected,(state,{payload})=>{
            state.error = payload.error
        })

}})


export default userSlice