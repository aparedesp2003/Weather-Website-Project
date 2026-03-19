const Loader = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-sky-500"></div>
      <p className="mt-4 text-sm text-slate-300">Loading weather data...</p>
    </div>
  );
};

export default Loader;