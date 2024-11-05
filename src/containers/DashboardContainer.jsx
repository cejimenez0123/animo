import { useState,useEffect, useContext } from "react";
import useCaseGetEnergyTask from "../usecase/task/useCaseGetEnergyTask";
import useCaseGetModeTask from "../usecase/task/useCaseGetModeTask";
import useCaseGetChildTask from "../usecase/task/useCaseGetChildTask";
import Context from "../context";
import addIcon from "../images/icons/add.png"
import useCaseGetCurrentUser from "../usecase/user/useCaseGetCurrentUser";
import CreateTaskDialog from "../components/Task/CreateTaskDialog";
import ShortTermSchedule from "../components/Task/ShortTermSchedule";
import { useNavigate } from "react-router-dom";
import Paths from "../core/Paths";
import dateRange from "../images/icons/date_range.svg"
import taskIcon from "../images/icons/task.svg"
// const fetcher = (url, token) =>axios.get(url, { headers: { Authorization: "Bearer " + token } })
//   .then((res) => res.data);
const DashboardContainer = (props)=>{
  const navigate = useNavigate()
  const {user,mode,setMode}=useContext(Context)
  const [step, setStep] = useState(0);
  const [energy, setEnergy] = useState(null);
  const {energies,error,isLoading}=useCaseGetEnergyTask()
  const {modes} = useCaseGetModeTask()
  const {tasks,taskErr}=useCaseGetChildTask({parentTask:mode,mode:mode,energy:energy})

    const resetFlow = () => {
      setStep(0);
      setEnergy(null);
      setMode(null);
    };
   
    const renderQuiz = ()=>{
      if(isLoading){
        return(<div className="text-black text-xl">
          isLoading
        </div>)
      }
      if(error){
        return(<div className="text-black text-2xl mx-auto w-fit">
          ERROR</div>)
      }
      if(energies && energies.length>0){
        switch(step){
          case 0:{
      return(<div 
    
          className="space-y-6 text-center"
          >
                  <div 
                  className="flex justify-center gap-4"
                  >
                        {energies.map(task=>{
                      
                          return(<button
                          onClick={() => {
                            setEnergy(task);
                            setStep(1);
                          }}
                      
                          className="flex flex-col bg-white text-black border border-black  items-center gap-2 p-6"
                          variant="outline">
                            {task.name}
                          </button>)
                        })}
                      </div>
              </div>)
        }
    
    case 1:{
    
      return( <div className="space-y-6 pt-4 text-center">
                 {/* <h2 className="text-2xl font-semibold text-black">What would serve you best?</h2> */}
                   <div className="flex flex-wrap justify-center gap-4">
                   {modes.map(mode=>{
                  return(<button
                      onClick={() => {
                        setMode(mode);
                        setStep(2);
                      }}
                      className="flex flex-col items-center gap-2 p-6
                      bg-white text-black border border-black "
                      variant="outline"
                    >
                      {mode.name}
                    </button>)
                   })
              }
            </div>
            <button className={"w-72 bg-blue-600 text-white mt-2"}onClick={resetFlow}>Start Over</button>
          </div>)
  }
  case 2:{
    if(taskErr){
      return(<div className="text-center">
        <div>{taskErr.message}</div>
        <button onClick={resetFlow}>Start Over</button>
      </div>)
    }
    if(tasks){
    return( <div className="space-y-6 pt-4 text-center">
   <div className="flex flex-wrap justify-center gap-4">
      {tasks.map(task=>{
     return(<button
     key={task.name}
          onClick={()=>navigate(Paths.task.createRoute(task.id))}
         className="flex flex-col items-center gap-2 p-6
         bg-white text-black border border-black "
         variant="outline"
       >
         {task.name}
       </button>)
      })}

</div>
<button className={"w-72 bg-blue-600 text-white mt-2"}onClick={resetFlow}>Start Over</button>
</div>)
  }  }
}
  }
}
  
      const textBanner = [
        <h1 className="text-2xl font-medium mb-2">Hi {user?user.preferredName:""}, How's your energy?</h1>,
        <h1 className="text-2xl font-medium mb-2">What would serve you best?</h1>,
        <h1 className="text-2xl font-medium mb-2">Suggested Activities</h1>
      ]
    return( 
        <div className="bg-white h-screen w-full overflow-x-hidden h-screem shadow-sm">
  
      <div className="bg-gradient-to-r px-4 pb-4 pt-6 from-blue-500 to-blue-600 text-white">
         {textBanner[step]}
        <p className="text-blue-100">Let's align your tasks with your state</p>
     
</div>
 
        <div 
        className="bg-gray-50 pb-2 pt-4"
        
        >
    {renderQuiz()}
    <div className="w-fit mt-8 mx-auto">
      <button className="bg-white  mr-4"><div ><img className="w-12 h-12 mx-auto" src={taskIcon}/><p>Tasks</p></div></button>
      <button className="bg-white ml-4"><div><img className="w-12 h-12 mx-auto" src={dateRange}/><p>Calendar</p></div></button>
    </div>
    </div>
     
     <div className="max-w-md mx-auto w-full bg-white rounded-xl shadow-sm overflow-hidden">
   <div className="p-4">
       <div className="flex items-center justify-between mb-6">
         <div>
            <h1 className="text-xl font-semibold">Your Flow</h1>
            <p className="text-gray-600">Thursday, Oct 24</p>
          </div>
          <div className="flex items-center gap-2">
       {/* <Heart className="w-5 h-5 text-red-500" /> */}
           <span className="text-sm font-medium">Feeling Focused</span>
           </div> 
        </div>
        </div>
  
        {/* Timeline */}
        <ShortTermSchedule/>
        {/* <div className="space-y-4 px-2">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-16 text-gray-500">Now</div>
            <div className="flex-1 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-medium">Deep Work</h3>
              <p className="text-gray-600 text-sm">Project Documentation</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-16 text-gray-500">3:00 PM</div>
            <div className="flex-1 p-3 bg-purple-50 rounded-lg">
              <h3 className="font-medium">Mindful Break</h3>
              <p className="text-gray-600 text-sm">5-minute meditation</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="w-16 text-gray-500">3:15 PM</div>
            <div className="flex-1 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium">Team Check-in</h3>
              <p className="text-gray-600 text-sm">Weekly sync</p>
            </div>
          </div>
        </div> */}

      
   
<CreateTaskDialog/>
      {user?
      <div  onClick={()=>document.getElementById('dialog--create-task').showModal()} className="fixed bottom-10 rounded-[50%] bg-blue-600 w-24 h-24 right-10">
        <img src={addIcon}/> </div>
      :null}
    </div>
    
  </div>)
}
export default DashboardContainer