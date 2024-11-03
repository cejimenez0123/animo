import axios from 'axios'
import Enviroment from '../../core/Enviroment'


class UserApi{
    url = Enviroment.path
    token = "token"
    async register({email,password}){
       let res = await axios.post(this.url+"/user/register",{
            email,
            password
        })
        return res.data
    }
    async getUser(){

        try{
        let token = localStorage.getItem(this.token)
        if(token){
        let res = await axios.get(this.url+"/user/",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem(this.token)
            }
        })
        return res.data
        }}catch(e){
            return  e
        }
        
    }
    
    async userUpdate({preferredName,relationshipStatus,sedentaryLevel,workStatus,dob}){
        let res = await axios.put(this.url+"/user/",{
            preferredName,relationshipStatus,sedentaryLevel,workStatus,dob
        },{headers:{Authorization:"Bearer "+localStorage.getItem(this.token)
        }})
        return res.data
    }
    async logIn({email,password}){
        let res = await axios.post(this.url+"/user/session",
            {email,password}
        )
        return res.data
    }
}
export default new UserApi()