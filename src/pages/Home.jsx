import { useCallback, useEffect, useState } from "react";
import HeroSection from "../components/HeroSection.jsx";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastSection from "../components/ForecastSection";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PinnedCitiesPanel from "../components/PinnedCitiesPanel";
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
    localStorage.getItem("weatherUnit") || "metric",
  );

  const [currentCity, setCurrentCity] = useState("");
  const [lastSearchType, setLastSearchType] = useState("");
  const [coords, setCoords] = useState(null);

  const [recentCities, setRecentCities] = useState(() => {
    const savedCities = localStorage.getItem("recentCities");
    return savedCities ? JSON.parse(savedCities) : [];
  });

  const [pinnedCityNames, setPinnedCityNames] = useState(() => {
    const savedPinnedCities = localStorage.getItem("pinnedCities");
    return savedPinnedCities ? JSON.parse(savedPinnedCities) : [];
  });

  const [pinnedCitiesWeather, setPinnedCitiesWeather] = useState([]);

  useEffect(() => {
    localStorage.setItem("weatherUnit", unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }, [recentCities]);

  useEffect(() => {
    localStorage.setItem("pinnedCities", JSON.stringify(pinnedCityNames));
  }, [pinnedCityNames]);

  const updateRecentCities = useCallback((city) => {
    setRecentCities((prevCities) => {
      const normalizedCity = city.trim();

      const filteredCities = prevCities.filter(
        (savedCity) => savedCity.toLowerCase() !== normalizedCity.toLowerCase(),
      );

      return [normalizedCity, ...filteredCities].slice(0, 5);
    });
  }, []);

  const handleSearch = useCallback(
    async (searchCity, selectedUnit = unit) => {
      if (!searchCity) return;

      try {
        setLoading(true);
        setError("");

        const weather = await fetchWeatherByCity(searchCity, selectedUnit);
        const forecast = await fetchForecastByCity(searchCity, selectedUnit);

        setWeatherData(weather);
        setForecastData(forecast);
        setCurrentCity(weather.name);
        setLastSearchType("city");
        updateRecentCities(weather.name);
      } catch {
        setError("City not found. Please try again.");
        setWeatherData(null);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    },
    [unit, updateRecentCities],
  );

  const fetchLocationWeather = useCallback(
    async (latitude, longitude, selectedUnit = unit) => {
      try {
        setLoading(true);
        setError("");

        const weather = await fetchWeatherByCoords(
          latitude,
          longitude,
          selectedUnit,
        );
        const forecast = await fetchForecastByCoords(
          latitude,
          longitude,
          selectedUnit,
        );

        setWeatherData(weather);
        setForecastData(forecast);
        setLastSearchType("location");
      } catch {
        setError("Unable to fetch weather for your location.");
        setWeatherData(null);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    },
    [unit],
  );

  const handleToggleUnit = async () => {
    const nextUnit = unit === "metric" ? "imperial" : "metric";

    setUnit(nextUnit);

    if (lastSearchType === "city" && currentCity) {
      await handleSearch(currentCity, nextUnit);
    }

    if (lastSearchType === "location" && coords) {
      await fetchLocationWeather(coords.latitude, coords.longitude, nextUnit);
    }
  };

  const handleUseLocation = useCallback(() => {
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
      },
    );
  }, [fetchLocationWeather]);

  useEffect(() => {
    const loadPinnedCitiesWeather = async () => {
      if (!pinnedCityNames.length) {
        setPinnedCitiesWeather([]);
        return;
      }

      try {
        const pinnedWeatherData = await Promise.all(
          pinnedCityNames.map((city) => fetchWeatherByCity(city, unit)),
        );

        setPinnedCitiesWeather(pinnedWeatherData);
      } catch (err) {
        console.error("Failed to load pinned cities weather:", err);
      }
    };

    loadPinnedCitiesWeather();
  }, [pinnedCityNames, unit]);

  const togglePinnedCity = (city) => {
    setPinnedCityNames((prevPinnedCities) => {
      const alreadyPinned = prevPinnedCities.some(
        (savedCity) => savedCity.toLowerCase() === city.toLowerCase(),
      );

      if (alreadyPinned) {
        return prevPinnedCities.filter(
          (savedCity) => savedCity.toLowerCase() !== city.toLowerCase(),
        );
      }

      return [city, ...prevPinnedCities].slice(0, 6);
    });
  };

  const removePinnedCity = (city) => {
    setPinnedCityNames((prevPinnedCities) =>
      prevPinnedCities.filter(
        (savedCity) => savedCity.toLowerCase() !== city.toLowerCase(),
      ),
    );
  };

  const isCurrentCityPinned = weatherData
    ? pinnedCityNames.some(
        (city) => city.toLowerCase() === weatherData.name.toLowerCase(),
      )
    : false;

  const getWeatherCondition = () => {
    if (!weatherData) return "default";

    const condition = weatherData.description.toLowerCase();

    if (condition.includes("clear")) return "clear";

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "rain";
    }

    if (condition.includes("snow")) return "snow";
    if (condition.includes("cloud")) return "clouds";

    if (condition.includes("thunder") || condition.includes("storm")) {
      return "thunder";
    }

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

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 drop-shadow-2xl">
        <div className="flex justify-end">
          <button
            onClick={handleToggleUnit}
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-white/30"
          >
            {unit === "metric" ? "Switch to °F" : "Switch to °C"}
          </button>
        </div>

        <HeroSection />

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

        {weatherData && (
          <WeatherCard
            data={weatherData}
            unit={unit}
            onTogglePin={togglePinnedCity}
            isPinned={isCurrentCityPinned}
          />
        )}

        {pinnedCitiesWeather.length > 0 && (
          <PinnedCitiesPanel
            cities={pinnedCitiesWeather}
            unit={unit}
            onRemoveCity={removePinnedCity}
          />
        )}

        {forecastData.length > 0 && (
          <ForecastSection data={forecastData} unit={unit} />
        )}

        <Footer />
      </div>
    </main>
  );
};

export default Home;
