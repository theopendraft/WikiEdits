// Validate Wikimedia username existence
export async function validateWikiUser(project, username) {
  const apiUrl = `https://${project}/w/api.php?action=query&list=users&ususers=${encodeURIComponent(
    username
  )}&format=json&origin=*`;
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return false;
    const data = await res.json();
    if (data && data.query && data.query.users && data.query.users[0]) {
      return !data.query.users[0].missing;
    }
    return false;
  } catch {
    return false;
  }
}

// Validate Wikimedia project name (basic format check)
export function validateProjectName(project) {
  // Accepts e.g. en.wikipedia.org, commons.wikimedia.org, etc.
  return /^[a-z0-9-]+\.(wikipedia|wiktionary|wikibooks|wikinews|wikiquote|wikisource|wikiversity|wikivoyage|wikimedia|wikidata)\.org$/i.test(
    project
  );
}
