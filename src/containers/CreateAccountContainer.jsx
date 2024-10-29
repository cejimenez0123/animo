import { useState } from "react"




export default function CreateAccountContainer(props){
    const [step,setStep]=useState(0)
    const [today, setToday] = useState(new Date());
    const quiz =()=>{
        return(<div className="form-control text-center pt-8 mx-4">
                {/* <label className="input input-bordered  text-black text-left flex bg-white mx-2  items-center gap-2">
  Preferred Name */}
  <input type="text" className="grow text-black border border-slate-100 mx-2 bg-white py-4 px-4" placeholder="Prefered Name" />
{/* </label> */}
<label for="start" className="text-black w-full text-left mt-4">Date of Birth</label>

<input type="date" id="start" className="text-black w-full py-4 px-4 mx-2 border border-slate-100 bg-white input" name="trip-start"
 value="2018-07-22" min="1901-01-01"  max={today.toISOString().split('T')[0]}  />
<select className="select select-ghost text-black mt-4 w-full border border-slate-100 ">
  <option disabled selected>Sedentary Level</option>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>
<select className="select select-ghost mt-4 text-black w-full border border-slate-100 ">
  <option disabled selected>Employment Status</option>
  <option>unemployed</option>
  <option>student</option>
  <option>full time work</option>
  <option>part time work</option>
  <option>retired</option>
  <option>selfemployed</option>
</select>
<select className="select select-ghost text-black mt-4 w-full border border-slate-100 ">
  <option disabled selected>Relationship Status</option>
  <option>single</option>
  <option>partnered</option>
  <option>situation</option>
  <option>separated</option>
  <option>divorced</option>
  <option>widowed</option>

</select>

  <button className="mt-4 text-xl">Continue</button>

        </div>)

    }
const takeAStep =()=>setStep(1)
const register = ()=>{
    
     return(<div className="pt-8">
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
  <input type="password" className="grow text-black py-2" value="Confirm Password" />
</label>

<button onClick={takeAStep} className="mx-auto mt-8 mb-8 text-2xl w-72">
   Sign Up
</button>
</div>
    )
}
const render = [register(),quiz()]

    return(<div>
        <div className="bg-white h-screen text-center">
            {render[step]}

        </div>
        </div>)
}