import React, {useEffect} from 'react'
import {  Link,useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import '../../styles/pay.css';

const Logout = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    var User = useSelector((state) => (state.currentUserReducer))
  
    const handleLogout=()=>{
      dispatch({type:'LOGOUT'})
      navigate('/')
      dispatch(setCurrentUser(null))
    }
  return (
    
    <div className='log-body'>
        <h3>Kindly Please Logout and Login again to ask questions.</h3>
    
        <button className='nav-item nav-Links' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
