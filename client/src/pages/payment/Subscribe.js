import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import '../../styles/pay.css';
import { useSelector } from 'react-redux';
import { updateQuestion } from '../../actions/update';

const Subscribe = () => {

const User = useSelector((state) => state.currentUserReducer) 
const navigate = useNavigate();
const dispatch=useDispatch();
const [free] = useState(
  {
    name: "Free",
    price: 0,
    productBy: "StackOverflow",
    Questions:"1 Question Per day"
  }
);
  const [product, setProduct] = useState([{
    name: "Silver",
    price: 100,
    productBy: "StackOverflow",
    Questions:"5 Question Per day"
  },
  {
    name: "Gold",
    price: 1000,
    productBy: "StackOverflow",
    Questions:"Infinite number of questions"
  },
]);
const handleFree = () => {
  const updatedUser = {
    ...User.result,
    plan: free.name, // Update the user's plan field
  };

  // Make an API call to update the user's plan field in the database
  fetch(`http://localhost:5000/users/${User.result._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('User plan updated:', data);
      dispatch(updateQuestion(User.result.id,data))
      navigate("/AskQuestion");; // Redirect to '/AskQuestion' page
    })
    .catch((error) => console.log(error));
};

const makePayment = (token, selectedProduct) => {
  console.log(token);
  const body = {
    token,
    user_id:User.result._id,
    product: selectedProduct
  };
  const headers = {
    "Content-Type": "application/json"
  };
  return fetch(`http://localhost:5000/payment`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
})

  .then(response => response.json())
      .then(data => {
        console.log("RESPONSE", data.plan);
        const { status } = data;
        console.log("STATUS", status);
        console.log(User);
        navigate("/Logout");
      })
      .catch(error => console.log(error));
};

const handlePayment = (selectedProduct) => {
  return (token) => {
    makePayment(token, selectedProduct);
  };
};
return (
  <div className="App">
    <br />
    <br />
    <br />
    <div className="Subscripe-app">
        
          <div className="Subscribe-container">
            <p className="plan-name">Name: {free.name}</p>
            <br />
            <p className="plan-price">
              Price: <span>&#x20B9;{free.price}</span>
            </p>
            <br />
            <p className="plan-question">Product By: {free.productBy}</p>
            <br />
            <p className="plan-question">{free.Questions}</p>
            <div className="buy_btn">
              <button className="buy_btn" onClick={handleFree}>
                Buy {free.name} for just Rs {free.price}
              </button>
            </div>
          </div>
      {product.map((item, index) => (
        <div className='Subscribe-container' key={index}>
          <p className='plan-name'>Name: {item.name}</p>
          <br/>
          <p className='plan-price'>
            Price: <span>&#x20B9;{item.price}</span>
          </p>
          <br/>
          <p className='plan-question'>Product By: {item.productBy}</p>
          <br/>
          <p className='plan-question'>{item.Questions}</p>
          <div className='buy_btn'><StripeCheckout
            key={index}
            stripeKey="pk_test_51NOatmSI6GOQ6lgr7JpEfmWNFLCPwWe1LxFiKjdoEDHa2LKrNsj1hTUBBJ9C1KPBwxTNF8dWuqZKzIECTzzhDqsg00dEKn66mo"
            token={handlePayment(item)}
            name={`Buy ${item.name}`}
            amount={item.price * 100}
            shippingAddress
            billingAddress
          >
           <button className='buy_btn'>
  Buy {item.name} for just Rs {item.price}
</button>
          </StripeCheckout>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}
export default Subscribe;