import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchGlobalEdits } from './services/wikimediaApi';
import { fetchTopEditedPages } from './services/topEditsApi';
import EditList from './components/EditList';
import TopEditedPagesForm from './components/TopEditedPagesForm';
import TopEditedPagesList from './components/TopEditedPagesList';
import ErrorBoundary from './components/ErrorBoundary';



function App() {
  const [view, setView] = useState('recent'); // 'recent' or 'toppages'
  // Recent Edits state
  const [username, setUsername] = useState([]);
  const [edits, setEdits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedUser, setSearchedUser] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Top Edited Pages state
  const [topPages, setTopPages] = useState([]);
  const [topPagesLoading, setTopPagesLoading] = useState(false);
  const [topPagesError, setTopPagesError] = useState(null);

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

  // Handler for Top Edited Pages form submit
  const handleTopPagesSubmit = async ({ project, username, start, end }) => {
    setTopPages([]);
    setTopPagesLoading(true);
    setTopPagesError(null);
    try {
      const data = await fetchTopEditedPages(project, username, start, end);
      setTopPages(data);
    } catch (err) {
      setTopPagesError(err.message);
    } finally {
      setTopPagesLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f8fafc] via-[#e6f4f1] to-[#f0f8fa] min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <ErrorBoundary>
        <motion.div
          className="max-w-4xl mx-auto bg-transparent rounded-3xl p-6 sm:p-10 border-0 "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="text-center border-b border-[#2F9A67]/30 pb-4 mb-8">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 8 }}
              className="flex justify-center mb-2"
            >
              <svg width="80" height="64" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="28" stroke="#00669A" strokeWidth="4" fill="#fff" />
                <circle cx="30" cy="30" r="12" fill="#2F9A67" />
                <path d="M30 10 A20 20 0 1 1 29.99 10.01" stroke="#9B0000" strokeWidth="4" fill="none" />
              </svg>
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2" style={{ color: '#00669A' }}>
              Wikimedia Global Edits Finder
            </h1>
            <span className="block text-base font-medium text-[#2F9A67] mb-2">Explore your global Wikimedia activity</span>
          </header>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <motion.button
              className={`px-6 py-2 rounded-lg font-semibold text-lg shadow transition-all duration-200 border-2 ${view === 'recent' ? ' text-[#2F9A67] border-[#2F9A67] ' : 'bg-white text-[#00669A] border-[#00669A] hover:bg-[#f0f8fa]'}`}
              onClick={() => setView('recent')}
              whileHover={view === 'recent' ? { scale: 1.04 } : { scale: 1.03, backgroundColor: '#f0f8fa' }}
              whileTap={{ scale: 0.98 }}
            >
              Recent Edits
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-lg font-semibold text-lg shadow transition-all duration-200 border-2 ${view === 'toppages' ? 'bg-[#00669A] text-[#2F9A67] border-[#2F9A67]' : 'bg-white  text-[#00669A] border-[#00669A] hover:bg-[#f0f8fa]'}`}
              onClick={() => setView('toppages')}
              whileHover={view === 'toppages' ? { scale: 1.04 } : { scale: 1.03, backgroundColor: '#f0f8fa' }}
              whileTap={{ scale: 0.98 }}
            >
              Top Edited Pages
            </motion.button>
          </div>

          {view === 'recent' && (
            <>

              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap bg-white rounded-2xl p-8 border border-[#2F9A67] shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                              <div className="w-full">
                <motion.div
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 8 }}
                  className="flex justify-center mb-4"
                >
                  <svg width="64" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="28" stroke="#00669A" strokeWidth="4" fill="#fff" />
                    <circle cx="30" cy="30" r="12" fill="#2F9A67" />
                    <path d="M30 10 A20 20 0 1 1 29.99 10.01" stroke="#9B0000" strokeWidth="4" fill="none" />
                  </svg>
                </motion.div>
                <h2 className="text-2xl font-bold mb-2 text-center tracking-tight" style={{ color: '#00669A' }}>Recent Edits</h2>
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Wikimedia username"
                  className="flex-grow w-full px-4 py-3 text-lg border-2 border-[#2F9A67] rounded-lg focus:ring-2 focus:ring-[#00669A] focus:outline-none transition-all bg-[#f8fafc] hover:border-[#9B0000]"
                  required
                />
                <span className="text-xs text-slate-500 mt-1 ml-1">E.g. Jimbo Wales</span>
                </div>
                <div className="grid first-letter:gap-4 sm:gap-6 sm:grid-cols-2 w-full">
                <div className="flex flex-col w-full">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-3 text-lg border-2 border-[#2F9A67] rounded-lg focus:ring-2 focus:ring-[#00669A] focus:outline-none transition-all bg-[#f8fafc] hover:border-[#9B0000]"
                    placeholder="Start Date"
                    required
                  />
                  <span className="text-xs text-slate-500 mt-1 ml-1">Start date (e.g. 28-01-2020)</span>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-3 text-lg border-2 border-[#2F9A67] rounded-lg focus:ring-2 focus:ring-[#00669A] focus:outline-none transition-all bg-[#f8fafc] hover:border-[#9B0000]"
                    placeholder="End Date"
                    required
                  />
                  <span className="text-xs text-slate-500 mt-1 ml-1">End date (e.g. 30-01-2025)</span>
                </div>
                </div>
                <motion.button
                  type="submit"
                  className="bg-[#00669A] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-[#2F9A67] hover:text-white transition-all duration-200 text-lg tracking-wide disabled:bg-blue-300 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { scale: 1.05 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </motion.button>
              </motion.form>
              <ErrorBoundary>
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
              </ErrorBoundary>
            </>
          )}

          {view === 'toppages' && (
            <>
              <TopEditedPagesForm onSubmit={handleTopPagesSubmit} />
              <ErrorBoundary>
                <TopEditedPagesList pages={topPages} isLoading={topPagesLoading} error={topPagesError} />
              </ErrorBoundary>
            </>
          )}
        </motion.div>
      </ErrorBoundary>
    </div>
  );
}

export default App;