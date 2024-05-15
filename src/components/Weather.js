import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-ui-kit/css/mdb.min.css';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import Forecast from './Forecast';
import Spinner from './Spinner';
import { fetchWeatherInfo, fetchForecast, fetchWeatherByCoordinates } from '../services/weatherService';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (city) => {
    setLoading(true);
    try {
      const weatherData = await fetchWeatherInfo(city);
      setWeatherInfo(weatherData);
      const forecastData = await fetchForecast(city);
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
      setWeatherInfo(null);
      setForecast([]);
    }
    setLoading(false);
  }, []);

  const handleLocationSearch = useCallback(async () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
          setWeatherInfo(weatherData);
          const forecastData = await fetchForecast(weatherData.name);
          setForecast(forecastData);
          setError(null);
        } catch (err) {
          setError('Error fetching weather data. Please try again.');
          setWeatherInfo(null);
          setForecast([]);
        }
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location');
        console.error('Error fetching location:', error);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (city) {
      handleSearch(city);
    }
  }, [city, handleSearch]);

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-0">
          <div className="col-md-8 col-lg-6 col-xl-4">
          <span className="heading">Weather Forecast</span>
            <WeatherForm onSearch={setCity} onLocationSearch={handleLocationSearch} />
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
              <Spinner />
            ) : (
              <>
                {weatherInfo && <WeatherDisplay weatherInfo={weatherInfo} />}
                {Object.keys(forecast).length > 0 && <Forecast forecast={forecast} />}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Weather.propTypes = {
  onSearch: PropTypes.func,
  onLocationSearch: PropTypes.func,
};

export default Weather;
