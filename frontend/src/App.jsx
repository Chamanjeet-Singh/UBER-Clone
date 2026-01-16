import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import Captainlogin from './pages/Captainlogin.jsx'
import Captainsignup from './pages/Captainsignup.jsx'
import Home from './pages/Home.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectWrapper.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/captain-riding' element={<CaptainRiding/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<Captainlogin/>}/>
        <Route path='/captain-signup' element={<Captainsignup/>}/>
        <Route path='/home' 
        element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
        }
        />
        <Route path='/user/logout' 
        element={
        <UserProtectedWrapper>
            <UserLogout/>
        </UserProtectedWrapper>
      }
      />
      <Route path='/captain-home' element={
        <CaptainProtectedWrapper>
          <CaptainHome/>
        </CaptainProtectedWrapper>
      }/>
      </Routes>
    </div>
  )
}

export default App