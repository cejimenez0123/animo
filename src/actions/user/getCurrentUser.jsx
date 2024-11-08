import UserApi from "../../data/api/UserApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
 const getCurrentUser = createAsyncThunk(
    'users/getCurrentUser',
    async ({email,password},thunkApi) => {
       try{
       let data = await UserApi.getCurrentUser({email,password})
        const {token,user}=data
              localStorage.setItem("token",token)
    
    return  {user:user}
    
}catch (error) {
    return{
        error:  error
    }
}
      
    }
)
export default getCurrentUser