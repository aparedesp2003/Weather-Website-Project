const WeatherCard = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{data.name}</h2>
          <p className="mt-1 capitalize text-slate-400">{data.description}</p>
        </div>

        <div className="rounded-xl bg-slate-700 px-3 py-1 text-sm text-slate-200">
          {data.country}
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-5xl font-bold text-white">{data.temp}°C</p>
          <p className="mt-2 text-slate-300">Feels like {data.feelsLike}°C</p>
        </div>

        <img
          src={iconUrl}
          alt={data.description}
          className="h-20 w-20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-700/60 p-4">
          <p className="text-sm text-slate-400">Humidity</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {data.humidity}%
          </p>
        </div>

        <div className="rounded-xl bg-slate-700/60 p-4">
          <p className="text-sm text-slate-400">Wind Speed</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {data.windSpeed} km/h
          </p>
        </div>

        <div className="rounded-xl bg-slate-700/60 p-4">
          <p className="text-sm text-slate-400">Min Temp</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {data.tempMin}°C
          </p>
        </div>

        <div className="rounded-xl bg-slate-700/60 p-4">
          <p className="text-sm text-slate-400">Max Temp</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {data.tempMax}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;