import { useEffect, useState }  from 'react'
import userApi from "../../data/api/UserApi";


function useCaseSignUp({email,password}){
    const [userState,setUser]=useState(null)
    const [userErr,setUserErr]=useState(null)
    const [userIsLoading,setUserIsLoading]=useState(null)
    useEffect(()=>{
        userApi.register({email,password}).then(res=>{
            const {token,user} = res.data
            console.log(res.data)
            localStorage.setItem("token",token)
            setUser(user)
        })

    },[])
return {user:userState,userErr:userErr,userIsLoading}

}
export default useCaseSignUp