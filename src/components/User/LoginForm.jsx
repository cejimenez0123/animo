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
          localStorage.setItem("token",token)
          setUser(user)
          setError(false)
          navigate(Paths.home())
        }).catch(err=>{
          setError(true)
        })
    }
    
    return(<div className="pt-8">
           <h2 className="mx-auto text-4xl w-fit mb-8 text-black">Sign In</h2>
       <label className="input input-bordered flex bg-white mx-2  items-center gap-2">

Email
  <input  type="text"
          onChange={(e)=>handleChangeEmail(e)} 
          value={email}
          className={`text-black py-2 w-full grow`+error?"input-error":""
          }
          placeholder="E-mail" 
  />
  </label>
  <label className="input input-bordered flex bg-white mx-2 mt-4 items-center gap-2">

  Password
 
  <input 
      onChange={(e)=>handleChangePassword(e)}
      type="password"
      className={`grow text-black py-2`+error?"input-error":""
    }
      value={password} 
    />
  </label>

  
  <button onClick={logIn} className="mx-auto mt-8 mb-8 text-2xl w-72">
  Log In
  </button>
  </div>
   )
  }