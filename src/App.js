import React, { useState } from 'react';
import './App.css';

function App() {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');

  const getWeather = event => {
    if (event.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setCity('');
        });
    }
  };

  const toTitleCase = str => {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  };

  return (
    <div className='container'>
      <input
        className='input'
        placeholder='Search for city'
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />
      <div className='results'>
        {/* Initial app display when no city is searched */}
        {typeof weatherData.main === 'undefined' ? (
          <div className='welcome-message'>
            <p className='welcome'>Welcome to my weather app ☀️</p>
            <p className='instructions'>Type in a city and click enter to see its weather!</p>
          </div>
        ) : (
          // Weather data results
          <div className='weather-data'>
            <p className='city'>{weatherData.name}</p>
            <div className='weather-temp-details'>
              <p className='description'>{toTitleCase(weatherData.weather[0].description)}</p>
              <p className='temp'>{Math.round(weatherData.main.temp)} °F</p>
            </div>
            <div className='weather-other-details'>
              <div className='section'>
                <p>{Math.round(weatherData.main.feels_like)} °F</p>
                <p>Feels Like</p>
              </div>
              <div className='section'>
                <p>{Math.round(weatherData.main.temp_min)} °F</p>
                <p>Low</p>
              </div>
              <div className='section'>
                <p>{Math.round(weatherData.main.temp_max)} °F</p>
                <p>High</p>
              </div>
              <div className='section'>
                <p>{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className='section'>
                <p>{Math.round(weatherData.wind.speed)} mph</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        )}

        {weatherData.cod === '404' ? <p className='not-found'>City not found.</p> : <></>}
      </div>
    </div>
  );
}

export default App;
