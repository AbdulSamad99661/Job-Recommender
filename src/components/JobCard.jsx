import React, { useState } from 'react';
import SkillBadge from './SkillBadge';
import { 
  Sparkles, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Bookmark,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers
} from 'lucide-react';

export default function JobCard({ job, onApply }) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showKeywordDetails, setShowKeywordDetails] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Match score ring color classification
  const getRingClass = (score) => {
    if (score >= 90) return '';
    if (score >= 80) return 'medium';
    return 'fair';
  };

  return (
    <div className="job-card animate-fade-in">
      {/* Job Header */}
      <div className="job-header">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div className="company-logo" style={{ background: job.logoBg }}>
            {job.logoText}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {job.title}
              </h3>
              <span className="badge-chip badge-indigo" style={{ padding: '3px 10px', fontSize: '0.74rem' }}>
                {job.source}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{job.company}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="var(--accent-cyan)" />
                {job.flag} {job.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={14} />
                {job.type} • {job.experience}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <DollarSign size={14} color="var(--accent-emerald)" />
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        {/* Match Score Badge Ring */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className={`match-ring ${getRingClass(job.matchScore)}`}>
            <span>{job.matchScore}%</span>
            <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Match</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: '12px 0', lineHeight: 1.6 }}>
        {job.description}
      </p>

      {/* Matched vs Missing Skill Badges */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Skill Overview:
        </div>
        <div className="skills-container" style={{ margin: '0 0 12px 0' }}>
          {job.matchedSkills.map((skill) => (
            <SkillBadge key={skill} skill={skill} isMatched={true} />
          ))}
          {job.missingSkills.map((skill) => (
            <SkillBadge key={skill} skill={skill} isMatched={false} />
          ))}
        </div>
      </div>

      {/* Detailed Keyword Match Breakdown Toggle */}
      {showKeywordDetails && (
        <div className="keyword-breakdown-box animate-pop-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={16} color="var(--accent-cyan)" />
              Extracted Skill & Keyword Comparison
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {job.matchedKeywords ? job.matchedKeywords.length : 0} Matched / {job.unmatchedKeywords ? job.unmatchedKeywords.length : 0} Unmatched
            </span>
          </div>

          <div className="keyword-grid">
            {/* Matched Keywords Column */}
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <CheckCircle2 size={14} /> Matched Requirements ({job.matchedKeywords ? job.matchedKeywords.length : 0})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {job.matchedKeywords && job.matchedKeywords.map((kw, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', background: 'var(--bg-surface-elevated)', padding: '6px 10px', borderRadius: '6px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{kw.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{kw.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unmatched Keywords Column */}
            <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <XCircle size={14} /> Unmatched Skills ({job.unmatchedKeywords ? job.unmatchedKeywords.length : 0})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {job.unmatchedKeywords && job.unmatchedKeywords.map((kw, i) => (
                  <div key={i} style={{ fontSize: '0.78rem', background: 'var(--bg-surface-elevated)', padding: '6px 10px', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-main)' }}>
                      <span>{kw.name}</span>
                      <span style={{ color: 'var(--accent-amber)', fontSize: '0.72rem' }}>{kw.weight} Priority</span>
                    </div>
                    {kw.suggestion && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        💡 {kw.suggestion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explainable AI Rationale Accordion */}
      {showExplanation && (
        <div className="explain-box animate-pop-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--primary)', marginBottom: '6px' }}>
            <Sparkles size={16} />
            Explainable AI Semantic Rationale
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
            {job.explanation}
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Mandatory Requirements:</strong> {job.requirements.join(' • ')}
          </div>
        </div>
      )}

      {/* Action Footer with Date & Exact Time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.82rem' }}
            onClick={() => setShowExplanation(!showExplanation)}
          >
            <Sparkles size={14} color="var(--accent-cyan)" />
            {showExplanation ? 'Hide Explanation' : 'Why You Match'}
            {showExplanation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <button 
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.82rem' }}
            onClick={() => setShowKeywordDetails(!showKeywordDetails)}
          >
            <Layers size={14} color="var(--primary)" />
            {showKeywordDetails ? 'Hide Keyword Breakdown' : 'Skill Breakdown'}
          </button>

          {/* Job Posted Date and Exact Time */}
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={13} color="var(--accent-cyan)" />
            Posted {job.postedDate} ({job.postedDateTime})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="icon-btn"
            style={{ width: '36px', height: '36px', borderRadius: '8px', color: isSaved ? '#FBBF24' : 'var(--text-muted)' }}
            onClick={() => setIsSaved(!isSaved)}
            title="Save Job"
          >
            <Bookmark size={16} fill={isSaved ? '#FBBF24' : 'none'} />
          </button>

          <button 
            className="btn-primary" 
            style={{ padding: '9px 18px', fontSize: '0.88rem' }}
            onClick={() => onApply(job)}
          >
            Apply Now
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
