import React, { useState } from 'react';
import { motion } from 'framer-motion';

function TopEditedPagesForm({ onSubmit }) {
    const [project, setProject] = useState('en.wikipedia.org');
    const [username, setUsername] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!project || !username || !start || !end) return;
        onSubmit({ project, username, start, end });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-lg mx-auto my-8 p-8 bg-white rounded-2xl shadow-xl border border-[#2F9A67]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 8 }}
                className="flex justify-center mb-2"
            >
                <svg width="64" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="28" stroke="#00669A" strokeWidth="4" fill="#fff" />
                    <circle cx="30" cy="30" r="12" fill="#2F9A67" />
                    <path d="M30 10 A20 20 0 1 1 29.99 10.01" stroke="#9B0000" strokeWidth="4" fill="none" />
                </svg>
            </motion.div>
            <h2 className="text-2xl font-bold mb-2 text-center tracking-tight" style={{ color: '#00669A' }}>Top Edited Pages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.input
                    type="text"
                    value={project}
                    onChange={e => setProject(e.target.value)}
                    placeholder="Project (e.g. en.wikipedia.org)"
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
                <motion.input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
                <motion.input
                    type="date"
                    value={start}
                    onChange={e => setStart(e.target.value)}
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
                <motion.input
                    type="date"
                    value={end}
                    onChange={e => setEnd(e.target.value)}
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
            </div>
            <motion.button
                type="submit"
                className="mt-4 bg-[#00669A] text-white font-semibold px-8 py-2 rounded-lg border border-[#00669A] shadow-md hover:shadow-xl hover:bg-white hover:text-[#00669A] transition-all duration-200 text-lg tracking-wide"
                whileTap={{ scale: 0.98 }}
            >
                Search
            </motion.button>
        </motion.form>
    );
}

export default TopEditedPagesForm;
