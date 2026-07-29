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
  Zap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function HomeDashboard({ 
  currentResume, 
  jobs, 
  onNavigateTab, 
  onApplyJob 
}) {
  const topJobs = jobs.slice(0, 3);

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="badge-chip badge-indigo" style={{ marginBottom: '12px', background: 'rgba(99, 102, 241, 0.25)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}>
            <Sparkles size={14} color="#A5B4FC" />
            AI Job Recommendation System • FYP
          </div>
          <h1>Welcome back, {currentResume.name.split(' ')[0]}!</h1>
          <p>
            Let's find your next role. Your resume has been parsed and matched with live tech jobs across Pakistan 🇵🇰 and India 🇮🇳 with explainable AI scoring.
          </p>
          
          <div style={{ display: 'flex', gap: '14px', marginTop: '22px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => onNavigateTab('upload')}>
              <UploadCloud size={18} />
              Upload & Analyze Resume
            </button>
            <button className="btn-secondary" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFF', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => onNavigateTab('matches')}>
              <Briefcase size={18} />
              View Top Matches ({jobs.length})
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span>Jobs Matched</span>
            <div className="stat-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Briefcase size={20} />
            </div>
          </div>
          <div className="stat-value">142</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +18 added today from LinkedIn & ATS
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>CVs Analyzed</span>
            <div className="stat-icon" style={{ background: 'var(--accent-cyan-light)', color: 'var(--accent-cyan)' }}>
              <FileText size={20} />
            </div>
          </div>
          <div className="stat-value">1,280</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Vector embeddings created
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Match Accuracy Rate</span>
            <div className="stat-icon" style={{ background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)' }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="stat-value">94.2%</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Validated by FYP evaluation engine
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>Active AI Agents</span>
            <div className="stat-icon" style={{ background: 'var(--accent-amber-light)', color: 'var(--accent-amber)' }}>
              <Zap size={20} />
            </div>
          </div>
          <div className="stat-value">2</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            CV Parser & Job Matcher active
          </span>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="dashboard-content-split">
        {/* Top 3 Job Recommendations Snapshot */}
        <div className="top-roles-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>Top Recommended Roles</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Highest semantic alignment for your active profile</p>
            </div>

            <button 
              className="btn-secondary" 
              style={{ fontSize: '0.82rem', padding: '7px 14px' }}
              onClick={() => onNavigateTab('matches')}
            >
              View All ({jobs.length})
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ width: '100%' }}>
            {topJobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={onApplyJob} />
            ))}
          </div>
        </div>

        {/* Right Side Panel: Agent Activity Feed */}
        <div className="agent-activity-panel">
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <ShieldCheck size={22} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>Agent Activity Log</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {MOCK_ACTIVITIES.map((act) => (
                <div key={act.id} style={{ display: 'flex', gap: '14px', fontSize: '0.88rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--text-main)', fontSize: '0.88rem' }}>{act.title}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{act.time}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                System Orchestration: n8n + Node.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
