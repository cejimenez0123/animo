import { useState } from 'react'
import history from './history'
import './App.css'
import DashboardContainer from './containers/DashboardContainer'
import { Routes ,Route} from 'react-router-dom'
import Navbar from './containers/Navbar'
import SignInContainer from './containers/SignInContainer'
import Paths from './core/Paths'
import CreateAccountContainer from './containers/CreateAccountContainer'
import Context from './context'
function App() {
  const [user,setUser]=useState(null)
  
  return (
    <>
     <Context.Provider value={{user,setUser}}>
  <div id="" className=''>
   
    <Navbar/>
  <Routes history={history} >
    <Route path={Paths.home()} element={<DashboardContainer/>}/>
    <Route path={Paths.signin()} element={<SignInContainer/>}/>
    <Route path={Paths.signup()} element={<CreateAccountContainer/>}/>
  </Routes>

  </div>
  </Context.Provider>
    </>
  )
}

export default App
