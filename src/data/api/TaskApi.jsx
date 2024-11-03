import Enviroment from "../../core/Enviroment"
import axios from "axios"

class TaskApi{

    url=Enviroment.path

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
        console.log("SSF",res)
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
        let res = await axios.post(this.url+"/task/",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            },
            data:{
                name,
                description,
                link,
                parentId,
                priority,
                complexity,
                startTime,
                endTime,
                dueDate,
                isLowFocus,
                isWork,
                parentId:parent.id
            }
        })
       
        return res.data
    }
}
export default new TaskApi()