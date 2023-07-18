import React from 'react'
import './MediaLogin.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useRef } from "react";
import { loginCall } from '../../../apiCalls';
import { AuthContext } from "../../../context/AuthContext";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function MediaLogin() {
  const User=useSelector((state)=>state.currentUserReducer)
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate()
  const { user,isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    if(email.current.value === User?.result?.email){
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    }
    else{
      alert("Invalid credentials");
    }
  };
  return (
    <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">SocialGlobe.</h3>
        <span className="loginDesc">
          Connect with friends and the world around you on SocialGlobe.
        </span>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
          <input type="password" placeholder="Password" required className="loginInput" ref={password}/>
          <button className="loginButton" type="submit" >
              {isFetching ? (
                <CircularProgress style={{'color': 'white'}} size="25px" />
              ) : (
                "Log In"
              )}
            </button>
          <span className="loginForgot">Forgot Password?</span>
        </form>
      </div>
    </div>
  </div>
  )
}

// }

export default MediaLogin