const HeroSection = () => {
  return (
    <div className="text-center mb-10 mt-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          SkyPulse
        </span>{" "}
        Weather
      </h1>
      <p className="text-gray-300 text-lg max-w-xl mx-auto">
        Real-time weather forecasts, smart search, and accurate data for any city in the world.
      </p>
    </div>
  );
};

export default HeroSection;