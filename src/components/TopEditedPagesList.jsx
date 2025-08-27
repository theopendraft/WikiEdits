import React from 'react';
import { motion } from 'framer-motion';


function TopEditedPagesList({ pages, isLoading, error }) {
    // Show prompt if no search has been performed yet
    if (pages === null || pages === undefined) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-[#00669A]">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                    <circle cx="30" cy="30" r="28" stroke="#2F9A67" strokeWidth="4" fill="#fff" />
                    <circle cx="30" cy="30" r="12" fill="#f0f8fa" />
                    <path d="M20 38 Q30 48 40 38" stroke="#9B0000" strokeWidth="3" fill="none" />
                    <circle cx="25" cy="28" r="2" fill="#00669A" />
                    <circle cx="35" cy="28" r="2" fill="#00669A" />
                </svg>
                <div className="text-lg font-semibold mb-1">Please enter the user name and dates</div>
                <div className="text-sm text-[#2F9A67]">to view the top edited pages.</div>
            </div>
        );
    }
    if (isLoading) return <div className="text-center p-8 text-slate-500">Loading...</div>;
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-[#00669A]">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                    <circle cx="30" cy="30" r="28" stroke="#2F9A67" strokeWidth="4" fill="#fff" />
                    <circle cx="30" cy="30" r="12" fill="#f0f8fa" />
                    <path d="M20 38 Q30 48 40 38" stroke="#9B0000" strokeWidth="3" fill="none" />
                    <circle cx="25" cy="28" r="2" fill="#00669A" />
                    <circle cx="35" cy="28" r="2" fill="#00669A" />
                </svg>
                <div className="text-lg font-semibold mb-1">Something went wrong</div>
                <div className="text-sm text-[#2F9A67]">Try a different user, project, or date range.</div>
            </div>
        );
    }

    // The API returns an object with namespace keys, each value is an array of pages
    let pageArr = [];
    if (pages && typeof pages === 'object' && !Array.isArray(pages)) {
        // If the object has a 'top_edits' key, use that
        if (pages.top_edits && typeof pages.top_edits === 'object') {
            pageArr = Object.values(pages.top_edits).flat();
        } else {
            pageArr = Object.values(pages).flat();
        }
    } else if (Array.isArray(pages)) {
        pageArr = pages;
    }

    // Only show empty state if a search has been performed (pages is not null/undefined)
    if ((pages !== null && pages !== undefined) && (!pageArr || pageArr.length === 0)) {
        return (
            <div className="flex flex-col items-center justify-center pt-2 text-[#00669A]">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
                    <circle cx="30" cy="30" r="28" stroke="#2F9A67" strokeWidth="4" fill="#fff" />
                    <circle cx="30" cy="30" r="12" fill="#f0f8fa" />
                    <path d="M20 38 Q30 48 40 38" stroke="#9B0000" strokeWidth="3" fill="none" />
                    <circle cx="25" cy="28" r="2" fill="#00669A" />
                    <circle cx="35" cy="28" r="2" fill="#00669A" />
                </svg>
                <div className="text-lg font-semibold mb-1">Enter a user, project, and date range.</div>
                <div className="text-sm text-[#2F9A67]">To view the top edited pages.</div>
            </div>
        );
    }

    // The API uses 'count' for edit count, not 'edit_count', and does not provide a URL, so we construct it
    const getPageUrl = (page) => {
        // Try to get project from the response root, fallback to en.wikipedia.org
        const project = (pages && pages.project) || 'en.wikipedia.org';
        // Namespace 0 = main, 1 = Talk, 2 = User, 3 = User talk, 4 = Wikipedia, 5 = Wikipedia talk, etc.
        // Use full_page_title if available, else page_title
        const title = page.full_page_title || page.page_title;
        return `https://${project.replace(/_/g, '.')}/wiki/${encodeURIComponent(title)}`;
    };

    return (
        <div className="max-w-2xl mx-auto my-8">
            {/* Wikimedia Logo with color palette and animation */}
            <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 8 }}
                className="flex justify-center mb-4"
            >
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="28" stroke="#00669A" strokeWidth="4" fill="#fff" />
                    <circle cx="30" cy="30" r="12" fill="#2F9A67" />
                    <path d="M30 10 A20 20 0 1 1 29.99 10.01" stroke="#9B0000" strokeWidth="4" fill="none" />
                </svg>
            </motion.div>
            <h3 className="text-2xl font-bold mb-6 text-center tracking-tight" style={{ color: '#00669A' }}>Top Edited Pages</h3>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="overflow-x-auto border border-[#2F9A67] rounded-lg shadow-lg">
                    <table className="min-w-full bg-white rounded-lg  ">
                        <thead>
                            <tr className="bg-[#00669A] text-white">
                                <th className="px-6 py-3 text-left font-semibold tracking-wide">Page</th>
                                <th className="px-6 py-3 text-left font-semibold tracking-wide">Edits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageArr.map((page, idx) => (
                                <motion.tr
                                    key={(page.page_title || page.full_page_title) + '-' + (page.count || page.edit_count) + '-' + idx}
                                    className="border-b border-[#2F9A67] group hover:bg-[#f0f8fa] transition-colors duration-200"
                                    whileHover={{ scale: 1.01, boxShadow: '0 4px 16px #00669A22' }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                >
                                    <td className="px-6 py-3">
                                        <a
                                            href={getPageUrl(page)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium underline-offset-2 transition-colors duration-200 group-hover:text-[#9B0000] text-[#00669A] hover:text-[#2F9A67]"
                                        >
                                            {page.full_page_title || page.page_title}
                                        </a>
                                    </td>
                                    <td className="px-6 py-3 font-semibold text-[#2F9A67] group-hover:text-[#9B0000] transition-colors duration-200">
                                        {page.count ?? page.edit_count}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

export default TopEditedPagesList;
