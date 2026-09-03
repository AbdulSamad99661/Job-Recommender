import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthGate from '../components/AuthGate';
import {
  History,
  UploadCloud,
  Search,
  Briefcase,
  Clock,
  MapPin,
} from 'lucide-react';

const TYPE_META = {
  upload: { icon: UploadCloud, label: 'CV Upload & Match', color: 'var(--primary)' },
  search: { icon: Search, label: 'Skill Search', color: 'var(--accent-cyan)' },
  match: { icon: Briefcase, label: 'Job Match Session', color: 'var(--accent-emerald)' },
};

function formatHistoryDate(entry) {
  const ts = entry.createdAt;
  if (!ts) return 'Recently';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryPage({ onNavigateTab }) {
  const { isAuthenticated, history, loading } = useAuth();

  if (!isAuthenticated && !loading) {
    return (
      <AuthGate
        title="Activity History"
        description="Sign in to see your uploads, searches, and match sessions in one timeline."
        onSignIn={() => onNavigateTab?.('auth')}
      />
    );
  }

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="upload-page-header">
        <span className="badge-chip badge-cyan"><History size={14} /> Activity History</span>
        <h1>Your timeline</h1>
        <p>Every upload, search, and match session is logged to your account.</p>
      </div>

      {history.length === 0 ? (
        <div className="empty-state-card">
          <History size={32} />
          <h3>No activity yet</h3>
          <p>Upload a CV or run a skill search while signed in — your history will appear here.</p>
          <button type="button" className="btn-primary" onClick={() => onNavigateTab?.('upload')}>
            <UploadCloud size={16} /> Upload Resume
          </button>
        </div>
      ) : (
        <div className="history-timeline">
          {history.map((entry) => {
            const meta = TYPE_META[entry.type] || TYPE_META.match;
            const Icon = meta.icon;
            return (
              <div key={entry.id} className="history-item-card">
                <div className="history-item-icon" style={{ color: meta.color }}>
                  <Icon size={20} />
                </div>
                <div className="history-item-body">
                  <div className="history-item-header">
                    <strong>{entry.title}</strong>
                    <span className="history-item-time">
                      <Clock size={12} /> {formatHistoryDate(entry)}
                    </span>
                  </div>
                  <span className="badge-chip badge-indigo history-type-badge">{meta.label}</span>
                  {entry.description && <p>{entry.description}</p>}
                  <div className="history-item-meta">
                    {entry.location && (
                      <span><MapPin size={13} /> {entry.location}</span>
                    )}
                    {entry.skill && <span>Skill: {entry.skill}</span>}
                    {entry.jobCount != null && <span>{entry.jobCount} jobs found</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
