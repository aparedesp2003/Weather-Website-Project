const ForecastCard = ({ day }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center shadow-lg">
      <p className="text-sm font-medium text-slate-300">{day.dayName}</p>

      <img
        src={iconUrl}
        alt={day.description}
        className="mx-auto h-16 w-16"
      />

      <p className="capitalize text-sm text-slate-400">{day.description}</p>

      <div className="mt-3">
        <p className="text-lg font-bold text-white">{day.temp}°C</p>
      </div>
    </div>
  );
};

export default ForecastCard;