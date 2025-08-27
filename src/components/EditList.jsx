import React from 'react';

function EditList({ isLoading, error, edits, searchedUser }) {
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
    return null; // Don't render anything if a search hasn't been performed
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-4 border-b pb-2">
        Results for: <span className="text-blue-600">{searchedUser}</span>
      </h2>
      
      {edits.length > 0 ? (
        <div className="space-y-4">
          {edits.map((edit) => (
            <div key={edit.revid} className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:shadow-md hover:border-slate-300 transition-all duration-200">
              
              <a 
                href={`https://${edit.wiki}/wiki/${encodeURIComponent(edit.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-700 hover:underline"
              >
                {edit.title}
              </a>

              <div className="text-sm text-slate-500 mt-1">
                <strong>Wiki:</strong> {edit.wiki} | <strong>Date:</strong> {new Date(edit.timestamp).toLocaleString()}
              </div>
              
              {edit.comment && (
                <p className="text-sm text-slate-600 italic mt-2 bg-slate-100 p-2 rounded">
                  {edit.comment}
                </p>
              )}

            </div>
          ))}
        </div>
      ) : (
        <p className="text-center p-10 text-slate-500 font-medium">
          No global edits found for this user.
        </p>
      )}
    </div>
  );
}

export default EditList;