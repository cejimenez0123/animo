import taskApi from "../data/api/TaskApi";
import { useEffect, useState } from "react";

export default function useCaseGetModeTask(){
    let [modes,setModes] = useState([])
    let [error,setError]=useState(null)
    let [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
      taskApi.getModeTask().then(data=>{
        const {tasks}= data  
        setModes(tasks)
        setError(null)
        setIsLoading(false)
      }).catch(err=>{
     
        setError(err)
        setIsLoading(false)
      })
    },[])
return {modes,error,isLoading}

}