import { useNavigate } from "react-router-dom"
import Paths from "../core/Paths"
import LogInForm from "../components/User/LoginForm"


export default function SignInContainer(props){
    const navigate = useNavigate()
    const toCreateAccount = ()=>{

        navigate(Paths.signup())
    }

    return(<div className="bg-white h-screen text-center">
      <LogInForm/>
        {/* <div className="pt-8">
            <h2 className="mx-auto text-4xl w-fit mb-8 text-black">Sign In</h2>
        <label className="input input-bordered flex bg-white mx-2  items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70 text-black">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow text-black py-2" placeholder="E-mail" />
</label>
<label className="input input-bordered flex bg-white mx-2 mt-4 items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70 text-black">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow text-black py-2" value="Password" />
</label>
<button className="mx-auto mt-8 mb-8 text-2xl w-72">
    Log In
</button> */}
<p onClick={toCreateAccount} className="w-fit text-black mx-auto">Create Account?</p>
        {/* </div> */}
    </div>)
}