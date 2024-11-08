import { createSlice } from "@reduxjs/toolkit"
import getFlow from "../actions/task/getFlow"


const initialState = {
    signedIn: false,
    flowTasks: [],
    scheduledTasks:[],
    tasks:[],
    loading:true,
   
    error:""
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(getFlow.pending,(state,) => {
            state.loading = true
            state.error = null
        }).addCase(getFlow.fulfilled,(state,{payload})=>{
            state.flowTasks = payload.tasks
            state.loading = false
            state.error= null
        }).addCase(getFlow.rejected,(state,{payload})=>{
            state.error = payload.error
        })

}})


export default taskSlice