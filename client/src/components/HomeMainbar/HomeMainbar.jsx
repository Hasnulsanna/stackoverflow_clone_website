
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomeMainbar.css";
import QuestionList from "./QuestionsList";

const HomeMainbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('Profile'));
  const user =  useSelector((state) => state.currentUserReducer)

  const questionsList = useSelector((state) => state.questionsReducer);
  const checkAuth = () => {
    if (user.result === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      if(user.result.plan === null && profile.result.plan === null){
      navigate("/subscribe");
      }else{
        navigate("/AskQuestion");
      }
    }
  };

  return (

    <div className="main-bar">
       <br/>
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
