export const API_URL = 'http://localhost:3000';

export async function getActiveLives() {
  const res = await fetch(`${API_URL}/lives/active`);
  return res.json();
}
