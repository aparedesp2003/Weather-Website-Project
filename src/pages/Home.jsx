import { useEffect, useState } from "react";
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
  const [unit, setUnit] = useState(
    localStorage.getItem("weatherUnit") || "metric"
  );
  const [currentCity, setCurrentCity] = useState("");
  const [lastSearchType, setLastSearchType] = useState("");
  const [coords, setCoords] = useState(null);

  const [recentCities, setRecentCities] = useState(() => {
    const savedCities = localStorage.getItem("recentCities");
    return savedCities ? JSON.parse(savedCities) : [];
  });

  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }, [recentCities]);

  useEffect(() => {
    if (lastSearchType === "city" && currentCity) {
      handleSearch(currentCity);
    }

    if (lastSearchType === "location" && coords) {
      fetchLocationWeather(coords.latitude, coords.longitude);
    }
  }, [unit]);

  const handleToggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const updateRecentCities = (city) => {
    setRecentCities((prevCities) => {
      const normalizedCity = city.trim();

      const filteredCities = prevCities.filter(
        (savedCity) => savedCity.toLowerCase() !== normalizedCity.toLowerCase()
      );

      return [normalizedCity, ...filteredCities].slice(0, 5);
    });
  };

  const handleSearch = async (searchCity) => {
    if (!searchCity) return;

    try {
      setLoading(true);
      setError("");

      const weather = await fetchWeatherByCity(searchCity, unit);
      const forecast = await fetchForecastByCity(searchCity, unit);

      setWeatherData(weather);
      setForecastData(forecast);
      setCurrentCity(searchCity);
      setLastSearchType("city");
      updateRecentCities(weather.name);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
      setForecastData([]);
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

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        await fetchLocationWeather(latitude, longitude);
      },
      () => {
        setError("Permission denied for location.");
        setLoading(false);
      }
    );
  };

  const fetchLocationWeather = async (latitude, longitude) => {
    try {
      setLoading(true);
      setError("");

      const weather = await fetchWeatherByCoords(latitude, longitude, unit);
      const forecast = await fetchForecastByCoords(latitude, longitude, unit);

      setWeatherData(weather);
      setForecastData(forecast);
      setLastSearchType("location");
    } catch (err) {
      setError("Unable to fetch weather for your location.");
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherCondition = () => {
    if (!weatherData) return "default";

    const condition = weatherData.description.toLowerCase();

    if (condition.includes("clear")) return "clear";
    if (condition.includes("rain") || condition.includes("drizzle"))
      return "rain";
    if (condition.includes("snow")) return "snow";
    if (condition.includes("cloud")) return "clouds";
    if (condition.includes("thunder") || condition.includes("storm"))
      return "thunder";

    return "default";
  };

  const getBackgroundClass = () => {
    const condition = getWeatherCondition();

    switch (condition) {
      case "clear":
        return "bg-gradient-to-br from-sky-400 via-blue-500 to-blue-700";
      case "clouds":
        return "bg-gradient-to-br from-slate-500 via-slate-600 to-slate-800";
      case "rain":
        return "bg-gradient-to-br from-gray-700 via-slate-800 to-gray-900";
      case "snow":
        return "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400";
      case "thunder":
        return "bg-gradient-to-br from-slate-800 via-black to-slate-900";
      default:
        return "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]";
    }
  };

  const renderWeatherEffect = () => {
    const condition = getWeatherCondition();

    if (condition === "clear") {
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-16 top-16 h-40 w-40 rounded-full bg-yellow-300/30 blur-3xl" />
          <div className="absolute right-24 top-20 h-24 w-24 rounded-full bg-yellow-200/50 blur-2xl" />
        </div>
      );
    }

    if (condition === "rain" || condition === "thunder") {
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, index) => (
            <span
              key={index}
              className="rain-drop absolute top-[-20%] h-16 w-0.5 rounded-full bg-white/40"
              style={{
                left: `${(index * 2.5) % 100}%`,
                animationDelay: `${index * 0.15}s`,
                animationDuration: `${0.8 + (index % 5) * 0.15}s`,
              }}
            />
          ))}

          {condition === "thunder" && (
            <div className="lightning-flash absolute inset-0 bg-white opacity-0" />
          )}
        </div>
      );
    }

    if (condition === "snow") {
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="snow-flake absolute top-[-10%] text-white/80"
              style={{
                left: `${(index * 4) % 100}%`,
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${4 + (index % 4)}s`,
                fontSize: `${12 + (index % 3) * 6}px`,
              }}
            >
              ❄
            </span>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${getBackgroundClass()} px-4 py-8 transition-all duration-700`}
    >
      {renderWeatherEffect()}

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 drop-shadow-2xl">
        <div className="flex justify-end">
          <button
            onClick={handleToggleUnit}
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-white/30"
          >
            {unit === "metric" ? "Switch to °F" : "Switch to °C"}
          </button>
        </div>

        <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} />

        {recentCities.length > 0 && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-blue-100">
                Recent searches
              </p>

              <button
                onClick={() => setRecentCities([])}
                className="text-xs text-blue-200 transition hover:text-white hover:underline"
              >
                Clear
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {recentCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSearch(city)}
                  className="rounded-full border border-white/10 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/30 active:scale-95"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {weatherData && <WeatherCard data={weatherData} unit={unit} />}

        {forecastData.length > 0 && (
          <ForecastSection data={forecastData} unit={unit} />
        )}
      </div>
    </main>
  );
};

export default Home;