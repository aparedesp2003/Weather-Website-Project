const PinnedCitiesPanel = ({ cities, unit, onRemoveCity }) => {
  const tempSymbol = unit === "metric" ? "°C" : "°F";

  if (!cities.length) return null;

  return (
    <section className="rounded-3xl bg-white/20 p-6 text-white shadow-2xl backdrop-blur-lg">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Pinned Cities</h3>
        <p className="text-sm text-blue-100">Quick weather overview</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cities.map((city) => (
          <div
            key={city.name}
            className="rounded-2xl border border-white/10 bg-white/15 p-4 backdrop-blur-md"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold">
                  {city.name}, {city.country}
                </h4>
                <p className="text-sm text-blue-100">{city.localTime}</p>
              </div>

              <button
                onClick={() => onRemoveCity(city.name)}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white transition hover:bg-white/20"
              >
                Unpin
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-xs text-blue-100">Current</p>
                <p className="mt-1 text-xl font-bold">
                  {city.temp}
                  {tempSymbol}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-xs text-blue-100">Feels like</p>
                <p className="mt-1 text-xl font-bold">
                  {city.feelsLike}
                  {tempSymbol}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-xs text-blue-100">Low</p>
                <p className="mt-1 text-xl font-bold">
                  {city.tempMin}
                  {tempSymbol}
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-3">
                <p className="text-xs text-blue-100">High</p>
                <p className="mt-1 text-xl font-bold">
                  {city.tempMax}
                  {tempSymbol}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PinnedCitiesPanel;