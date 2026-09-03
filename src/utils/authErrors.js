const FIREBASE_AUTH_MESSAGES = {
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/operation-not-allowed': 'Email/password sign-in is not enabled. Enable it in Firebase Console.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Try again or reset it.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/missing-password': 'Please enter your password.',
};

export function getAuthErrorMessage(error) {
  const code = error?.code;
  if (code && FIREBASE_AUTH_MESSAGES[code]) {
    return FIREBASE_AUTH_MESSAGES[code];
  }
  return error?.message || 'Something went wrong. Please try again.';
}
