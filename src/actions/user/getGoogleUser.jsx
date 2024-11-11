import UserApi from "../../data/api/UserApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
 const getGoogleUser = createAsyncThunk(
    'users/getGoogleUser',
    async ({credentialId},thunkApi) => {
       try{
       let data = await UserApi.getAccessToken(credentialId)
   
    
    return  {user:""}
    
}catch (error) {
    return{
        error:  error
    }
}
      
    }
)
export default getGoogleUser