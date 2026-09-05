function parsePostedDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatRelativePostingTime(date) {
  if (!date || Number.isNaN(date.getTime())) return null;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) {
    return `Posted on ${date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Posted just now';
  if (diffMinutes < 60) return `Posted ${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHours < 24) return `Posted ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays === 1) return 'Posted 1 day ago';
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Posted ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }

  return `Posted on ${date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;
}

function normalizePostedAtText(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  if (lower === 'posted recently' || lower === 'recently' || lower === 'date unavailable') {
    return null;
  }
  if (lower.startsWith('posted ')) return trimmed;

  return `Posted ${trimmed}`;
}

export function formatJobPostedTime(job = {}) {
  const fromText = normalizePostedAtText(job.posted_time_ago || job.job_posted_at);
  if (fromText) return fromText;

  const parsedDate =
    parsePostedDate(job.posted_date) ||
    parsePostedDate(job.posted_at) ||
    parsePostedDate(job.job_posted_at_datetime_utc);

  if (parsedDate) return formatRelativePostingTime(parsedDate);

  const timestamp = job.job_posted_at_timestamp ?? job.posted_timestamp;
  if (timestamp != null && timestamp !== '') {
    const numeric = Number(timestamp);
    if (!Number.isNaN(numeric) && numeric > 0) {
      const fromTimestamp = new Date(numeric > 1e12 ? numeric : numeric * 1000);
      const relative = formatRelativePostingTime(fromTimestamp);
      if (relative) return relative;
    }
  }

  return 'Date unavailable';
}
