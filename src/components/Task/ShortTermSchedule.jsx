import { useContext, useEffect } from "react"
import context from "../../context"
import { useNavigate } from "react-router-dom"
import Paths from "../../core/Paths"
import getFlow from "../../actions/task/getFlow"
import { useDispatch, useSelector } from "react-redux"


function ShortTermSchedule (props){
  const dispatch = useDispatch()
  const flowTasks = useSelector(state=>state.task.flowTasks)
  const scheduledTasks = useSelector(state=>state.task.scheduledTasks)
  const isLoading = useSelector(state=>state.task.loading)
  const err = useSelector(state=>state.task.error)
  const user = useSelector(state=>state.user.user)
 
    useEffect(()=>{
      if(flowTasks && flowTasks.length==0){
        dispatch(getFlow())
      }
 
   
    },[])
    const todayIs = Intl.DateTimeFormat("en-US",{
      weekday:"long",
      day:"numeric",
      month:"short"
    }).format(new Date());
    const navigate = useNavigate()
 
    if(isLoading){
        return(<div>
            isLoading
        </div>)
    }
    if(err){
        return(<div>
            {err.message}
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
       <div className="p-4">
       <div className="flex items-center justify-between mb-6">
         <div>
            <h1 className="text-xl font-semibold">Your Flow</h1>
            <p className="text-gray-600">{todayIs}</p>
          </div>
          <div className="flex items-center gap-2">
     
           <span className="text-sm font-medium">Feeling Focused</span>
           </div> 
        </div>
     <div className="space-y-4 px-2">
      <div className="min-h-24">
      {flowTasks?flowTasks.map(task=>{
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

      </div>)}):<div className="flex-1 p-3 bg-gray-50 rounded-lg">
    <h3 className="font-medium"></h3>
    {/* <p className="text-gray-600 text-sm">Weekly sync</p> */}
  </div>}
        </div>
        </div>
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