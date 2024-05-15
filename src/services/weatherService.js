import { WEATHER_API_URL, FORECAST_API_URL } from '../constants/constants';

// Function to handle API requests
const fetchFromAPI = async (url) => {
  try {
    const apiKey = process.env.REACT_APP_API_KEY;

    if (!apiKey) {
      throw new Error('API key is missing. Please provide a valid API key.');
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data from API');
  }
};

// Fetch current weather information by city
export const fetchWeatherInfo = async (city) => {
  const url = `${WEATHER_API_URL}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  return await fetchFromAPI(url);
};

// Fetch weather forecast information by city
export const fetchForecast = async (city) => {
  const url = `${FORECAST_API_URL}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  const data = await fetchFromAPI(url);

  const filteredForecast = data.list.filter(item =>
    new Date(item.dt * 1000).getDate() !== new Date().getDate() &&
    new Date(item.dt * 1000).getDate() <= new Date().getDate() + 2
  );

  const groupedForecast = {};
  filteredForecast.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
    if (!groupedForecast[date]) {
      groupedForecast[date] = [];
    }
    groupedForecast[date].push(item);
  });

  return groupedForecast;
};

// Fetch current weather information by coordinates
export const fetchWeatherByCoordinates = async (latitude, longitude) => {
  const url = `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
  return await fetchFromAPI(url);
};