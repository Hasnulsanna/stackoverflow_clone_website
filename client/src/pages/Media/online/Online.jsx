import React from 'react'
import './online.css'
const PF = "http://localhost:3000/assets/"
const PPF = process.env.REACT_APP_PUBLIC_FOLDER

function Online({user}) {
    return (
        <div className="rightbarFriend">
          <div className="rightbarProfileImgContainer">
            <img className="rightbarProfileImg" src={PF + user.profilePicture} alt="" />
            <span className="rightbarOnline"></span>
          </div>
          <span className="rightbarUsername">{user.name}</span>
        </div>
      );
}

export default Online