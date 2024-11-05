import { useEffect, useState } from "react";
import TaskApi from "../../data/api/TaskApi";



export default function useCaseGetTask({id}){
    const [task,setTask]=useState(null)
    const [isError,setIsError]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        let token = localStorage.getItem("token")
     
        if(token){

            TaskApi.getTaskProtected({id}).then(data=>{
                const {task}=data
                
                setIsError(null)
                setTask(task)
                setIsLoading(false)
            }).catch(err=>{
                setIsError(err)
                setTask(null)
                setIsLoading(false)
            })
        }else{
            TaskApi.getTaskPublic({id}).then(data=>{
                setIsError(null)
                setTask(data.task)
                setIsLoading(false)
            }).catch(err=>{
                setTask(null)
                setIsError(err)
                setIsLoading(false)
            })
        }
    },[id])

    return {task,isError,isLoading}
}