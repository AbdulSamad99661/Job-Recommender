import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthGate from '../components/AuthGate';
import { SAVED_JOB_STATUSES } from '../services/userService';
import {
  Bookmark,
  ExternalLink,
  Trash2,
  MapPin,
  Briefcase,
  Loader2,
} from 'lucide-react';

const STATUS_COLORS = {
  Saved: 'badge-indigo',
  Applied: 'badge-cyan',
  Interview: 'badge-amber',
  Offer: 'badge-emerald',
  Rejected: 'badge-amber',
};

export default function SavedJobs({ onNavigateTab }) {
  const {
    isAuthenticated,
    savedJobs,
    changeSavedJobStatus,
    unsaveJob,
    loading,
  } = useAuth();
  const [busyId, setBusyId] = useState(null);

  if (!isAuthenticated && !loading) {
    return (
      <AuthGate
        title="Saved Jobs"
        description="Sign in to bookmark jobs, track application status, and add notes."
        onSignIn={() => onNavigateTab?.('auth')}
      />
    );
  }

  const handleStatusChange = async (jobDocId, status) => {
    setBusyId(jobDocId);
    try {
      await changeSavedJobStatus(jobDocId, status);
    } finally {
      setBusyId(null);
    }
  };

  const handleNotesBlur = async (jobDocId, notes, currentStatus) => {
    setBusyId(jobDocId);
    try {
      await changeSavedJobStatus(jobDocId, currentStatus || 'Saved', notes);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (jobDocId) => {
    setBusyId(jobDocId);
    try {
      await unsaveJob(jobDocId);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="upload-page-header">
        <span className="badge-chip badge-indigo"><Bookmark size={14} /> Saved Jobs</span>
        <h1>Your saved jobs ({savedJobs.length})</h1>
        <p>Track status from Saved → Applied → Interview → Offer or Rejected.</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="empty-state-card">
          <Bookmark size={32} />
          <h3>No saved jobs yet</h3>
          <p>Browse Job Matches or Search, then click the bookmark icon on any job card.</p>
          <button type="button" className="btn-primary" onClick={() => onNavigateTab?.('matches')}>
            View Job Matches
          </button>
        </div>
      ) : (
        <div className="saved-jobs-list">
          {savedJobs.map((job) => (
            <div key={job.id} className="saved-job-card">
              <div className="saved-job-main">
                <div>
                  <div className="saved-job-title-row">
                    <h3>{job.title}</h3>
                    <span className={`badge-chip ${STATUS_COLORS[job.status] || 'badge-indigo'}`}>{job.status || 'Saved'}</span>
                  </div>
                  <div className="saved-job-meta">
                    <span><Briefcase size={14} /> {job.company}</span>
                    <span><MapPin size={14} /> {job.location}</span>
                    {job.matchScore != null && <span>{job.matchScore}% match</span>}
                  </div>
                </div>
                <div className="saved-job-actions">
                  {job.applyLink && (
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-compact">
                      <ExternalLink size={14} /> Open
                    </a>
                  )}
                  <button type="button" className="btn-secondary btn-compact" onClick={() => handleRemove(job.id)} disabled={busyId === job.id}>
                    {busyId === job.id ? <Loader2 size={14} className="animate-spin-slow" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
              <div className="saved-job-status-row">
                <label>Status</label>
                <select
                  className="filter-select"
                  value={job.status || 'Saved'}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  disabled={busyId === job.id}
                >
                  {SAVED_JOB_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <label className="saved-job-notes-field">
                <span>Notes</span>
                <textarea
                  className="saved-job-notes-input"
                  placeholder="Interview on Friday, follow up with recruiter…"
                  defaultValue={job.notes || ''}
                  onBlur={(e) => handleNotesBlur(job.id, e.target.value.trim(), job.status)}
                  disabled={busyId === job.id}
                  rows={2}
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
