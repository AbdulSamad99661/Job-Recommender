/**
 * API Service — communicates with Node.js backend
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');
const IS_PRODUCTION = import.meta.env.PROD;

function backendUnreachableMessage() {
  if (IS_PRODUCTION) {
    return 'Cannot reach backend. Add RAPIDAPI_KEY and OPENAI_API_KEY in Vercel → Settings → Environment Variables, then redeploy.';
  }
  return 'Cannot reach backend. Start it with: cd server && npm run dev';
}

export class ApiError extends Error {
  constructor(message, { status, code, details, warnings } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.warnings = warnings || [];
  }
}

/**
 * Check backend health and API key configuration
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new ApiError('Backend server is not responding', { status: response.status, code: 'BACKEND_DOWN' });
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      backendUnreachableMessage(),
      { code: 'BACKEND_UNREACHABLE', details: error.message }
    );
  }
}

/**
 * Upload PDF resume (or resumeText) and fetch location-based job matches.
 * @param {File|null} pdfFile
 * @param {string} location
 * @param {string} role
 * @param {string|null} resumeText - Plain-text CV for sample profiles
 * @param {(step: number) => void} onProgress - 1=upload, 2=parse, 3=search, 4=done
 */
export async function getJobRecommendations(pdfFile, location = 'Dubai', role = 'Software Engineer', resumeText = null, onProgress = null) {
  onProgress?.(1);

  const formData = new FormData();
  if (pdfFile) {
    formData.append('resume', pdfFile);
  }
  if (resumeText) {
    formData.append('resumeText', resumeText);
  }
  formData.append('location', location);
  formData.append('role', role);

  let progressTimer;
  if (onProgress) {
    progressTimer = setTimeout(() => onProgress(2), 400);
    setTimeout(() => onProgress(3), 2500);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/recommend-jobs`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(IS_PRODUCTION ? 55000 : 90000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        data.error || `Server returned status ${response.status}`,
        {
          status: response.status,
          code: data.code || 'SERVER_ERROR',
          details: data.details,
          warnings: data.warnings,
        }
      );
    }

    onProgress?.(4);

    if (data.warnings?.length) {
      console.warn('Backend warnings:', data.warnings);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      throw new ApiError(
        IS_PRODUCTION
          ? 'Request timed out. Vercel Hobby limits API calls to ~10–60 seconds. Try a sample profile or run the backend locally for full speed.'
          : 'Request timed out. Job search can take up to 90 seconds.',
        {
        code: 'TIMEOUT',
        details: error.message,
      });
    }

    throw new ApiError(
      backendUnreachableMessage(),
      { code: 'BACKEND_UNREACHABLE', details: error.message }
    );
  } finally {
    if (progressTimer) clearTimeout(progressTimer);
  }
}

/**
 * Search live jobs by skill (no CV required).
 * @param {string} skill
 * @param {string} location Country or city name from the search list
 */
export async function searchJobsBySkill(skill, location = 'Dubai') {
  try {
    const response = await fetch(`${API_BASE_URL}/search-jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill: skill.trim(), location }),
      signal: AbortSignal.timeout(IS_PRODUCTION ? 55000 : 90000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(data.error || `Server returned status ${response.status}`, {
        status: response.status,
        code: data.code || 'SERVER_ERROR',
        details: data.details,
        warnings: data.warnings,
      });
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      throw new ApiError('Search timed out. Try again or use a shorter skill keyword.', {
        code: 'TIMEOUT',
        details: error.message,
      });
    }

    throw new ApiError(backendUnreachableMessage(), {
      code: 'BACKEND_UNREACHABLE',
      details: error.message,
    });
  }
}

/**
 * Send a confirmation email after saving a job (fire-and-forget friendly).
 */
export async function notifySavedJobEmail(job, idToken, { recipientName, status = 'Saved' } = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/notify-saved-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ job, status, recipientName }),
      signal: AbortSignal.timeout(15000),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { sent: false, reason: data.details || data.error || 'Email could not be sent.' };
    }

    return { sent: Boolean(data.email_sent), reason: null };
  } catch (error) {
    return { sent: false, reason: error.message };
  }
}
