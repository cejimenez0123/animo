import RegisterForm from "../components/User/RegisterForm"
import UserInfoForm from "../components/User/UserInfoForm";
import { useState } from "react";
export default function CreateAccountContainer(props){
    const [step,setStep]=useState(0)

   

const render = [<RegisterForm takeAStep={()=>{
  setStep(1)
}}/>,<UserInfoForm/>]

    return(<div>
        <div className="bg-white h-screen text-center">
            {render[step]}
        </div>
        </div>)
}

