import React, { useState } from 'react';
import moment from 'moment';
import './Home.css'; 
import LoginPopup from './login.js';
import DoYouKnowPopup from './do_you_know.js';



const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [weatherData, setWeatherData] = useState(null);  // State to store weather data
  const [city, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);  // State to store error messages
  const[timeDate,setTimeDate]=useState('');  
  const time=["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00","00:00"] ;
  const [isDoYouKnowPopupOpen, setIsDoYouKnowPopupOpen] = useState(false);

  const toggleDoYouKnowPopup = () => {
    setIsDoYouKnowPopupOpen(!isDoYouKnowPopupOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };


  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
   



  const handleSearch = async () => {
    if (!city || !date || !timeDate ) {
      setError('Please enter Location , date and time .');
      return
    }

  
    
    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}&date=${date}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log(data)
        setWeatherData(data.forecast);
        setError(null);
      } else {
        setError(data.message || 'Error fetching weather data');
        setWeatherData(null);
      }
    } catch (err) {
      setError('Failed to fetch data');
      setWeatherData(null);
    }
    
  };
  console.log(weatherData)
  
  const filteredData = weatherData?.filter((entry) =>
    entry.datetime.startsWith(date)&& entry.datetime.substring(11, 16) === timeDate
 );
  
  console.log(filteredData)

  const handleChangeValue = (event) => {
    setTimeDate(event.target.value);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="platform-name">Weather Time !</div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={toggleDoYouKnowPopup}>Do You Know ? </button>
         <button className="nav-button" onClick={togglePopup} >Feedback</button>    
        </div>
      </header>

      <main className="main-content">
        <div className='welcome'><h3>Weather Time: Your guide to the skies—let’s explore!</h3></div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter location"
            value={city}
            onChange={handleLocationChange}
            className="location-input"
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="date-input"
            min={moment(new Date() ).format('YYYY MM, DD')}
            max={moment((new Date().setDate(new Date().getDate() + 5))).format('YYYY MM, DD')}
          />
           
           <select value={timeDate} onChange={handleChangeValue} className='date-input'>
            {time.map((timeOption, index) => (
              <option key={index} value={timeOption}>
                {timeOption}
              </option>))}
           </select>
          
          <button className='button button1' onClick={handleSearch}>Search</button>
        </div>

        <h4>Weather Forecast for {city} on {date} on {timeDate}</h4>
        {filteredData?.length > 0 ? (
        <div className="weather-info  row " >
          {filteredData.map((entry, index) => (
            <div key={index} className="forecast-entry  col-3" >
              <p><strong>Time:</strong> {entry.datetime.split(' ')[1]}</p>
              <p><strong>Temperature:</strong> {entry.temperature}°C</p>
              <p><strong>Description:</strong> {entry.description}</p>
              <p><strong>Humidity:</strong> {entry.humidity}%</p>
              <p><strong>Wind Speed:</strong> {entry.wind_speed} m/s</p>
            </div>
          ))}
        </div>
      ) : (
        <p>The date must be today or within the next 5 days, and the time must be later than now.</p>
      )}
        {error && <p className="error">{error}</p>}
      </main>

      <footer className="footer">
        <p>2025 All rights reserved.</p>
      </footer>
      
      {isPopupOpen && <LoginPopup onClose={togglePopup} />}
      {isDoYouKnowPopupOpen && <DoYouKnowPopup onClose={toggleDoYouKnowPopup} />}
    </div>
  );
};

export default Home;


