import { useState } from 'react'
import history from './history'
import './App.css'
import DashboardContainer from './containers/DashboardContainer'
import { Routes ,Route} from 'react-router-dom'
import Navbar from './containers/Navbar'
import SignInContainer from './containers/SignInContainer'
import Paths from './core/Paths'
import CreateAccountContainer from './containers/CreateAccountContainer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div id="" className=''>
    <Navbar/>
  <Routes history={history} >
    <Route path={Paths.home()} element={<DashboardContainer/>}/>
    <Route path={Paths.signin()} element={<SignInContainer/>}/>
    <Route path={Paths.signup()} element={<CreateAccountContainer/>}/>
  </Routes>
  </div>
    </>
  )
}

export default App
