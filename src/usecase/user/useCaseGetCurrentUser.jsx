import  { useEffect,useContext } from "react";
import UserApi from "../../data/api/UserApi"
import Context from "../../context";


function useCaseGetCurrentUser(){
    const token = localStorage.getItem("token")
    const {setUser}=useContext(Context)
    useEffect(()=>{
        UserApi.getUser().then(data=>{
            console.log(data)
            setUser(data.user)
        }

        )
    },[])
}
export default useCaseGetCurrentUser