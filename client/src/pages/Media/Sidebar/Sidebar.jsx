import React from 'react'
import './Sidebar.css'
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";

import { Users } from "../../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";


function sidebar({ slideIn, handleSlideIn }) {
  const slideInStyle = {
    transform: "translateX(0%)",
  };

  const slideOutStyle = {
    transform: "translateX(-100%)",
  };
  return (
    <div className="sidebar" style={slideIn ? slideInStyle: slideOutStyle}>
      <div className="sidebarWrapper">
        <div className='sidebarList'>
        <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </div>
          <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </div>
          <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </div>
          <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </div>
          <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </div>
          <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </div>
          <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </div>
          <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </div >
        <div className="sidebarListItem" onClick={() => handleSlideIn()} >
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
        </div>
        </div>
        <button className="sidebarButton" onClick={() => handleSlideIn()} >Show More</button>
        <hr className="sidebarHr" />
        <div className="sidebarFriendList" onClick={() => handleSlideIn()} >
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default sidebar