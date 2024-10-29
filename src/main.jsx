import { createRoot } from 'react-dom/client'
import React from 'react';
import './index.css';
import App from './App';
import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import logger from "redux-logger"


const reducer = combineReducers({
  // pages: pageSlice.reducer,
  // users: userSlice.reducer,
  // books: bookSlice.reducer,
  // libraries: libSlice.reducer
})
// const store = configureStore({reducer:reducer,

//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(

//     { serializableCheck: false
//     }
//   ).concat(logger)

// })
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//   <Provider store={store} >

//     <React.StrictMode>
//     <App />
       
//     </React.StrictMode>

//   </Provider>
  
//    </BrowserRouter>,
// );
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     {/* <Provider store={store} > */}
   <React.StrictMode>   
     <App />
       </React.StrictMode>

  {/* </Provider> */}
   </BrowserRouter>,
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
