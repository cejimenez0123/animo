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
        console.log(res)
        return res.data
    }
    async getPublicChildTasks({parentId}){
        let res = await axios.get(this.url+"/task/"+parentId+"/energy/"+eng+"/mode/"+mode+"/")
        console.log(res)
        return res.data
    }
    async getProtectChildTasks({parentId,mode,energy}){
        let eng = "low"
        let m = "relax"
        if(energy.name=="High Energy"){
            eng="high"
        }
        if(m.name=="Work"){
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
    async postTask({name,description,parent}){
        let res = await axios.post(this.url+"/task/",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            },
            data:{
                name,
                description,
                parentId:parent.id
            }
        })
        return res.data
    }
}
export default new TaskApi()