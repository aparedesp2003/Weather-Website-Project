const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const formatWeatherData = (data, unit = "metric") => {
  return {
    name: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed:
      unit === "metric"
        ? Math.round(data.wind.speed * 3.6)
        : Math.round(data.wind.speed),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    icon: data.weather[0].icon,
  };
};

export const fetchWeatherByCity = async (city, unit = "metric") => {
  if (!API_KEY) {
    throw new Error("Missing API key. Check your .env file.");
  }

  const url = `${CURRENT_WEATHER_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=${unit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("City not found. Please try again.");
  }

  const data = await response.json();
  return formatWeatherData(data, unit);
};

export const fetchForecastByCity = async (city, unit = "metric") => {
  if (!API_KEY) {
    throw new Error("Missing API key. Check your .env file.");
  }

  const url = `${FORECAST_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=${unit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Forecast data not found.");
  }

  const data = await response.json();

  const dailyForecast = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map((item) => ({
      date: item.dt_txt,
      dayName: new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

  return dailyForecast;
};

export const fetchWeatherByCoords = async (lat, lon, unit = "metric") => {
  if (!API_KEY) {
    throw new Error("Missing API key. Check your .env file.");
  }

  const url = `${CURRENT_WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch weather for your location.");
  }

  const data = await response.json();
  return formatWeatherData(data, unit);
};

export const fetchForecastByCoords = async (lat, lon, unit = "metric") => {
  if (!API_KEY) {
    throw new Error("Missing API key. Check your .env file.");
  }

  const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch forecast for your location.");
  }

  const data = await response.json();

  const dailyForecast = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5)
    .map((item) => ({
      date: item.dt_txt,
      dayName: new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

  return dailyForecast;
};