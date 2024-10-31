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
    async userUpdate({preferredName,relationshipStatus,sedentaryLevel,workStatus,dob}){
        let res = await axios.put(this.url+"/user",{data:{
            preferredName,relationshipStatus,sedentaryLevel,workStatus,dob
        }},{headers:{Authorization:"Bearer "+localStorage.getItem(this.token)
        }})
        return res.data
    }
    async logIn({email,password}){
        let res = await axios.post(this.url+"/user/session",
            {email,password}
        )
    }
}
export default new UserApi()