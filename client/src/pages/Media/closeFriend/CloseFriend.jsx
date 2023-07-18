import React from 'react'
import './CloseFriend.css'

function CloseFriend({user}) {
  const PF = "http://localhost:3000/assets/"
  console.log(user);
  return (
    <div className="sidebarFriend">  
      <img className="sidebarFriendImg" src={ user.profilePicture ? PF + user.profilePicture : PF+ "/person/noAvatar.png"} alt="" />
      <span className="sidebarFriendName">{user.name}</span>
    </div>
  )
}

export default CloseFriend