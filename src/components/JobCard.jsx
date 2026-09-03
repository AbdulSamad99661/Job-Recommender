import React, { useState } from 'react';
import SkillBadge from './SkillBadge';
import { useAuth } from '../context/AuthContext';
import { buildJobDocId } from '../services/userService';
import {
  Sparkles,
  MapPin,
  Briefcase,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  XCircle,
  Globe,
  Clock,
  Layers,
  LogIn,
} from 'lucide-react';

export default function JobCard({ job, onNavigateTab }) {
  const { isAuthenticated, isJobSaved, saveJob, unsaveJob, logHistory } = useAuth();
  const [showExplanation, setShowExplanation] = useState(false);
  const [showKeywordDetails, setShowKeywordDetails] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saved = isJobSaved(job);

  const getRingClass = (score) => {
    if (score >= 90) return '';
    if (score >= 80) return 'medium';
    return 'fair';
  };

  const handleApplyClick = () => {
    const link = job.applyLink || job.apply_link;
    if (link && (link.startsWith('http://') || link.startsWith('https://'))) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSaveToggle = async () => {
    if (!isAuthenticated) {
      onNavigateTab?.('auth');
      return;
    }
    setIsSaving(true);
    try {
      if (saved) {
        await unsaveJob(buildJobDocId(job));
      } else {
        await saveJob(job, 'Saved');
        await logHistory({
          type: 'match',
          title: `Saved job: ${job.title}`,
          description: `${job.company} — ${job.location || job.city || ''}`,
          location: job.country || job.city || '',
        });
      }
    } catch (err) {
      console.error('Save job failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const matchScore = job.matchScore || job.match_score || 88;
  const postedTime = job.postedDate || job.posted_time_ago || job.posted_date || 'Posted recently';
  const matchedList = job.matchedSkills || job.matched_skills || job.explanation?.matching_skills || ['React', 'JavaScript', 'Node.js'];
  const missingList = job.missingSkills || job.missing_skills || job.explanation?.missing_skills || [];
  const whyRationale = job.rationale || job.explanation?.why_matched || `Candidate CV skills directly match requirements for ${job.title} at ${job.company}.`;

  return (
    <div className="job-card animate-fade-in">
      <div className="job-header">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div className="company-logo" style={{ background: job.logoBg || 'var(--primary-light)' }}>
            {job.logoText || (job.company ? job.company.substring(0, 2).toUpperCase() : 'JOB')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {job.title}
              </h3>
              <span className="badge-chip badge-indigo" style={{ padding: '3px 10px', fontSize: '0.74rem' }}>
                <Globe size={12} /> {job.source_platform || job.source || 'RapidAPI Live Job'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{job.company}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="var(--accent-cyan)" />
                {job.location || job.city}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={14} />
                {job.type || 'Full-time'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                <Clock size={14} />
                {postedTime}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={`match-ring ${getRingClass(matchScore)}`}>
            <span>{matchScore}%</span>
            <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Match</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: '12px 0', lineHeight: 1.6 }}>
        {job.description || whyRationale}
      </p>

      {(matchedList.length > 0 || missingList.length > 0) && (
        <div style={{ marginBottom: '12px', background: 'var(--bg-surface-elevated)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Live Job Skill & Requirements Comparison:</span>
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', textTransform: 'none' }}>
              {matchedList.length} Matched CV Skills
            </span>
          </div>
          <div className="skills-container" style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {matchedList.map((skill) => (
              <SkillBadge key={skill} skill={skill} isMatched={true} />
            ))}
            {missingList.map((skill) => (
              <SkillBadge key={skill} skill={skill} isMatched={false} />
            ))}
          </div>
        </div>
      )}

      {showKeywordDetails && (
        <div className="keyword-breakdown-box animate-pop-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} color="var(--accent-cyan)" />
              Extracted Skill & Keyword Comparison
            </h4>
          </div>
          <div className="keyword-grid">
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <CheckCircle2 size={14} /> Matched Skills ({matchedList.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {matchedList.map((k) => (
                  <span key={k} className="badge-chip badge-emerald" style={{ fontSize: '0.72rem' }}>{k}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#EF4444', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <XCircle size={14} /> Missing Job Requirements ({missingList.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {missingList.length > 0 ? missingList.map((k) => (
                  <span key={k} className="badge-chip" style={{ fontSize: '0.72rem', background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}>{k}</span>
                )) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None! 100% skill overlap</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showExplanation && (
        <div className="match-explanation-box animate-pop-in" style={{
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-color)',
          borderLeft: '4px solid var(--accent-cyan)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          margin: '14px 0',
        }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.65 }}>{whyRationale}</p>
        </div>
      )}

      <div className="card-actions">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px' }} onClick={() => setShowExplanation(!showExplanation)}>
            <Sparkles size={13} color="var(--accent-cyan)" />
            {showExplanation ? 'Hide AI Rationale' : 'Why Matched?'}
            {showExplanation ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 12px' }} onClick={() => setShowKeywordDetails(!showKeywordDetails)}>
            <Layers size={13} />
            {showKeywordDetails ? 'Hide Breakdown' : 'Skill Overview'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            className={`bookmark-btn ${saved ? 'saved' : ''}`}
            onClick={handleSaveToggle}
            disabled={isSaving}
            title={!isAuthenticated ? 'Sign in to save' : saved ? 'Remove from Saved' : 'Save Job'}
          >
            {!isAuthenticated ? <LogIn size={15} /> : <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />}
          </button>
          <button className="btn-primary" onClick={handleApplyClick}>
            Apply Now
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
