/**
 * Verify Firebase ID token via Identity Toolkit REST API (no Admin SDK required).
 */
export async function verifyFirebaseIdToken(idToken) {
  const apiKey = process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;
  if (!apiKey) {
    throw new Error('FIREBASE_API_KEY is not configured on the server.');
  }

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    }
  );

  const data = await res.json();
  if (!res.ok || !data.users?.[0]) {
    throw new Error('Invalid or expired session.');
  }

  const account = data.users[0];
  return {
    uid: account.localId,
    email: account.email,
    displayName: account.displayName || '',
  };
}
