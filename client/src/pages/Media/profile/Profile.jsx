import React from 'react'
import './profile.css'
import Topbar from '../Topbar/Topbar'
import Sidebar from "../Sidebar/Sidebar"
import Rightbar from "../Rightbar/Rightbar"
import Feed from "../Feed/Feed"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";




function Profile({slideIn,handleSlideIn}) {
  const PF = "http://localhost:3000/assets/"
  const [user, setUser] = useState({});
  const params = useParams()
  const name = useParams().name;
console.log(name);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/users/?name=${name}`);
      setUser(res.data);
    };
    fetchUser();
  }, [name]);
  return (
    <>
      <Topbar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      <div className="profile">
        <Sidebar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.name}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed name={name}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile