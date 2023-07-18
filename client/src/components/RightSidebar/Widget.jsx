import React from 'react'
import './RightSidebar.css'
import comment from '../../assets/comment-alt-solid.svg'
import pen from '../../assets/pen-solid.svg'
import blackLogo from '../../assets/blacklogo.svg'

const Widget = () => {
  return (
    <div className='widget'>
        <h4>The Overflow Blog</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen" width='18'></img>
                <p>Observability is the key to the future of software (and to your DevOps Career)</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen" width='18'></img>
                <p>Poadcast 374: How valuable is your  screen name?</p>
            </div>
        </div>
        <h4>Featured on Meta</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt="pen" width='18'></img>
                <p>Review queue workflows - Final release....</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={comment} alt="pen" width='18'></img>
                <p>Please welcome valued Associates:#958 - V2Blast #959 - SpencerG
                </p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={blackLogo} alt="pen" width='18'></img>
                <p>Outdated Answers:accepted answers is now unpinned pn Stack Overflow
                </p>
            </div>
        </div>
        <h4>Hot Meta Posts</h4>
        <div className='right-sidebar-div-1'>
            <div className='right-sidebar-div-2'>
                <p>38</p>
                <p>Why was this spam flg declined,Yet the question marked as spam?</p>
            </div>
            <div className='right-sidebar-div-2'>
                <p>20</p>
                <p>What is the best course of action when a user has high enough rep to ....</p>
            </div>
            <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen" width='18'></img>
                <p>Is a link to the "How to ask" help page a useful comment?</p>
            </div>
        </div>
    </div>
  )
}

export default Widget