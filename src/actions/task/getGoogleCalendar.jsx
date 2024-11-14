import TaskApi from "../../data/api/TaskApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
const getGoogleCalendar= createAsyncThunk(
    'tasks/getGoogleCalendar',
    async (thunkApi) => {
      
   
        try{
            
        let data = await TaskApi.getGoogleCalendar()
    
    return  {events:data.tasks}
    
}catch (error) {
    return{
        error: new Error(`getGoogleCalendar ${error.message}`)
    }
}
      
    }
)

export default getGoogleCalendar