import { useContext } from "react"
import useCaseGetSchedule from "../../usecase/task/useCaseGetSchedule"
import context from "../../context"
import { useNavigate } from "react-router-dom"
import Paths from "../../core/Paths"



function ShortTermSchedule (props){
    const {scheduledTasks,scheduleErr,scheduleIsLoading}=useCaseGetSchedule()
    const {user}=useContext(context)
    const navigate = useNavigate()
    if(!user){
        return null
    }
    if(scheduleIsLoading){
        return(<div>
            isLoading
        </div>)
    }
    if(scheduleErr){
        return(<div>
            {scheduleErr.message}
        </div>)
    }
    function isSameDay(date1, date2) {

        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      }
     
      
      
    function formatDate(date) {
       
        const formattedDate = new Intl.DateTimeFormat('en-US', {
           
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date(date));
      
        return <div className="w-[5rem] flex flex-row text-gray-500">{formattedDate}</div>;   
      
      }
    return(<>
     <div className="space-y-4 px-2">
        {scheduledTasks.filter(task=>{return task.startTime?isSameDay(new Date(task.startTime),new Date()):isSameDay(new Date(task.dueDate),new Date())}).map(task=>{
            return(<div>
                     <div className="flex gap-3 text-sm">
                        <div className="flex flex-col item-center h-fit">
                        <p>{task.startTime?formatDate(task.startTime):formatDate(task.dueDate)}</p>
                        <p className="mt-4">{task.endTime?formatDate(task.endTime):null}</p>
                        </div>
        {/* // <div className="w-16 text-gray-500">{task.startTime??task.dueDate}</div> */}
            <div onClick={()=>navigate(Paths.task.createRoute(task.id))} className="flex-1 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium">{task.name}</h3>
              {/* <p className="text-gray-600 text-sm">Weekly sync</p> */}
            </div>
          </div>
    
                </div>)
        })}
          {/* <div className="flex items-center gap-3 text-sm">
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
          </div> */}
        </div>
    </>)
}
export default ShortTermSchedule