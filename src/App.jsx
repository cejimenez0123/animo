import { useState } from 'react'
import history from './history'
import './App.css'
import DashboardContainer from './containers/DashboardContainer'
import { Routes ,Route} from 'react-router-dom'
import Navbar from './containers/Navbar'
import { useEffect } from 'react'
import UserApi from './data/api/UserApi'
import SignInContainer from './containers/SignInContainer'
import Paths from './core/Paths'
import CreateAccountContainer from './containers/CreateAccountContainer'
import TaskContainer from './containers/TaskContainer'
import Context from './context'
import useCaseGetCurrentUser from './usecase/user/useCaseGetCurrentUser'
function App() {
  const [user,setUser]=useState(null)
  const [mode,setMode]=useState(null)
  useEffect(()=>{
    let token = localStorage.getItem("token")
console.log(token)
    if(token!=null){
    UserApi.getUser().then(data=>{
        setUser(data.user)
     
        console.log("Logged in")
        
    }).catch(err=>{
      console.log("logged out")
        setUser(null)
   
    })
  }
},[])

  return (
    <>
     <Context.Provider value={{user,setUser,setMode,mode}}>
  <div id="" className=''>
   
    <Navbar/>
  <Routes history={history} >
    <Route path={Paths.home()} element={<DashboardContainer/>}/>
    <Route path={Paths.signin()} element={<SignInContainer/>}/>
    <Route path={Paths.signup()} element={<CreateAccountContainer/>}/>
    <Route path={Paths.task.route()}
            element={<TaskContainer/>}/>
</Routes>

  </div>
  </Context.Provider>
    </>
  )
}

export default App
