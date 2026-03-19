import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { fetchWeatherByCity } from "../services/weatherApi";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchCity) => {
    if (!searchCity) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const data = await fetchWeatherByCity(searchCity);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-white">Weather App</h1>
        <p className="mt-2 text-slate-400">
          Search for any city and check the current weather.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="mt-6 w-full max-w-md">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
};

export default Home;