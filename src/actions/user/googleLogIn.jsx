import UserApi from "../../data/api/UserApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
const googleLogin = createAsyncThunk(
    'users/googleLogin',
    async (response,thunkApi) => {
        try{
       let data = await UserApi.authGoogle(response)
    
    return  {user:data.user}
    
}catch (error) {
    return{
        error: error
    }
}
      
    }
)

export default googleLogin