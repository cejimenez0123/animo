import TaskApi from "../../data/api/TaskApi"
import { useState,useEffect } from "react"
export default function useCaseGetChildrenTasks({parentTask}){
    const [children,setTasks]=useState([])
    const [taskErr,setTaskErr]=useState(null)
    const [taskIsLoading,setTaskIsLoading]=useState(true)
    useEffect(()=>{
     
        TaskApi.getChildrenTasks({parentId:parentTask.id}).then(data=>{
            console.log(data.tasks)
            setTasks(data.tasks)
            setTaskErr(null)
            setTaskIsLoading(false)
        }).catch(err=>{
            setTaskErr(err)
            setTaskIsLoading(false)
        })
      },[])
    return {children,taskIsLoading,taskErr}
}