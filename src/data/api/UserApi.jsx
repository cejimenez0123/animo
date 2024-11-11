import axios from 'axios'
import Enviroment from '../../core/Enviroment'


class UserApi{
    url = Enviroment.path
    token = "token"
    googleToken="google_token"
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
    generateCryptoRandomState() {
        const randomValues = new Uint32Array(2);
        window.crypto.getRandomValues(randomValues);
    
        // Encode as UTF-8
        const utf8Encoder = new TextEncoder();
        const utf8Array = utf8Encoder.encode(
          String.fromCharCode.apply(null, randomValues)
        );
    
        // Base64 encode the UTF-8 data
        return btoa(String.fromCharCode.apply(null, utf8Array))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      }
      async loginGoogle(creds){
        let res = await axios.post(this.url+"/user/auth/google",{creds:creds})
    return res.data
      }
      async registerGoogle(creds){
        let res = await axios.post(this.url+"/user/register/google",{
            creds:creds
        })
        console.log(res)
        return res.data
      }
    async getAccessToken(token) {
        let res = await axios.post(this.url+"/user/auth/google",{creds:token})
    return res.data
        }
        //   .then(response => response.json())
        //   .then(data => {
        //     // Handle the response from the server, e.g.,   
        //  display user information
        //   })
        //   .catch(error => {
        //     console.error('Error sending ID token:', error);
        //   });
        // let res = await axios.get(this.url+"/user/google/token/"+credentialId)

    
        // console.log(res.data)
        // return res.data
      

//    async googleGetUser(){
//             const token = localStorage.getItem(this.googleToken)
//             const peopleApiEndpoint = 'https://people.googleapis.com/v1/people/me';
//             const config = {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`
//               }
//             };
//             const response = await axios.get(peopleApiEndpoint, config);
//             return response.data;
//         }


      
  
    async logIn({email,password}){
        let res = await axios.post(this.url+"/user/session",
            {email,password}
        )
        return res.data
    }
}
export default new UserApi()