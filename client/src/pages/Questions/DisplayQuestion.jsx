import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import QuestionsDetails from './QuestionsDetails'

const DisplayQuestion = ({ slideIn, handleSlideIn }) => {
  return (
    <div className='home-container-1'>
      {/* <LeftSidebar/> */}
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
    <div className='home-container-2'>
    <QuestionsDetails/>
    </div>
    <div>
    <RightSidebar/>
    </div>
  </div>
  )
}

export default DisplayQuestion
