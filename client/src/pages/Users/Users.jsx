import React from 'react'
import "./Users.css";
import { useLocation } from 'react-router-dom';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import UsersList from './UsersList';

const Users = ({ slideIn, handleSlideIn }) => {
    const location=useLocation()
  return (
    <div className='home-container-1'>
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
        <div className="home-container-2" style={{marginTop:"50px"}}>
          <h1 style={{fontWeight:"400px"}} className='userh1'>Users</h1>
                <UsersList />
        </div>

    </div>
  )
}

export default Users