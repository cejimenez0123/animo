import { useState,useContext,useEffect } from "react"
import Context from "../../context"
import UserApi from "../../data/api/UserApi"
import { useNavigate } from "react-router"
import Paths from "../../core/Paths"
import googleLogin from "../../actions/user/googleLogIn"
import { useDispatch, useSelector } from "react-redux"

export default function LogInForm ({takeAStep}){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState(false)
    const user = useSelector(state=>state.user.user)
    useEffect(()=>{
      if(user){
        navigate("/")
      }
    },[user])
    const handleChangeEmail = (e)=>{
      setError(false)
        setEmail(e.target.value)
      }
      const handleChangePassword = (e)=>{
        setError(false)
          setPassword(e.target.value)
        }
        useEffect(() => {

          window.onGoogleSuccess = (response) => {
              // localStorage.setItem("creds",JSON.stringify(response))
              // UserApi.getAccessToken(response).then(res=>{
              //   console.log(res)
              // })
              localStorage.setItem("creds",JSON.stringify(response))
              dispatch(googleLogin(response))
              // UserApi.loginGoogle(response).then(res=>{
              //   console.log(res)
              // })
        
          }
            // const idToken = 
          //   console.log("idToken",JSON.stringify(response))
          //   // localStorage.setItem("google_client_id",response.clientId)
          //   // localStorage.setItem("google_id",response.credential)
          //  UserApi.getAccessToken(response).then(token=>
            
          //   {
            
          // })
        
          // Inject the google provided script 
          // (an importable module would be nicer here)
      
        
          const script = document.createElement('script');
          script.src = "https://accounts.google.com/gsi/client";
          script.async = true;
          document.body.appendChild(script);
      
          return () => {
            // clean up for react lifecycle
            window.onGoogleSuccess = undefined;
            document.body.removeChild(script)
          
          }
        }, []);
    const logIn=()=>{
        UserApi.logIn({email,password}).then(data=>{
          const {token,user}=data
          if(token){
          localStorage.setItem("token",token)
       
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
  <div id="g_id_onload"
     data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
     data-context="signin"
     data-ux_mode="popup"
     data-callback="onGoogleSuccess"
     data-nonce="true"
     data-auto_select="true"
     data-itp_support="true">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="filled_blue"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div>
  </div>
   )
  }