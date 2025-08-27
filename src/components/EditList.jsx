import React from 'react';

function EditList({ isLoading, error, edits, searchedUser, offset = 0, hasMore = false, onNext, onPrev }) {
    if (isLoading) {
        return (
            <div className="text-center p-10 text-slate-500 font-medium">
                Loading edits...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    if (!searchedUser) {
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b pb-2">
                Results for: <span className="text-blue-600">{searchedUser}</span>
            </h2>
            {edits.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {edits.map((edit, idx) => (
                            <div key={edit.revid ? edit.revid : (edit.title || idx)} className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                                <a
                                    href={`https://${edit.project || edit.wiki}/wiki/${encodeURIComponent(edit.full_page_title || edit.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-semibold text-blue-700 hover:underline"
                                >
                                    {edit.full_page_title || edit.title}
                                </a>
                                <div className="text-sm text-slate-500 mt-1">
                                    <strong>Wiki:</strong> {edit.project || edit.wiki} | <strong>Date:</strong> {new Date(edit.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </div>
                                {edit.comment && (
                                    <p className="text-sm text-slate-600 italic mt-2 bg-slate-100 p-2 rounded">
                                        {edit.comment}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={onPrev}
                            disabled={offset === 0}
                            className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous 10
                        </button>
                        <span className="text-slate-500">Page {Math.floor(offset / 10) + 1}</span>
                        <button
                            onClick={onNext}
                            disabled={!hasMore}
                            className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next 10
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center p-10 text-slate-500 font-medium">
                    No global edits found for this user.
                </p>
            )}
        </div>
    );

}

export default EditList;