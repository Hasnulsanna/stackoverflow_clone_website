import React from 'react'
import {Routes ,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import Login from './pages/Chatbot/Login'
import Otp from './pages/Chatbot/Otp'
import Chatbot from './pages/Chatbot/Chatbot'
import Subscribe from './pages/payment/Subscribe'
import Logout from './pages/payment/Logout'
import MediaLogin from './pages/Media/Login/MediaLogin'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import MediaHome from './pages/Media/Home/MediaHome'
import Profile from './pages/Media/profile/Profile'
import ProfileUpdate from './pages/Media/profile/ProfileUpdate'


const AllRoutes = ({ slideIn, handleSlideIn }) => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
        <Route path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/Questions' element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/AskQuestion' element={<AskQuestion />} />
        <Route path='/Questions/:id' element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Tags' element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Users' element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/Users/:id' element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<Otp />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path='/subscribe' element={<Subscribe/>} />
        <Route path='/Logout' element={<Logout/>} />
        <Route path='/media/login' element={user ? <Navigate to="/home" /> : <MediaLogin slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
        <Route path='/home' element={<MediaHome slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path='/media/profile/:name' element={<Profile slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
        <Route path="/media/profileupdate/:name" element={<ProfileUpdate slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />

    </Routes>
  )
}

export default AllRoutes

