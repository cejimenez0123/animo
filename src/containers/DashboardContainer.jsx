import { useState,useEffect, useContext } from "react";
import useSWR from "swr"
import useCaseGetEnergyTask from "../usecase/useCaseGetEnergyTask";
import taskApi from "../data/api/TaskApi";
import useCaseGetModeTask from "../usecase/useCaseGetModeTask";
import useCaseGetChildTask from "../usecase/useCaseGetChildTask";
import Context from "../context";
import useCaseGetCurrentUser from "../usecase/user/useCaseGetCurrentUser";

// const fetcher = (url, token) =>axios.get(url, { headers: { Authorization: "Bearer " + token } })
//   .then((res) => res.data);
const DashboardContainer = (props)=>{
    const {energies,error,isLoading}=useCaseGetEnergyTask()
    const {modes} = useCaseGetModeTask()
    useCaseGetCurrentUser()
    const {user}=useContext(Context)
    const [step, setStep] = useState(0);
    const [energy, setEnergy] = useState(null);
    const [mode, setMode] = useState(null);
    const {tasks,taskErr}=useCaseGetChildTask({parentTask:mode,mode:mode,energy:energy})
    const resetFlow = () => {
      setStep(0);
      setEnergy(null);
      setMode(null);
    };
    // const getCurrentMode = () => {
    //     if (!energy || !mode) return null;
    //     if (energy === 'low' && mode === 'relaxed') return 'low-relaxed';
    //     if (energy === 'low' && mode === 'work') return 'low-work';
    //     if (energy === 'high' && mode === 'relaxed') return 'high-relaxed';
    //     if (energy === 'high' && mode === 'work') return 'high-work';
    //     if (mode === 'nothing') return 'do-nothing';
    //   };
   
    const renderQuiz = ()=>{
      if(isLoading){
        return(<div className="text-black text-xl">
          isLoading
        </div>)
      }
      if(error){
        return(<div className="text-black">
          ERROR:{JSON.stringify(error)}</div>)
      }
      if(energies && energies.length>0){
        switch(step){
          case 0:{
      return(<div 
        className=""
          // className="space-y-6 text-center"
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
          </div>)
  }
  case 2:{
    console.log("DASH",tasks)
    return( <div className="space-y-6 pt-4 text-center">
    {/* <h2 className="text-2xl font-semibold text-black">What would serve you best?</h2> */}
      <div className="flex flex-wrap justify-center gap-4">
      {tasks.map(task=>{
     return(<button
         onClick={() => {
          //  setMode(mode);
          //  setStep(2);
         }}
         className="flex flex-col items-center gap-2 p-6
         bg-white text-black border border-black "
         variant="outline"
       >
         {task.name}
       </button>)
      })
 }
</div>
</div>)
  }  }
  }
}
    //   const renderQuiz = () => {
    //     switch (step) {
    //       case 0:
    //         return (
    //           <div className="space-y-6 text-center">
    //             {/* <h2 className="text-2xl text-black font-semibold">How are you feeling?</h2> */}
    //             <div className="flex justify-center gap-4">
    //               <button
    //                 onClick={() => {
    //                   setEnergy('low');
    //                   setStep(1);
    //                 }}
    //                 className="flex flex-col bg-white text-black border border-black  items-center gap-2 p-6"
    //                 variant="outline"
    //               >
    //                 {/* <BatteryLow className="w-8 h-8" /> */}
    //                 Low Energy
    //               </button>
    //               <button
    //                 onClick={() => {
    //                   setEnergy('high');
    //                   setStep(1);
    //                 }}
    //                 className="flex flex-col bg-white text-black border border-black  items-center gap-2 p-6"
    //                 variant="outline"
    //               >
    //                 {/* <Battery className="w-8 h-8" /> */}
    //                 High Energy
    //               </button>
    //             </div>
    //           </div>
    //         );
    
    //       case 1:
    //         return (
    //           <div className="space-y-6 pt-4 text-center">
    //             {/* <h2 className="text-2xl font-semibold text-black">What would serve you best?</h2> */}
    //             <div className="flex flex-wrap justify-center gap-4">
    //               <button
    //                 onClick={() => {
    //                   setMode('relaxed');
    //                   setStep(2);
    //                 }}
    //                 className="flex flex-col items-center gap-2 p-6
    //                 bg-white text-black border border-black "
    //                 variant="outline"
    //               >
    //                 {/* <Leaf className="w-8 h-8" /> */}
    //                 Relaxation
    //               </button>
    //               <button
    //                 onClick={() => {
    //                   setMode('work');
    //                   setStep(2);
    //                 }}
    //                 className="flex flex-col items-center gap-2 p-6
    //                 bg-white text-black border border-black "
    //                 variant="outline"
    //               >
    //                 {/* <Zap className="w-8 h-8" /> */}
    //                 Productivity
    //               </button>
    //               <button
    //                 onClick={() => {
    //                   setMode('nothing');
    //                   setStep(2);
    //                 }}
    //                 className="flex flex-col items-center gap-2 p-6
    //                 bg-white text-black border border-black "
    //                 variant="outline"
    //               >
    //                 {/* <Coffee className="w-8 h-8" /> */}
    //                 Do Nothing
    //               </button>
    //             </div>
    //           </div>
    //         );
    
    //       case 2:
    //         const currentMode = getCurrentMode();
    //         return (
    //           <div className="w-fit mx-auto ">
    //             {/* <h2 className="text-2xl font-semibold text-black text-center">Suggested Activities</h2> */}
    //             <div className="grid gap-2">
    //               {suggestions[currentMode].map((suggestion, index) => (
    //                 <div key={index} className="bg-white/50">
    //                   <div className="p-4">
    //                     <p className="text-lg bg-white text-black border border-black w-64 p-2 rounded-lg">{suggestion}</p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //             <button onClick={resetFlow} className="w-72 bg-blue-600 mt-2">
    //               Start Over
    //             </button>
    //           </div>
    //         );
    //     }
    //   };
      const textBanner = [
        <h1 className="text-2xl font-medium mb-2">Hi {user?user.preferredName:""}How's your energy?</h1>,
        <h1 className="text-2xl font-medium mb-2">What would serve you best?</h1>,
        <h1 className="text-2xl font-medium mb-2">Suggested Activities</h1>
      ]
    return( 
        <div className="bg-white h-screen w-full overflow-x-hidden h-screem shadow-sm">
    {/* Variant 1: Focus on Current State */}

      <div className="bg-gradient-to-r px-4 pb-4 pt-6 from-blue-500 to-blue-600 text-white">
        {/* <div className=" items-center  "> */}
          {/* <h2 className="text-lg font-semibold">2:30 PM</h2> */}
          {/* <Settings className="w-5 h-5" /> */}
        {/* </div> */}
        {/* <h1 className="text-2xl font-medium mb-2">How's your energy?</h1> */}
        {textBanner[step]}
        <p className="text-blue-100">Let's align your tasks with your state</p>
     
</div>
      {/* <div className="p-4 space-y-4"> */}
      {/* Energy Meter */}
      {/* <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3">
            {/* <Battery className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium">Energy Level</p>
              <p className="text-sm text-gray-600">Medium - Good for focused work</p>
            </div>
          </div>
          <div className="w-20 h-2 bg-blue-100 rounded-full">
            <div className="w-3/4 h-full bg-blue-500 rounded-full" /> 
          </div>
        </div> */}
        <div 
        className="bg-gray-50 pb-2 pt-4"
        
        >
    {renderQuiz()}
    
    </div>
        {/* Task Recommendations */}
        {/* <div className="">
          <h3 className="font-medium text-gray-700">Recommended Now</h3> */}
          {/* <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">Deep Work Session</h4>
                  <p className="text-sm text-gray-600">Client Presentation</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">45 minutes</span>
                  </div>
                </div>
                <button className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  Start
                </button>
              </div>
            </CardContent>
          </Card> */}
        {/* </div> */}
      
        {/* Quick Actions */}
        {/* <div className="grid grid-cols-3 gap-2">
          {/* <button className="p-3 bg-gray-50 rounded-lg flex flex-col items-center">
            <Brain className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs">Meditate</span>
          </button>
          <button className="p-3 bg-gray-50 rounded-lg flex flex-col items-center">
            <ListTodo className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs">Tasks</span>
          </button>
          <button className="p-3 bg-gray-50 rounded-lg flex flex-col items-center">
            <Calendar className="w-5 h-5 text-gray-600 mb-1" />
            <span className="text-xs">Schedule</span>
    //       </button> 
    //    </div> 
   //   </div> 
   </div> */}

    {/* Variant 2: Focus on Task Flow */}
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
        <div className="space-y-4 px-2">
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
        </div>

         {/* Action Bar */}
    {/* //     <div className="mt-6 flex justify-between items-center p-3 bg-gray-50 rounded-lg"> */}
           {/* <button className="flex items-center gap-2 text-sm font-medium">
    //         <Zap className="w-4 h-4" />
    //         Adjust Energy
    //       </button>
    //       <button className="flex items-center gap-2 text-sm font-medium text-blue-600">
    //         <Brain className="w-4 h-4" />
    //         Take a Break
    //       </button>
    //       <button className="flex items-center gap-2 text-sm font-medium">
    //         <Calendar className="w-4 h-4" />
    //         Schedule
    //       </button> 
    //     </div>
    //   </div>
    // </div>*/}

     {/* Variant 3: Mindful Focus */}
    {/* // <div className="max-w-md mx-auto w-full bg-gradient-to-b from-indigo-50 to-blue-50 rounded-xl shadow-sm overflow-hidden">
    //   <div className="p-6">
    //     <div className="text-center mb-8">
    //       <h1 className="text-2xl font-medium mb-2">Mindful Productivity</h1>
    //       <p className="text-gray-600">Align your energy with your goals</p>
    //     </div>

    //     <div className="space-y-4"> */}
          {/* Current State */}
           {/* <Card>
    //         <CardContent className="p-4">
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <p className="text-sm text-gray-600">Current State</p>
    //               <h2 className="font-medium">High Focus</h2>
    //             </div>
    //             <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
    //               <Zap className="w-8 h-8 text-green-600" />
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card> */}

           {/* Action Cards */}
    {/* //       <div className="grid grid-cols-2 gap-3">
    //         {/* <Card className="bg-white hover:bg-gray-50"> */}
    {/* //           <CardContent className="p-4 text-center">
    //             <Focus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
    //             <h3 className="font-medium">Deep Work</h3>
    //             <p className="text-sm text-gray-600">45min session</p>
    //           </CardContent>
    //         </Card>  */}
            
            {/* <Card className="bg-white hover:bg-gray-50">
    //           <CardContent className="p-4 text-center">
    //             <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
    //             <h3 className="font-medium">Quick Break</h3>
    //             <p className="text-sm text-gray-600">5min meditation</p>
    //           </CardContent>
    //         </Card> */}
    {/* //       </div> */}

        {/* Next Up */}
        {/* <Card>
    //         <CardContent className="p-4">
    //           <h3 className="font-medium mb-3">Coming Up</h3>
    //           <div className="space-y-2">
    //             <div className="flex items-center gap-2 text-sm">
    //               <Clock className="w-4 h-4 text-gray-400" />
    //               <span>Team Meeting at 3:00 PM</span>
    //             </div>
    //             <div className="flex items-center gap-2 text-sm">
    //               <CheckCircle className="w-4 h-4 text-gray-400" />
    //               <span>Review Documentation</span>
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card> */}
    {/* //     </div>*/}
      {/* </div>  */}
     </div>
  </div>)
}
export default DashboardContainer