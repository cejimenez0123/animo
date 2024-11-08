import { useState,useContext } from "react"
import Context from "../../context"
import UserApi from "../../data/api/UserApi"
import { useNavigate } from "react-router"
import Paths from "../../core/Paths"

export default function LogInForm ({takeAStep}){
    const navigate = useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const {user,setUser}=useContext(Context)
    const handleChangeEmail = (e)=>{
      setError(false)
        setEmail(e.target.value)
      }
      const handleChangePassword = (e)=>{
        setError(false)
          setPassword(e.target.value)
        }
    
    const logIn=()=>{
        UserApi.logIn({email,password}).then(data=>{
          const {token,user}=data
          if(token){
          localStorage.setItem("token",token)
          setUser(user)
          setError(false)
          navigate(Paths.home())
          }else{
            setError(true)
          }
        }).catch(err=>{
          setError(true)
        })
    }
    
    return(<div className="pt-8 md:max-w-[30rem] mx-auto">
           <h2 className="mx-auto text-4xl w-fit mb-8 text-black">Sign In</h2>
       <div className="flex flex-row">
       <label className={"flex bg-white mx-2 w-24 tems-center gap-2"}>

Email
</label>
  <input  type="text"
          onChange={(e)=>handleChangeEmail(e)} 
          value={email}
          className={`text-black input input-bordered mx-2 py-2 w-full`
          }
          placeholder="E-mail" 
  />
  </div>
 <div className="flex flex-row">
  <label className={" flex bg-white mx-2 mt-4 items-center gap-2"}>

  Password
  </label>
  <input 
      onChange={(e)=>handleChangePassword(e)}
      type="password"
      placeholder="Passowrd"
      className={`grow text-black py-2 mx-2 my-2 input input-bordered`
    }
      value={password} 
    />
  
  </div>
  
  <button onClick={logIn} className="mx-auto mt-8 mb-8 text-2xl w-72">
  Log In
  </button>
  </div>
   )
  }