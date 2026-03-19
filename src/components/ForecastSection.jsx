import ForecastCard from "./ForecastCard";

const ForecastSection = ({ forecastData }) => {
  return (
    <section className="mt-8 w-full">
      <h2 className="mb-4 text-2xl font-bold text-white">5-Day Forecast</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {forecastData.map((day, index) => (
          <ForecastCard key={`${day.date}-${index}`} day={day} />
        ))}
      </div>
    </section>
  );
};

export default ForecastSection;