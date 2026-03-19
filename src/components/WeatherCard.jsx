const WeatherCard = ({ data, unit, onTogglePin, isPinned }) => {
  const tempSymbol = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "km/h" : "mph";

  return (
    <section className="rounded-3xl bg-white/10 p-6 text-white shadow-2xl backdrop-blur-lg">
      
      {/* ⭐ Pin Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => onTogglePin(data.name)}
          className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
        >
          {isPinned ? "⭐ Unpin" : "☆ Pin"}
        </button>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold">
            {data.name}, {data.country}
          </h2>
          <p className="mt-2 text-lg capitalize text-blue-100">
            {data.description}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
            className="h-24 w-24"
          />
          <p className="text-5xl font-extrabold">
            {data.temp}
            {tempSymbol}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-blue-100">Feels like</p>
          <p className="mt-1 text-xl font-semibold">
            {data.feelsLike}
            {tempSymbol}
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-blue-100">Humidity</p>
          <p className="mt-1 text-xl font-semibold">{data.humidity}%</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-blue-100">Wind</p>
          <p className="mt-1 text-xl font-semibold">
            {data.windSpeed} {windUnit}
          </p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-blue-100">Min / Max</p>
          <p className="mt-1 text-xl font-semibold">
            {data.tempMin}
            {tempSymbol} / {data.tempMax}
            {tempSymbol}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;