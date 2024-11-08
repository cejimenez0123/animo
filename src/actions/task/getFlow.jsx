import TaskApi from "../../data/api/TaskApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
const getFlow = createAsyncThunk(
    'tasks/getFlowTasks',
    async (thunkApi) => {
      
   
        try{
            
        let data = await TaskApi.getFlow()
    
    return  {tasks:data.tasks}
    
}catch (error) {
    return{
        error: new Error(`getFlow ${error.message}`)
    }
}
      
    }
)

export default getFlow