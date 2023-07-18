
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './AskQuestion.css';
import { askQuestion } from '../../actions/question';
import { updateQuestion } from '../../actions/update';



const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const location = useLocation();


  const profile = JSON.parse(localStorage.getItem('Profile'));
  const handleSubmit = async (e) => {
    console.log("profile",profile);
    console.log("user",User);
    e.preventDefault();
    let questionPostedCount=profile.result.questionPostedCount
    let count=profile.result.lastQuestionPostedDate
    const userPostedDate = profile.result.lastQuestionPostedDate
    ? new Date(profile.result.lastQuestionPostedDate).toLocaleDateString()
    : null;
    console.log(userPostedDate);
    if (profile.result.plan === 'Free') {
      const today = new Date().toLocaleDateString();
      if (userPostedDate === today) {
        alert('Free plan users can post only 1 question per day');
        return;
      }
      else{
        await dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              questionTags,
              userPosted: User.result.name,
              userId: User?.result._id,
            },
            navigate
          )
        );
        const updatecount=questionPostedCount+1;
        console.log(updatecount);
        await dispatch(
          updateQuestion(profile?.result._id,{lastQuestionPostedDate: new Date(),
            questionPostedCount:questionPostedCount+1,}) // Dispatch the updateUserQuestionCount action
        );
      }
    } else if (profile.result.plan === 'Silver') 
    {
      let questionPostedCount = profile.result.questionPostedCount;
      const today = new Date().toLocaleDateString();
     
      console.log("today",today,userPostedDate);
      if (userPostedDate !== today) {
        console.log("sanna");
       
        questionPostedCount = 0;
      }
      if (questionPostedCount >= 5) {
        alert('Silver plan users can post up to 5 questions per day');
        return;
      }else{
        await dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody,
              questionTags,
              userPosted: User.result.name,
              userId: User?.result._id,
            },
            navigate
          )
        );
        console.log(questionPostedCount);
        const updatecount=questionPostedCount+1;
        console.log(updatecount);
        await dispatch(
          updateQuestion(profile?.result._id,{lastQuestionPostedDate: new Date(),
            questionPostedCount:questionPostedCount+1,plan:profile.result.plan}) // Dispatch the updateUserQuestionCount action
        );
      }
      navigate('/');
    }
    else{
      await dispatch(
        askQuestion(
          {
            questionTitle,
            questionBody,
            questionTags,
            userPosted: User.result.name,
            userId: User?.result._id,
          },
          navigate
        )
      )
      console.log(questionPostedCount);
        const updatecount=questionPostedCount+1;
        console.log(updatecount);
        await dispatch(
          updateQuestion(profile?.result._id,{lastQuestionPostedDate: new Date(),
            questionPostedCount:questionPostedCount+1,plan:profile.result.plan}) // Dispatch the updateUserQuestionCount action
        );
      navigate('/');
    }
    
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setQuestionBody((prevBody) => prevBody + '\n');
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>Be specific and imagine you're asking a question to another person</p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an Rfunction for finding thhe index of an element in vector"
              />
            </label>
            <div className="ask-body">
              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>Include all the information someone needs to answer your question</p>
                <textarea
                  id="ask-ques-body"
                  onChange={(e) => {
                    setQuestionBody(e.target.value);
                  }}
                  cols="30"
                  rows="10"
                  onKeyPress={handleEnter}
                ></textarea>
              </label>
            </div>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(' '));
                }}
                id="ask-ques-tags"
                placeholder="e.g. xml typescript wordpress"
              />
            </label>
          </div>
          <input type="submit" className="review-btn" value="Review your question" />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;

