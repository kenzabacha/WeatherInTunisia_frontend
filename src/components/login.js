import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import SigninPopup from './signin.js';  
import FeedbackPopup from './feedback.js';

const LoginPopup = ({ onClose }) => {
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleCreateAccount = () => {
    setIsSigninOpen(true);  
  };

  const closeSigninPopup = () => {
    setIsSigninOpen(false); 
  };
  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setIsLoggedIn(false);
    setIsFeedbackOpen(false);
    setMessage('You have been logged out.');

  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Please fill in all fields');
      return;
  }
    try {
      {/*Sends a POST request using Axios with the email and password as the request body.*/}
        const response = await axios.post('http://127.0.0.1:5000/login', {email,password});
        setMessage(response.data.message);
        if (response.data.status === 'success') {
            setIsFeedbackOpen(true);
            setIsLoggedIn(true);
            
        }
        else {
          setMessage('Invalid email or password');}
    } catch (error) {
         setMessage('Invalid credentials');
    }
};
  return (
    <>
        {/*Popup overlay when user is not signing in, not logged in, and feedback is not open*/}

      {!isSigninOpen && !isLoggedIn && !isFeedbackOpen && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-button" onClick={onClose}>&times;</button>
            <h2>Log In</h2>
            <p> Welcome Back! Log in to share your valuable feedback and help us enhance the platform’s accuracy and performance. Together, we can make it even better! 🚀✨</p>
            <form onSubmit={handleLogin} >
            <input
              type="email"
              placeholder="Enter email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="input-box"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" type="submit">
              Log In
            </button>
            <button
              className="create-account-button"
              onClick={handleCreateAccount}
            >
              Create an Account
            </button>
            </form>
            <div>
                {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Render SigninPopup when isSigninOpen is true */}
      {isSigninOpen && <SigninPopup onClose={closeSigninPopup} />}

      {/* Show Feedback Popup after user logs in */}
      {isFeedbackOpen && <FeedbackPopup onClose={() => setIsFeedbackOpen(false)}   onLogout={handleLogout} email={email}/>}
    </>
  );
};

export default LoginPopup;

