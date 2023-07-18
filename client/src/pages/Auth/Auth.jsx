import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup,login } from '../../actions/auth'

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () =>{
    setIsSignup(!isSignup)
  }


  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!email && !password){
      alert("Enter email and Password")
    }
    if(isSignup){
      if(!name){
        alert("Enter a name to continue")
      }
      dispatch(signup({name,email,password}),navigate)
      navigate('/')
    }
    else{
      dispatch(login({email,password}),navigate)
      navigate('/')
      }
  }

  return (
    <section className='auth-section'>
      { isSignup && <AboutAuth/>}
      <div className='auth-container-2'>
        { !isSignup && <img src={icon} alt='stack overflow' className='login-logo'/> }
        <form onSubmit={handleSubmit}>
          { isSignup && (
            <label htmlFor='name'>
              <h4>Display Name </h4>
              <input type="type" id="name" name="name" onChange={(e)=>{setName(e.target.value)}}/>
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name="name" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
          </label>
          <label htmlFor="password">
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <h4>Password</h4>
            { !isSignup && <h4 style={{color:"#007ac6",fontSize:"13px"}}>Forgot Password?</h4> }
            </div>
            <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            {
              isSignup && <p style={{color:"#666767" , fontSize:"13px"}}>password must contain atleast eight <br/>characters,including atleast 1 letter and 1 <br/>number.</p>
            }
          </label>
          {isSignup && (
            <label htmlFor='check' className='check'>
              <input type="checkbox" id="check"/>
              <p style={{ fontSize:"13px"}}>Opt-in to receive occasional,<br/>product updates,user research invitations,<br/>company announcements,and digests.</p>
            </label>
          )}
          <button type='submit' className='auth-btn'>{ isSignup ? 'Sign up' :'Log in'}</button>
          {
            isSignup && (
              <p style={{color:"#666767" , fontSize:"13px"}}>
                By clicking "Signup" ,You agree to our 
                <span style={{color:"#007ac6"}}> terms of<br/> service</span>
                , <span style={{color:"#007ac6"}}>privacy policy</span> 
                and <span style={{color:"#007ac6"}}>cookie policy</span>
              </p>
            )
          }
          <p>
          { isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? "Log in":'sign up'}</button>
        </p>
        </form>
      </div>
    </section>
  )
}

export default Auth



