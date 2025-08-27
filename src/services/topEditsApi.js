// Fetches top edited pages for a user on a project in a date range

export const fetchTopEditedPages = async (project, username, start, end) => {
  const formattedUsername = username.trim().replaceAll(" ", "_");
  const url = `https://xtools.wmcloud.org/api/user/top_edits/${project}/${encodeURIComponent(
    formattedUsername
  )}/all/${start}/${end}?pagination=0`;

  console.log("topedits API URL:", url);
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    throw new Error(
      "Network error. Please check your connection or try again later."
    );
  }
  if (response.status === 401) {
    throw new Error(
      "This user has not opted in to have this data shown. (401)"
    );
  }
  if (!response.ok) {
    // Try to parse error message from response if possible
    let message = `API error (Status: ${response.status})`;
    try {
      const data = await response.json();
      if (data && data.error) {
        message += `: ${data.error}`;
      }
    } catch {}
    throw new Error(message);
  }
  try {
    return await response.json();
  } catch (err) {
    throw new Error("Unexpected response format from the API.");
  }
};
