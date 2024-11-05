import { useEffect, useState } from "react";
import TaskApi from "../../data/api/TaskApi";




export default function useCaseGetSchedule(){
    const [scheduledTasks,setTasks]=useState([])
    const [scheduleErr,setScheduleErr]=useState(null)
    const [scheduleIsLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token!=false){
        TaskApi.getSchedule().then(data=>{
            setScheduleErr(null)
            setTasks(data.tasks)
            setIsLoading(false)
        }).catch(err=>{
            setScheduleErr(err)
            setIsLoading(false)
        })
    }
    },[])

    return {scheduledTasks,scheduleErr,scheduleIsLoading}
}