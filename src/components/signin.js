import React, { useState } from 'react';
import FeedbackPopup from './feedback';
import axios from 'axios';
import "./signin.css"
import LoginPopup from './login';

const SigninPopup = ({ onClose }) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);  
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [message, setMessage] = useState('');
   

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
        setMessage('Please fill in all fields');
        return;
    }
    if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post('http://127.0.0.1:5000/signup', { username,email, password });
        setMessage(response.data.message);

        if (response.data.status === 'success') {
            setIsSignUp(true);
            setIsLogInOpen(true); 
        }
        else {
          setMessage('Invalid email or password');}
    } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred during sign-up');
    }
  };
  return (
 
   <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <p>🌟 Join Us Today! Create your account and become part of our community. Your feedback can help shape the future of our platform. Let’s make a difference together! 🚀✨</p>
        <input
          type="text"
          placeholder="Enter your full name"
          value={username}
          onChange={(e) => setUserName(e.target.value)}required
          className="input-box"
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}required
          className="input-box"
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}required
          className="input-box"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}required
          className="input-box"
        />
        <button className="signin-button" onClick={handleSignUp} type='submit' >
          Sign up
        </button>
      
    </form>
      <div>
      {message && <p>{message}</p>}
      </div>
    </div>
    {isLogInOpen && <LoginPopup onClose={() => setIsLogInOpen(false)} />}
    </div>
  )
  };

export default SigninPopup;

