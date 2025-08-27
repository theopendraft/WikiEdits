import React, { useState } from 'react';
import { motion } from 'framer-motion';

function TopEditedPagesForm({ onSubmit }) {
    const [project, setProject] = useState([]);
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

            <h2 className="text-2xl font-bold mb-2 text-center tracking-tight" style={{ color: '#00669A' }}>Top Edited Pages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col w-full">
                <motion.input
                    type="text"
                    value={project}
                    onChange={e => setProject(e.target.value)}
                    placeholder="Project name"
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
                                <span className="text-xs text-slate-500 mt-1 ml-1">E.g. en.wikipedia.org</span>
                </div>
                <div className="flex flex-col w-full">
                <motion.input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
                <span className="text-xs text-slate-500 mt-1 ml-1">E.g. Jimbo Wales</span>
                </div>
                <div className="flex flex-col w-full">
                <motion.input
                    type="date"
                    value={start}
                    onChange={e => setStart(e.target.value)}
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
                <span className="text-xs text-slate-500 mt-1 ml-1">Start date (e.g. 28-01-2020)</span>
                </div>
                <div className="flex flex-col w-full">
                <motion.input
                    type="date"
                    value={end}
                    onChange={e => setEnd(e.target.value)}
                    className="px-4 py-3 border-2 border-[#2F9A67] rounded-lg focus:outline-none transition-all text-lg bg-[#f8fafc] hover:border-[#9B0000]"
                    required
                    whileFocus={{ scale: 1.03 }}
                />
           
            <span className="text-xs text-slate-500 mt-1 ml-1">End date (e.g. 30-01-2025)</span>
                </div>
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
