import React from 'react';

function TopEditedPagesList({ pages, isLoading, error }) {
    if (isLoading) return <div className="text-center p-8 text-slate-500">Loading...</div>;
    if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">{error}</div>;
    let pageArr = Array.isArray(pages) ? pages : (pages && typeof pages === 'object' ? Object.values(pages) : []);
    if (!pageArr || pageArr.length === 0) {
        return <div className="text-center p-8 text-slate-500">No top edited pages found.<br /><pre style={{ fontSize: '0.8em', color: '#888' }}>{JSON.stringify(pages, null, 2)}</pre></div>;
    }

    return (
        <div className="max-w-2xl mx-auto my-8">
            <h3 className="text-xl font-semibold mb-4">Top Edited Pages</h3>
            <table className="min-w-full border border-slate-200 rounded">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="px-4 py-2 text-left">Page</th>
                        <th className="px-4 py-2 text-left">Edits</th>
                    </tr>
                </thead>
                <tbody>
                    {pageArr.map((page, idx) => (
                        <tr key={page.page_title ? page.page_title + '-' + page.edit_count : idx} className="border-t">
                            <td className="px-4 py-2">
                                <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                    {page.page_title}
                                </a>
                            </td>
                            <td className="px-4 py-2">{page.edit_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TopEditedPagesList;
