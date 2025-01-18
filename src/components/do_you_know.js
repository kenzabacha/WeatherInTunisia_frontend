import React, { useState } from 'react';
import axios from 'axios';
import "./do_you_know.css";

const DoYouKnowPopup = ({ onClose }) => {
  const [facts, setFacts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('general_facts'); // Default category
  const [filteredFacts, setFilteredFacts] = useState([]);

  // Fetch facts function
  const fetchFacts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/facts');
      setFacts(response.data);
      filterFacts('general_facts'); // Set default category
    } catch (error) {
      console.error('Error fetching facts:', error);
    }
  };

  // Filter facts by category
  const filterFacts = (category) => {
    const filtered = facts.filter(fact => fact.category === category);
    setFilteredFacts(filtered);
    setCurrentCategory(category); // Update current category
  };
  // Run fetchFacts on the initial render
  if (facts.length === 0) {
    fetchFacts();
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Do You Know? </h2>
        <p>🌟 Welcome to the 'Do You Know?' section! 🌍 Explore intriguing Tunisian facts that might surprise you! ✨</p>

        {/* Buttons to change category */}
        <div className="buttons">
          <button className="general-button" onClick={() => filterFacts('general_facts')}>General Facts</button>
          <button className="fun-button" onClick={() => filterFacts('fun_facts')}>Fun Facts</button>
          <button className="historical-button" onClick={() => filterFacts('historical_facts')}>Historical Facts</button>
        </div>

        {/* Display facts for the current category */}
        <div className="fact-box">
          {filteredFacts.length > 0 ? (
            filteredFacts.map((fact, index) => (
              <div key={index} className="fact">
                <h4>{fact.title}</h4>
                <p>{fact.description}</p>
              </div>
            ))
          ) : (
            <p>🌟 First, you have to choose a fact to explore! 🧐✨ Pick a category and dive into the fascinating world of Tunisian insights! 🌍 </p>
          )}
        </div>

        {/* Close Button */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DoYouKnowPopup;
