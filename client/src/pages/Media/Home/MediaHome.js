import React from 'react'
import Topbar from '../Topbar/Topbar'
import Sidebar from "../Sidebar/Sidebar"
import Rightbar from "../Rightbar/Rightbar"
import Feed from "../Feed/Feed"
import "./home.css"
function MediaHome({ slideIn ,handleSlideIn}) {
    return (
        <>
        <Topbar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
        <div className="homeContainer">
        <Sidebar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
        <Feed/>
        <Rightbar/>
        </div>
      </>
    )
  
}

export default MediaHome