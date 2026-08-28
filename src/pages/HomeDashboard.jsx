import React from 'react';
import JobCard from '../components/JobCard';
import { MOCK_ACTIVITIES } from '../data/mockActivities';
import { 
  Sparkles, 
  UploadCloud, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  ArrowRight,
  Target
} from 'lucide-react';

export default function HomeDashboard({ 
  currentResume, 
  jobs, 
  onNavigateTab, 
}) {
  const topJobs = jobs.slice(0, 3);
  const topScore = jobs[0]?.matchScore ?? null;
  const skillCount = currentResume?.topSkills?.length || 0;
  const firstName = currentResume?.name?.split(' ')?.[0] || 'there';

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={14} />
            Smart job matching for tech careers
          </div>
          <h1>Hi {firstName}, find your next role</h1>
          <p>
            Upload your resume and get matched with live job listings across Dubai, Pakistan, India, and remote roles — with clear skill scores and apply links.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onNavigateTab('upload')}>
              <UploadCloud size={18} />
              Upload Resume
            </button>
            <button className="btn-secondary hero-secondary-btn" onClick={() => onNavigateTab('matches')}>
              <Briefcase size={18} />
              View Matches {jobs.length > 0 ? `(${jobs.length})` : ''}
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Jobs Matched</span>
            <div className="stat-icon stat-icon-primary">
              <Briefcase size={20} />
            </div>
          </div>
          <div className="stat-value">{jobs.length}</div>
          <span className="stat-footnote stat-footnote-success">
            <TrendingUp size={14} /> {jobs.length > 0 ? 'From your latest search' : 'Upload a CV to start'}
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Best Match Score</span>
            <div className="stat-icon stat-icon-emerald">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="stat-value">{topScore != null ? `${topScore}%` : '—'}</div>
          <span className="stat-footnote">Highest alignment with your profile</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Skills Detected</span>
            <div className="stat-icon stat-icon-cyan">
              <FileText size={20} />
            </div>
          </div>
          <div className="stat-value">{skillCount || '—'}</div>
          <span className="stat-footnote">Extracted from your active resume</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Target Role</span>
            <div className="stat-icon stat-icon-amber">
              <Target size={20} />
            </div>
          </div>
          <div className="stat-value stat-value-sm">{currentResume?.title || '—'}</div>
          <span className="stat-footnote">Inferred from your CV</span>
        </div>
      </div>

      <div className="dashboard-content-split">
        <div className="top-roles-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Top Recommendations</h2>
              <p className="section-subtitle">Best matches for your current profile</p>
            </div>

            {jobs.length > 0 && (
              <button 
                className="btn-secondary btn-compact" 
                onClick={() => onNavigateTab('matches')}
              >
                View All ({jobs.length})
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          {topJobs.length > 0 ? (
            topJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="empty-state-card">
              <Briefcase size={32} color="var(--text-dim)" />
              <h3>No matches yet</h3>
              <p>Upload your resume to see personalized job recommendations.</p>
              <button className="btn-primary" onClick={() => onNavigateTab('upload')}>
                <UploadCloud size={16} /> Get Started
              </button>
            </div>
          )}
        </div>

        <div className="agent-activity-panel">
          <div className="activity-panel-card">
            <div className="activity-panel-header">
              <Sparkles size={20} color="var(--accent-cyan)" />
              <h3>Recent Activity</h3>
            </div>

            <div className="activity-list">
              {MOCK_ACTIVITIES.map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-dot" />
                  <div>
                    <div className="activity-item-header">
                      <strong>{act.title}</strong>
                      <span>{act.time}</span>
                    </div>
                    <p>{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
