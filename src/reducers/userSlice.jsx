import { createSlice } from "@reduxjs/toolkit"
import logIn from "../actions/user/login"
import getCurrentUser from "../actions/user/getCurrentUser"
import googleLogin from "../actions/user/googleLogIn"
import googleSignUp from "../actions/user/googleSignUp"

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
           if(payload.error){
            state.error = payload.error
           }
        }).addCase(googleLogin.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(googleLogin.fulfilled,(state,{payload})=>{
            state.user=payload.user
            state.loading=false
        }).addCase(googleLogin.rejected,(state,{payload})=>{
            state.error=payload.error
            state.loading=false
        }).addCase(googleSignUp.fulfilled,(state,{payload})=>{
            state.user=payload.user
            state.error =null
            state.loading=false
        }).addCase(googleSignUp.rejected,(state,{payload})=>{
            state.error=payload.error
            state.loading=false
        }).addCase(googleSignUp.pending,(state)=>{
            state.loading=true
            state.error=null})
}})


export default userSlice