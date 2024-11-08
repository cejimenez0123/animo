import { useParams } from "react-router-dom"
import useCaseGetTask from "../usecase/task/useCaseGetTask"
import { useContext, useEffect, useState } from "react"
import context from "../context"
import deleteIcon from "../images/icons/delete.svg"
import starIcon from "../images/icons/star.svg"
import TaskApi from "../data/api/TaskApi"
import useCaseGetChildrenTasks from "../usecase/task/useCaseGetChildrenTasks"


export default function TaskContainer(props){
    const params = useParams()
    const {user}=useContext(context)
    const {children,taskErr,taskIsLoading}=useCaseGetChildrenTasks({parentTask:params})
    console.log(children)
    const [childTasks,setChildTask]=useState(children)
    const [childrenErr,setChildrenErr]=useState(taskErr)
   
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [isWork,setIsWork]=useState(false)
    const [priority,setPriority]=useState(0)
    const [complexity,setComplexity]=useState(0)
    const {task,isLoading,isError}=useCaseGetTask({id:params.id})
    useEffect(()=>{
setChildTask(children)
    },[children])
    useEffect(()=>{
  
        if(task){
            setName(task.name)
            setDescription(task.description)
            setPriority(task.priority)
            setComplexity(task.complexity)
            setIsWork(task.isWork)
        }
    },[task,params])
    const breakdownTask = ()=>{
        TaskApi.postBreakdown(params).then(data=>{
            const {tasks}=data
            setChildTask(tasks)
        }).catch(err=>{
            setChildrenErr(err)
        })
    }
    function isValidHttpUrl(string) {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
      }
      
    if(isLoading){
        return(<div>
            isLoading
        </div>)
    }
    if(isError){
        return(<div>
            {isError.message}
        </div>)
    }
    if(task){
        const stars =()=>{
            let arr=[]
        
            for(let i=0;complexity>=i;i++){
                arr.push(<img className="w-6 h-6" src={starIcon}/>)
            }
            return(<div className="flex flex-row">
                {arr}
                </div>)
        }
    return(<div className="flex pb-48 flex-col justify-between">
    <div >
      <div className="form-control px-8 mt-8">
            <div className="text-right">
                <p className="text-blue-600 hover:font-bold">Mark Completed</p>
            </div>
            <label>
                <input  
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                        className="grow w-full text-xl text-black py-2"
                        placeholder="Untitled Task"
                />
            </label>    
            <label>
                <textarea 
                    className="grow w-full min-h-52 max-h-72 text-black py-2" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Description"
                />
            </label>
            <div className="form-control">
 
   
  

    </div>
   {isWork? <label className="text-xl">
                
               <div className="mb-2">Priority</div>
            <input type="range" min={0} max="2" value={priority}
                onChange={e=>setPriority(e.target.value)}
             className="range range-success" step="1" />
<div className="flex w-full justify-between px-2 text-xs">
  <span className="text-center">|
    <p>Low Priority</p>
  </span>
  <span>|</span>
  <span className="text-center">|
    <p>High Priority</p>
  </span>
  
 
</div>
            </label>:null}
            {task.user!=null && task.user.id == user.id?<label className="text-xl">
            <div className="mb-2">Complexity
        </div>
            <input type="range" onChange={e=>setComplexity(e.target.value)}

            
            min={"0"} max="4" value={complexity} className="range range-success" step="1" />
<div className="flex  w-full justify-between px-2 text-xs">
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
  <span>|</span>
</div>
            </label>:<label className="text-xl">
            <div className="mb-8 flex-row flex">Complexity <p className="ml-8">{stars()}</p>
        </div>
            
            </label>}
      
        
    
      </div>
      <div className="w-fit  mx-auto">
      {task?
      <div className="flex h-20   flex-row">
        <button className="w-16 my-auto h-16 mr-8">
            <img    className={"mx-auto"}
                    src={deleteIcon}/>
        </button>
      <button 
            onClick={breakdownTask}
            className="    
                            bg-blue-500 
                            text-white 
                            text-2xl ">Breakdown Task</button>
     </div> :null}
      </div>
        {!isLoading && !taskErr && childTasks.map(task=>{
            
           
            
            return(<div className=" w-[20rem] mx-auto  border my-8 border-black rounded-lg">
                <h6 className="mx-auto text-center p-4 w-fit px-8 py-8">{task.name}</h6><p>{task.description}</p>
                {isValidHttpUrl(task.link)?<a href={task.link}>{task.link}</a>:null}</div>)})}
</div>
{}
        
{/* {user?

    <div className={"dropdown dropdown-top dropdown-end"}>
   <div 
    tabIndex={0} role="button" className="btn m-1 fixed bottom-10 text-white font-bold  rounded-[50%] bg-blue-600 w-28 h-28 right-10">
        <p className="w-fit mx-auto mt-10">Completed</p></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>

</div>

     :null}  */}
 
    </div>)
    }else{
        return<div>
            Else
        </div>
    }
    
}