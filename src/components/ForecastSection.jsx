const ForecastSection = ({ data, unit }) => {
  const tempSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <section className="rounded-3xl bg-white/15 p-6 text-white shadow-2xl backdrop-blur-lg">
      <h3 className="mb-6 text-2xl font-bold">5-Day Forecast</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white/5 p-4 text-center transition hover:bg-white/20"
          >
            <p className="text-lg font-semibold">{item.dayName}</p>

            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              className="mx-auto h-20 w-20"
            />

            <p className="text-2xl font-bold">
              {item.temp}
              {tempSymbol}
            </p>

            <p className="mt-2 text-sm capitalize text-blue-100">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForecastSection;