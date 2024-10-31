import taskApi from "../data/api/TaskApi";
import { useEffect, useState } from "react";

export default function useCaseGetEnergyTask(){
    let [energies,setEnergies] = useState([])
    let [error,setError]=useState(null)
    let [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
      taskApi.getEnergyTask().then(data=>{
        const {tasks}= data
        setEnergies(tasks)
        setIsLoading(false)
      }).catch(err=>{
     
        setError(err)
        setIsLoading(false)
      })
    },[])
return {energies,error,isLoading}

}