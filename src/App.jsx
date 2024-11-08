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
import { useDispatch, useSelector } from 'react-redux'
import getCurrentUser from './actions/user/getCurrentUser'
function App() {
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch()
  const [mode,setMode]=useState(null)
  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token){
    dispatch(getCurrentUser())

    }
},[])

  return (
    <>
     <Context.Provider value={{user,setMode,mode}}>
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
