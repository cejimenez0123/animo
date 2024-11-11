import Enviroment from "../../core/Enviroment"
import axios from "axios"

class TaskApi{

    url=Enviroment.path
    token = "token"
    async getEnergyTask(){
        let res = await axios.get(this.url+"/task/energy")
        return res.data
    }
    async getModeTask(){
        let res = await axios.get(this.url+"/task/mode")
        return res.data
    }
    async getPublicChildTasks({parentId,energy,mode}){
        let eng = "low"
        let m = "relax"
        if(energy.name.toLowerCase().includes("high")){
            eng="high"
        }
        if(mode.name.toLowerCase().includes("work")){
            m = "work"
        }
            energy.name=="Low Energy"
    
        let res = await axios.get(this.url+"/task"+"/"+parentId+"/energy/"+eng+"/mode/"+m+"/public")
        console.log(res)
        return res.data
    }
    async getFlow(){
        let token = localStorage.getItem(this.token)
        let res = await axios.get(this.url+"/task/flow",{headers:{
            Authorization:"Bearer "+token
        }})
        console.log(res)
        return res.data
    }
    async getChildrenTasks({parentId}){
        let token =localStorage.getItem("token")
        try{
            if(token){
        let res = await axios.get(this.url+"/task/"+parentId+"/children",{
            headers:{
                "Authorization":"Bearer "+token
            }
        })
      
        return res.data
    }else{
        throw new Error("No token")
    }
    }catch(e){
        return e
    }
    }
    async getProtectChildTasks({parentId,mode,energy}){
        let eng = "low"
        let m = "relax"
        if(energy.name.toLowerCase().includes("high")){
            eng="high"
        }
        if(mode.name.toLowerCase().includes("work")){
            m = "work"
        }
            energy.name=="Low Energy"
    
        let res = await axios.get(this.url+"/task/"+parentId+"/energy/"+eng+"/mode/"+m+"/protected",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token"),
            }
        })
     
        return res.data
    }
    async postTask({name,
                    description,
                    parent,
                    link,
                    parentId,
                    priority,
                    complexity,
                    startTime,
                    endTime,
                    dueDate,
                    isLowFocus,
                    isWork,
                    }){

                        try{
        let token = localStorage.getItem(this.token)
      if(token){
        let id = null
        if(parent.id){
            id=parent.id
        }
      
        let res = await axios.post(this.url+"/task/",{
            name,
            description,
            link, 
            priority,
            complexity,
            startTime,
            endTime,
            dueDate,
            isLowFocus,
            isWork,
            parentId:id
        }, {
    headers:{
        "Authorization":"Bearer "+token,
    },
})

return res.data
      }else{
        throw new Error("No Token")
      }
  
}catch(e){

    return e
}
       
     
    }
    async postBreakdown({id}){
        let token = localStorage.getItem(this.token)
        try{
            if(token){
                let res =await axios.post(this.url+"/task/"+id+"/breakdown",{},
                {headers:{Authorization:
                    "Bearer "+token
                }})
console.log(res)
                return res.data
            }else{
                throw new Error("No Token")
            }
        }catch(e){
            return e
        }
    }
    async getTaskProtected({id}){
        let token = localStorage.getItem(this.token)
        try{
            if(token){
        let res =await axios.get(this.url+"/task/"+id+"/protected",
        {headers:{Authorization:
            "Bearer "+token
        }})
        return res.data
    }else{
        throw new Error("No Token")
    }
    }catch(e){
        return e
    }
    }
    async getTaskPublic({id}){
        let res =await axios.get(this.url+"/task/"+id+"/public")
        return res.data
    }
    async getSchedule(){
        let token =localStorage.getItem(this.token)
        if(token!=null){
        let res =await axios.get(this.url+"/user/task/schedule",{headers:{Authorization:
            "Bearer "+token
        }})
    
        return res.data
    }else{
        throw new Error("No Token")
    }
    }
}
export default new TaskApi()