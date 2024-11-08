import UserApi from "../../data/api/UserApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
 const getGoogleUser = createAsyncThunk(
    'users/getGoogleUser',
    async (thunkApi) => {
       try{
       let data = await UserApi.googleGetUser()
       console.log(data)
    
    return  {user:""}
    
}catch (error) {
    return{
        error:  error
    }
}
      
    }
)
export default getGoogleUser