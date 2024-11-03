import { useState,useContext } from "react";
import UserApi from "../../data/api/UserApi";
import Context from "../../context";
import { useNavigate } from "react-router-dom";
import Paths from "../../core/Paths";
export default function UserInfoForm (){
    const navigate = useNavigate()
    const {setUser}=useContext(Context)
    const [preferredName,setPreferredName]=useState("")
    const [dob,setDob]=useState(new Date())
    const [sedentaryLevel,setSedentaryLevel]=useState()
    const [employment,setEmployment]=useState()
    const [relationshipStatus,setRelationshipStatus]=useState()
    const handleChangeName = (e)=>{
        setPreferredName(e.target.value)
    }
    const handleChangeRelationship =(e)=>{
        setRelationshipStatus(e.target.value)
    }
    const handleChangeSedentary = (e)=>{
        setSedentaryLevel(e.target.value)
    }
    const handleChangeEmployment=(e)=>{
        setEmployment(e.target.value)
    }
    const handleChangeDoB = (e)=>{
        setDob(e.target.value)
    }
    const updateUserInfo=()=>{
        UserApi.userUpdate({preferredName:preferredName,relationshipStatus,sedentaryLevel,workStatus:employment,sedentaryLevel,dob})
        .then(data=>{
            setUser(data.user)
            navigate(Paths.home())
        })
    }
    return(<div className="form-control text-center pt-8 mx-4">
    {/* <label className="input input-bordered  text-black text-left flex bg-white mx-2  items-center gap-2">
  Preferred Name */}
  <input type="text" value={preferredName}className="grow text-black border border-slate-100 mx-2 bg-white py-4 px-4" onChange={handleChangeName}placeholder="Prefered Name" />
  {/* </label> */}
  <label for="start" className="text-black w-full text-left mt-4">Date of Birth</label>
  
  <input type="date" id="start "value={dob} onChange={handleChangeDoB}  className="text-black w-full py-4 px-4 mx-2 border border-slate-100 bg-white input" name="trip-start"
   min="1901-01-01"  max={new Date().toISOString().split('T')[0]}  />
  

  <select value={sedentaryLevel} onChange={handleChangeSedentary}className="select select-ghost text-black mt-4 w-full border border-slate-100 ">
  <option disabled selected>Sedentary Level</option>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
  </select>
  <select  value={employment} onChange={handleChangeEmployment}className="select select-ghost mt-4 text-black w-full border border-slate-100 ">
  <option disabled selected>Employment Status</option>
  <option>unemployed</option>
  <option>student</option>
  <option>full time work</option>
  <option>part time work</option>
  <option>retired</option>
  <option>self employed</option>
  </select>
  <select value={relationshipStatus} onChange={handleChangeRelationship}className="select select-ghost text-black mt-4 w-full border border-slate-100 ">
  <option disabled selected>Relationship Status</option>
  <option>single</option>
  <option>partnered</option>
  <option>situation</option>
  <option>separated</option>
  <option>divorced</option>
  <option>widowed</option>
  
  </select>
  
  <button onClick={updateUserInfo} className="mt-4 text-xl">Continue</button>
  
  </div>)
  
  
  }