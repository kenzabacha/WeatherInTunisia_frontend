import React, { useState } from 'react';
import axios from 'axios';
import "./feedback.css"

const FeedbackPopup = ({ onClose, onLogout, email }) => {
  const [feedback_text, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const handleDateChange = (e) => setDate(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback_text || !time || !date) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/feedback', {
        email,
        feedback_text,
        time,
        date,
      });

      const { message, status } = response.data;

      if (status === 'success') {
        setMessage('Thank you for your feedback.');
        setFeedback('');
        setTime('');
        setDate('');
      } else {
        setMessage(message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Submit Feedback</h2>
        <p>🔑 Sign up now to unlock access and share your insights. Your feedback plays a crucial role in enhancing our platform's accuracy and user experience.</p>
        <textarea
          placeholder="Enter your feedback..."
          value={feedback_text}
          onChange={(e) => setFeedback(e.target.value)
          
          }
          className='feedback_text'

        />
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="date-input"
        />
        <input
          type="time"
          value={time}
          onChange={handleTimeChange}
          className="time-input"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onLogout}>Log Out</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default FeedbackPopup;


