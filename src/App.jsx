import React, { useState } from 'react';
import { fetchGlobalEdits } from './services/wikimediaApi';
import EditList from './components/EditList';

function App() {
  const [username, setUsername] = useState('Jimbo_Wales');
  const [edits, setEdits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedUser, setSearchedUser] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setError('Please enter a username.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEdits([]);
    setSearchedUser(username);

    try {
      const fetchedEdits = await fetchGlobalEdits(username);
      setEdits(fetchedEdits);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
        
        <header className="text-center border-b border-slate-200 pb-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            Wikimedia Global Edits Finder 🌐
          </h1>
          <p className="text-slate-500">
            Enter a username to see their last 50 global contributions.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Wikimedia username"
            className="flex-grow w-full px-4 py-3 text-lg border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
          />
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
        />

      </div>
    </div>
  );
}

export default App;