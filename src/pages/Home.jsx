import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastSection from "../components/ForecastSection";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "../services/weatherApi";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchCity) => {
    if (!searchCity) return;

    setLoading(true);
    setError("");
    setWeatherData(null);
    setForecastData([]);

    try {
      const [currentWeather, forecast] = await Promise.all([
        fetchWeatherByCity(searchCity),
        fetchForecastByCity(searchCity),
      ]);

      setWeatherData(currentWeather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    setForecastData([]);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const [currentWeather, forecast] = await Promise.all([
            fetchWeatherByCoords(latitude, longitude),
            fetchForecastByCoords(latitude, longitude),
          ]);

          setWeatherData(currentWeather);
          setForecastData(forecast);
        } catch (err) {
          setError("Failed to fetch weather for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permission denied. Unable to access location.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-white">Weather App</h1>
          <p className="mt-2 text-slate-400">
            Search for any city and check the current weather.
          </p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
        />

        <div className="mt-6 w-full max-w-md">
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {weatherData && <WeatherCard data={weatherData} />}
        </div>

        {forecastData.length > 0 && (
          <div className="mt-8 w-full max-w-5xl">
            <ForecastSection forecastData={forecastData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;