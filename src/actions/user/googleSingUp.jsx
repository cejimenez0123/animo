import UserApi from "../../data/api/UserApi"
import { createAsyncThunk } from "@reduxjs/toolkit"

const googleSignUp = createAsyncThunk(
    'users/googleSignUp',
    async ({email,password},thunkApi) => {
       try{
    
   
      
        
    //    let data = await UserApi.logIn({email,password})
    //     const {token,user}=data
    //           localStorage.setItem("token",token)
    
    // return  {user:user}
    
}catch (error) {
    return{
        error: error.message
    }
}
      
    }
)
export default googleSignUp