import React from 'react';
import { capitalizeEachWord } from '../utils/utils';

const WeatherDisplay = ({ weatherInfo }) => {
  return (
    <div className="card shadow-0 border">
      {weatherInfo.cod === 200 ? (
        <div className="card-body p-4">
          <div className="d-flex flex-row justify-content-between">
            <span className="mb-1 sfw-normal city-name d-flex flex-column justify-content-center">{weatherInfo.name}</span>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`} alt="weather-logo" width="75" />
          </div>
          <div>
            <span className="mb-2 current-temp">{weatherInfo.main.temp}°C</span>
          </div>
          <div>
            <span className="mb-0 me-2">{capitalizeEachWord(weatherInfo.weather[0].description)}</span>
          </div>
          <div>
            <span>H: {weatherInfo.main.temp_max}°C </span> &nbsp;&nbsp;&nbsp;
            <span>L: {weatherInfo.main.temp_min}°C</span>
          </div>
          <div>
            <span>Feels like: {weatherInfo.main.feels_like}°C</span>
          </div>
        </div>
      ) : (
        <div className="card-body p-4">
          <p className="mb-1 sfw-normal text-center">{weatherInfo.message}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;