import { useState } from "react";

const SearchBar = ({ onSearch, onUseLocation }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCity = inputValue.trim();

    if (!trimmedCity) return;

    onSearch(trimmedCity);
    setInputValue("");
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3"
      >
        <input
          type="text"
          placeholder="Enter a city..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
        />

        <button
          type="submit"
          className="rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-500 active:scale-[0.98]"
        >
          Search
        </button>
      </form>

      <button
        onClick={onUseLocation}
        className="mt-4 w-full rounded-xl bg-slate-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-600"
      >
        Use my current location
      </button>
    </div>
  );
};

export default SearchBar;