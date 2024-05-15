import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeEachWord } from '../utils/utils';

const ForecastItem = ({ forecast }) => {
  return (
    <div className="card-body p-4">
      <div className="d-flex flex-row justify-content-between">
        <span className="mb-2 current-temp d-flex flex-column justify-content-center">{forecast[0]?.main?.temp}°C</span>
        <img src={`https://openweathermap.org/img/wn/${forecast[0]?.weather[0]?.icon}.png`} alt="weather-logo" width="75" />
      </div>
      <div>
        <span className="mb-0 me-2">{capitalizeEachWord(forecast[0]?.weather[0]?.description)}</span>
      </div>
      <div>
        <span>H: {forecast[0]?.main?.temp_max}°C </span> &nbsp;&nbsp;&nbsp;
        <span>L: {forecast[0]?.main?.temp_min}°C</span>
      </div>
      <div>
        <span>Feels like: {forecast[0]?.main?.feels_like}°C</span>
      </div>
    </div>
  );
};

ForecastItem.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      main: PropTypes.shape({
        temp: PropTypes.number,
        temp_max: PropTypes.number,
        temp_min: PropTypes.number,
        feels_like: PropTypes.number,
      }),
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    })
  ).isRequired,
};

export default ForecastItem;