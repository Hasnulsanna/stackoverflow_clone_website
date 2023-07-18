import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'

import {sendOtp} from '../../actions/otp'




const Otp = () => {

  const [otp,sentOtp]=useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OtpUser = async (e) =>{
    e.preventDefault();

      if(otp === ""){
        toast.error("Enter your otp")
      }
      else if(!/[^a-zA-Z]/.test(otp)){
        toast.error("Enter Valid Otp")
      }
      else{
        console.log(location.state);
        try{
          const data = {
            otp, email: location.state
          }
          console.log(data);
            const response = await axios.post('http://localhost:5000/login', {otp, email: location.state});
            console.log(response);
            dispatch(sendOtp({email:location.state,token:response.data.userToken}))
            toast.success(response.data.message)
            navigate("/chatbot")
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
              toast.error(error.response.data.message);
            } else {
              toast.error("An error occurred. Please try again.");
            }
            console.log(error.message);
          }
      }
      

  }

  return (
    <>
    <section>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className="form_data">
          <div className="form_heading">
            <h1>Please Enter Your OTP Here</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input type="text" name="otp" id="" onChange={(e) => sentOtp(e.target.value)} placeholder='Enter Your OTP' />
            </div>
            <button className='btn' onClick={OtpUser}>Submit</button>
          </form>
        </div>
        <ToastContainer />
    </section>
    </>
  )
}

export default Otp