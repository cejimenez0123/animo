import  { useEffect,useContext, useState } from "react";
import UserApi from "../../data/api/UserApi"
import Context from "../../context";


function useCaseGetCurrentUser(){
    const token = localStorage.getItem("token")
    const {user,setUser}=useContext(Context)
    const [userErr,setUserErr]=useState(null)
    const [userIsLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        UserApi.getUser().then(data=>{
            setUser(data.user)
            setUserErr(null)
            console.log("Logged in")
            setIsLoading(false)
        }).catch(err=>{
            setUser(null)
            setUserErr(err)
            setIsLoading(false)
        })
    })
    return {user,userErr,userIsLoading}
}
export default useCaseGetCurrentUser