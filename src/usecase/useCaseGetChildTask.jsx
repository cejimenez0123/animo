import { useEffect, useState } from "react";
import taskApi from "../data/api/TaskApi";




export default function useCaseGetChildTask({parentTask,energy,mode}){
    const [tasks,setTasks]=useState([])
    const [taskErr,setTaskErr]=useState(null)
    const [taskIsLoading,setTaskIsLoading]=useState(true)
    useEffect(()=>{
        if(mode){
          let token = localStorage.getItem("token")

          if(token!=null){
         
          taskApi.getProtectChildTasks({parentId:parentTask.id,mode,energy}).then(data=>{
              const {tasks}=data
            
              console.log("task",tasks)
              console.log("BOP")
              setTasks(tasks)
              setTaskErr(null)
              setTaskIsLoading(false)
          }).catch(err=>{
              setTaskErr(err)
              setTaskIsLoading(false)
          })
         
      }else{

          taskApi.getPublicChildTasks(
            {parentId:parentTask.id,mode:mode,energy:energy}).then(data=>{
              const {tasks}=data

              if(tasks.length>0){
              
                  setTasks(tasks)
                  setTaskErr(null)
                  setTaskIsLoading(false)
              }else{
                setTaskErr("error")
              }
            
          }).catch(err=>{
              setTaskErr(err)
              setTaskIsLoading(false)
          })
      }
    }
      },[mode,energy])
    return {tasks,taskIsLoading,taskErr}
}