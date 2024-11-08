import TaskApi from "../../data/api/TaskApi"
import { useState,useEffect } from "react"
export default function useCaseGetFlow(){
    const [flowTasks,setTasks]=useState([])
    const [flowErr,setFlowErr]=useState(null)
    const [flowIsLoading,setFlowIsLoading]=useState(true)
    useEffect(()=>{
     if(flowTasks.length==0){
        TaskApi.getFlow().then(data=>{
            console.log(data.tasks)
            setTasks(data.tasks)
            setFlowErr(null)
            setFlowIsLoading(false)
        }).catch(err=>{
            setFlowErr(err)
            setFlowIsLoading(false)
        })}
      })
    return {flowTasks,flowIsLoading,flowErr}
}