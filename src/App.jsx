import React, { useState } from 'react';
import { fetchGlobalEdits } from './services/wikimediaApi';
import EditList from './components/EditList';


function App() {
  const [username, setUsername] = useState('Jimbo_Wales');
  const [edits, setEdits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedUser, setSearchedUser] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchEdits = async (user, newOffset = 0, start = '', end = '') => {
    setIsLoading(true);
    setError(null);
    setEdits([]);
    setSearchedUser(user);
    try {
      const fetchedEdits = await fetchGlobalEdits(user, start, end);
      setEdits(fetchedEdits.slice(newOffset, newOffset + 10));
      setHasMore(newOffset + 10 < fetchedEdits.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setError('Please enter a username.');
      return;
    }
    setOffset(0);
    fetchEdits(username, 0, startDate, endDate);
  };

  const handleNext = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    fetchEdits(searchedUser, newOffset, startDate, endDate);
  };

  const handlePrev = () => {
    const newOffset = Math.max(0, offset - 10);
    setOffset(newOffset);
    fetchEdits(searchedUser, newOffset, startDate, endDate);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        <header className="text-center border-b border-slate-200 pb-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            Wikimedia Global Edits Finder 🌐
          </h1>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8 flex-wrap">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Wikimedia username"
            className="flex-grow w-full px-4 py-3 text-lg border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
          <div className="flex flex-col w-full">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-3 text-lg border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              placeholder="Start Date"
            />
            <span className="text-xs text-slate-500 mt-1 ml-1">Start date (e.g. 28-01-2020)</span>
          </div>
          <div className="flex flex-col w-full">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-3 text-lg border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
              placeholder="End Date"
            />
            <span className="text-xs text-slate-500 mt-1 ml-1">End date (e.g. 30-01-2025)</span>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
        <EditList
          isLoading={isLoading}
          error={error}
          edits={edits}
          searchedUser={searchedUser}
          offset={offset}
          hasMore={hasMore}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
}

export default App;