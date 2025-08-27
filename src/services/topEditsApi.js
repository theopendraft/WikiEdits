// Fetches top edited pages for a user on a project in a date range
export const fetchTopEditedPages = async (project, username, start, end) => {
  const formattedUsername = username.trim().replaceAll(" ", "_");
  const url = `https://xtools.wmcloud.org/api/user/top_edits/${project}/${encodeURIComponent(
    formattedUsername
  )}/all/${start}/${end}?pagination=0`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error (Status: ${response.status})`);
  }
  return await response.json();
};
