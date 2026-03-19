import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCity = inputValue.trim();

    if (!trimmedCity) return;

    onSearch(trimmedCity);
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex items-center gap-3"
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
  );
};

export default SearchBar;