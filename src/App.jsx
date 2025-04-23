import React from 'react'
import Feed from './components/Feed'
import Login from './components/Login'
import { BrowserRouter, Routes , Route} from "react-router-dom"
import Body from './components/Body'
import Profile from './components/Profile'
import { Provider } from "react-redux"
import appStore from './utils/appStore'
import Connections from './components/Connections'
import Requests from './components/Requests'

const App = () => {
  return (
    <div>
 <Provider store={appStore}>
  <BrowserRouter>
         <Routes>
             <Route path='/' element={<Body />}>
                  <Route path='/feed' element={<Feed />} />
                  <Route path="/profile" element={<Profile />}/>
                  <Route path="/connections" element={<Connections />}/>
                  <Route path='/requests' element={<Requests />} />
                  <Route path='/' element={<Login />}/>
            </Route>
         </Routes>
  </BrowserRouter>
  </Provider>

    </div>
  )
}

export default App
