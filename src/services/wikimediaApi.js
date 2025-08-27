/**
 * Fetches global edits for a given Wikimedia username.
 * @param {string} username - The username to search for.
 * @returns {Promise<Array>} A promise that resolves to an array of edit objects.
 * @throws {Error} Throws an error if the network response is not ok.
 */
export const fetchGlobalEdits = async (username) => {
  // First, trim whitespace, then replace all spaces with underscores.
  const formattedUsername = username.trim().replaceAll(" ", "_");

  // Construct the API URL with the correctly formatted username.
  const apiUrl = `https://xtools.wmcloud.org/api/user/globalcontribs/${encodeURIComponent(
    formattedUsername
  )}/all/0`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`User not found or API error (Status: ${response.status})`);
  }

  const data = await response.json();

  return data.globalcontribs || [];
};
