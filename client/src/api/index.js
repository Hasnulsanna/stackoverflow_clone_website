import axios from 'axios';

<<<<<<< HEAD
const API = axios.create({baseURL:"http://localhost:5000"})
=======
//axios is used to send request to the database
const API = axios.create({baseURL:"https://stackoverflow-clone-sanna.onrender.com"})
>>>>>>> 111e5f7bbd7b0511071d8e6a29d3ca28ce120fa2

API.interceptors.request.use((config) => {
    const profile = JSON.parse(localStorage.getItem('Profile'));
  
    if (profile && profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
  
    return config;
  });


export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion=(questionData) =>API.post('/questions/Ask',questionData)
export const getAllQuestions=()=>API.get('/questions/get');
export const deleteQuestion = (id) =>API.delete(`/questions/delete/${id}`)
export const voteQuestion=(id,value,userId)=>API.patch(`/questions/vote/${id}`,{value,userId})



export const postAnswer=(id,noOfAnswers,answerBody,userAnswered,userId)=> API.patch(`/answer/post/${id}`,{noOfAnswers,answerBody,userAnswered,userId})
export const deleteAnswer=(id,answerId,noOfAnswers)=>API.patch(`/answer/delete/${id}`,{answerId,noOfAnswers})

export const fetchAllUsers=()=>API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);
<<<<<<< HEAD
export const updateQuestion = (id, questionCount) => API.patch(`/user/questionupdate`, {id,questionCount});
=======
>>>>>>> 111e5f7bbd7b0511071d8e6a29d3ca28ce120fa2
