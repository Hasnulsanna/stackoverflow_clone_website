import React, { useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'


import "../../styles/mix.css"

const Login = () => {
  const User=useSelector((state)=>state.currentUserReducer)
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  const sendOtp = async (e) => {
    e.preventDefault();

    if(email === ""){
      toast.error("Enter your email")
    }else if(!email.includes("@")){
      toast.error("Enter valid email")
    }
    else{
        if(email === User?.result?.email){
        const response = await axios.post('http://localhost:5000/otp',
          {email}
        );
        console.log(response);
        toast.success("user logined successfully")
        console.log({state:email});
        navigate('/otp',{state:email})
        }
         else {
        toast.error("Please Signup")
      }

    }
  }


  return (
    <>
        <section>
            <br/>
            <br/>
            <br/>
            <div className="form_data">
                <div className="form_heading">
                    <h1>Welcome Back, Log In</h1>
                    <p>Hi, Please verify it's you</p>
                </div>
                <form>
                    <div className="form_input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
                    </div>
                    <button className='btn' onClick={sendOtp}>Verify
                    </button>
                    <p>We are happy to be here to help you. </p>
                </form>
            </div>
            <ToastContainer />
        </section>
    </>
)
}

export default Login