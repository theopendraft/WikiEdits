import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-lg mx-auto my-8 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Top Edited Pages</h2>
            <input
                type="text"
                value={project}
                onChange={e => setProject(e.target.value)}
                placeholder="Project (e.g. en.wikipedia.org)"
                className="px-4 py-2 border rounded"
                required
            />
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="px-4 py-2 border rounded"
                required
            />
            <input
                type="date"
                value={start}
                onChange={e => setStart(e.target.value)}
                className="px-4 py-2 border rounded"
                required
            />
            <input
                type="date"
                value={end}
                onChange={e => setEnd(e.target.value)}
                className="px-4 py-2 border rounded"
                required
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Search</button>
        </form>
    );
}

export default TopEditedPagesForm;
