import { useEffect, useState } from "react";
import taskApi from "../data/api/TaskApi";




export default function useCaseGetChildTask({parentTask,energy,mode}){
    const [tasks,setTasks]=useState([])
    const [taskErr,setTaskErr]=useState(null)
    const [taskIsLoading,setTaskIsLoading]=useState(true)
    useEffect(()=>{
        if(parentTask!=null && parentTask.id.length>0){
        let token = localStorage.getItem("token")
        if(token==false){
            taskApi.getPublicChildTasks({parentId:parentTask.id,mode:mode,energy:energy}).then(data=>{
                const {tasks}=data
                setTasks(tasks)
                setTaskIsLoading(false)
            }).catch(err=>{
                setTaskErr(err)
                setTaskIsLoading(false)
            })
        }else{
            taskApi.getProtectChildTasks({parentId:parentTask.id,mode,energy}).then(data=>{
                const {tasks}=data
                setTasks(tasks)
                setTaskIsLoading(false)
            }).catch(err=>{
                setTaskErr(err)
                setTaskIsLoading(false)
            })
        }
    }
    },[])
    return {tasks,taskIsLoading,taskErr}
}