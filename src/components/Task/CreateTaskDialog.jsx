import { useContext, useState } from "react"
import TaskApi from "../../data/api/TaskApi"
import context from "../../context"



export default function CreateTaskDialog(props){
    const {mode}=useContext(context)
    const [name,setName]=useState("")
    const [isWork,setIsWork]=useState(false)
    const [isLow,setIsLow]=useState(false)
    const [startTime,setStartTime]=useState(null)
    const [endTime,setEndTime]=useState(null)
    const [dueDate,setDueDate]=useState(null)
    const [isEvent,setIsEvent]=useState(false)
    const [complexity,setComplexity]=useState(0)
    const [priority,setPriority]=useState(0)
    const [description,setDescription]=useState("")
    const handleCreateTask=()=>{
        TaskApi.postTask({name:name,
            description:description,
            link:null,
            priority:priority,
            complexity:complexity,
            startTime:startTime,
            endTime:endTime,
            dueDate:dueDate,
            isLowFocus:isLow,
            isWork:isWork,
            }).then(data=>{
                alert("GO Do it")
            }).catch(e=>{
                alert(e.message)
            })
    }
    return(<dialog id="dialog--create-task" className="modal">
    <div className="modal-box">
      <div className="modal-action">
        <form className="form-control w-full" method="dialog">
            
            <label>
                <input  onChange={(e)=>setName(e.target.value)}
                        className="grow w-full text-xl text-black py-2"
                        placeholder="Untitled Task"
                />
            </label>    
            <label>
                <textarea 
                    className="grow w-full  text-black py-2" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Description"
                />
            </label>
            <div className="form-control">
  <label className="label text-xl cursor-pointer">
    What's the needed energy?
    </label>
    <div className="flex pl-4 justify-around flex-row h-12 flex-start ">
    <span className="label-text text-xl">Low </span>
    <input   checked={isLow=== true} 
            onChange={(e) => setIsLow(true)}
            name="radio-energy" 
            type="radio"  
            className="radio mr-8 checked:bg-green-500" 
           />
    <span className="label-text text-xl mr-2">High</span>
    <input  type="radio" 
            name="radio-energy" 
            checked={isLow=== false} 
            onChange={(e) => setIsLow(false)}
            className="radio checked:bg-green-500"  />
    </div> 
    </div>
    <div className="form-control ">
  <label className="label text-xl cursor-pointer">
    Is it work?
    </label>
    <div className="flex pl-4 justify-around flex-row h-12 flex-start " >
    <span className="label-text mr-2 text-xl my-auto h-fit">Relax</span>
    <input type="radio" 
    checked={isWork=== false} onChange={(e) => setIsWork(false)}name="radio-work" className="radio my-auto mr-8 checked:bg-green-500" defaultChecked />
   
    <span className="label-text my-auto mr-2 text-xl">Work</span>
    <input checked={isWork === true} 
    onChange={(e) => setIsWork(true)}type="radio" name="radio-work" className="radio my-auto checked:bg-green-500"  />
    </div>
 
  
  </div>
 
            <div className="form-control">
  <label className="label text-xl cursor-pointer">
    Is it an event or a task?
    </label>
    <div className="flex pl-4 justify-around flex-row h-12 flex-start ">
    <span className="label-text mr-2 text-xl">Event</span>
    <input name="radio-event" type="radio"  className="radio mr-8 checked:bg-green-500"
     checked={isEvent=== true} 
     onChange={(e) => setIsEvent(true)}/>
    <span className="label-text text-xl mr-2">Task</span>
    <input type="radio" name="radio-event" 
    checked={isEvent=== false} 
    onChange={(e) => setIsEvent(false)}className="radio checked:bg-green-500"  />
    </div> 

    </div>
    {isEvent?<div>
            <label className="text-xl mb-4">Start
                <input value={startTime} 
                onChange={e=>setStartTime(e.target.value)} 
                className="input  w-full" 
                type="datetime-local"/>
            </label>
            <label className="text-xl">
                End
                    <input 
                    value={endTime}
                        onChange={e=>setEndTime(e.target.value)}
                        className="input w-full" 
                        type="datetime-local"
                    />
            </label>
          
            </div>:isWork?<div>
            <label className="text-xl mb-4">Due Date
                <input  value={dueDate} 
                        onChange={e=>setDueDate(e.target.value)}
                        className="input  w-full" 
                        type="datetime-local"/></label>
            
            </div>:null
            }  {isWork? <label className="text-xl">
                
               <div className="mb-2">Priority</div>
            <input type="range" min={0} max="4" value={priority}
                onChange={e=>setPriority(e.target.value)}
             className="range range-success" step="1" />
<div className="flex w-full justify-between px-2 text-xs">
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
</div>
            </label>:null}
            <label className="text-xl">
            <div className="mb-2">Complexity
        </div>
            <input type="range" onChange={e=>setComplexity(e.target.value)}

            
            min={0} max="4" value={complexity} className="range range-success" step="1" />
<div className="flex  w-full justify-between px-2 text-xs">
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
</div>
            </label>
      
        
    <button 
        onClick={handleCreateTask}
        className="btn mb-8 bg-green-500 text-white mt-8 text-2xl py-2 font-bold">Create</button>
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>)
}