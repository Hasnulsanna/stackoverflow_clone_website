import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import '../../styles/main.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const User = useSelector((state) => state.currentUserReducer) ; // Provide default value as empty object


  useEffect(() => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (question === '') {
      toast.error('Please ask something');
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: question, sender: 'user' },
      ]);

      try {
        const response = await axios.post('http://localhost:5000/chatbot', { question });
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: response.data.answer, sender: 'chatbot' },
        ]);
        setQuestion('');

        if (chatContainerRef.current) {
          const chatContainer = chatContainerRef.current;
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section>
        <br/>
        <br/>
        <div className="container" style={{ marginTop: '60px' }}>
          <div className="media" style={{ height: '100px', backgroundColor: 'whitesmoke' }}>
            <img
              src="./img/chatbot.jpg"
              style={{ float: 'left', margin: '10px' }}
              className="float-left rounded-circle"
              width="60px"
              alt=".."
            />
            <div className="media-body" style={{ float: 'left' }}>
              <h5 style={{ margin: '10px', marginTop: '15px' }}>Chatbot</h5>
              <span style={{ marginLeft: '10px', color: 'rgb(32,199,32)' }}>online</span>
            </div>
          </div>
          <div
            id="chatContainer"
            className="container border overflow-auto"
            style={{ height: '300px' }}
            ref={chatContainerRef}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'chatbot' ? 'chatbot-message' : 'user-message'}`}
                style={{
                  marginLeft: message.sender === 'chatbot' ? '20px' : 'auto',
                  marginRight: message.sender === 'user' ? '20px' : 'auto',
                }}
              >
                {message.sender === 'user' && (
                  <div className="question" style={{ textAlign: 'right' }}>
                    <p>
                      <div style={{paddingLeft:'96%' , marginTop:'15px'}}>
                      <Avatar className="avatarmin" backgroundColor="green" borderRadius={"100%"}>
                      
                        {User.result.email.charAt(0).toUpperCase()}
                      </Avatar>
                      </div>
                      <div>{message.content}</div>
                    </p>
                  </div>
                )}
{message.sender === 'chatbot' && (
  <div className="answer">
    <img
      src="./img/chatbot.jpg"
      style={{ borderRadius: '100%', margin: '10px' }}
      className="float-left rounded-circle"
      width="35px"
      alt=".."
    />
    {typeof message.content === 'string' ? (
      message.content.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))
    ) : (
      message.content
    )}
  </div>
)}


              </div>
            ))}
          </div>

          <div className="input-group">
            <input
              id="question"
              type="text"
              name="question"
              className="form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask here!"
            />
            <div className="input-group-append">
              <button id="sendBtn" type="button" onClick={handleSubmit} className="btn btn-primary">
              <img src="./img/sent.png" width="20px" alt=".."/>
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Chatbot;
