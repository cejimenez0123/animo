import { useState } from 'react'
import history from './history'
import './App.css'
import DashboardContainer from './containers/DashboardContainer'
import { Routes ,Route} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div id="" className=''>
  <Routes history={history} >
    <Route path={"/"} element={<DashboardContainer/>}/>


  </Routes>
  </div>
    </>
  )
}

export default App
