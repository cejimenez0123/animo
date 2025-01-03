import UserApi from "../../data/api/UserApi"
import { createAsyncThunk } from "@reduxjs/toolkit"

const googleSignUp = createAsyncThunk(
    'users/googleSignUp',
    async (response,thunkApi) => {
       try{
    
   
      
  let data = await UserApi.registerGoogle(response)

  return {user:data.user}
    
}catch (error) {
    return{
        error: error.message
    }
}
      
    }
)
export default googleSignUp