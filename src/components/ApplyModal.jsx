import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, FileText, ExternalLink } from 'lucide-react';

export default function ApplyModal({ job, candidate, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Manager at ${job.company || 'the Team'},\n\nI am writing to express my strong interest in the ${job.title} position located in ${job.location || 'your region'}. Based on my background as a ${candidate?.title || 'Software Developer'} with experience in ${(job.matchedSkills || ['React', 'JavaScript']).slice(0, 3).join(', ')}, I am confident that I can make an immediate contribution to your engineering team.\n\nMy AI match score of ${job.matchScore || job.match_score || 90}% highlights strong alignment with your required technical stack. I look forward to discussing how my experience fits your requirements.\n\nBest regards,\n${candidate?.name || 'Applicant'}`
  );

  const applyUrl = job.applyLink || job.apply_link || 'https://www.linkedin.com/jobs';

  const handleOpenExternalJob = () => {
    if (applyUrl) {
      window.open(applyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleApply = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Open external official job site automatically
    handleOpenExternalJob();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content animate-pop-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="company-logo" style={{ background: job.logoBg || 'var(--primary-light)', width: '40px', height: '40px', fontSize: '0.95rem' }}>
              {job.logoText || (job.company ? job.company.substring(0, 2).toUpperCase() : 'JOB')}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Apply to {job.company}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {job.title} • {job.location}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="icon-btn"
            style={{ width: '34px', height: '34px' }}
          >
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: 'var(--accent-emerald)' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
              Opening Job Site!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Redirecting you to the official job listing at <strong>{job.company}</strong> ({job.source_platform || 'LinkedIn / Indeed'}).
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={handleOpenExternalJob}>
                <ExternalLink size={16} /> Re-open Job Portal
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Done & Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleApply}>
            {/* DIRECT EXTERNAL LINK BANNER */}
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '16px', border: '1px solid var(--accent-cyan)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                🌐 <strong>Official Posting:</strong> {job.source_platform || 'RapidAPI Live Search'}
              </div>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ fontSize: '0.8rem', padding: '5px 12px' }}
                onClick={handleOpenExternalJob}
              >
                Open Direct URL <ExternalLink size={13} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--accent-cyan)" />
                  AI-Generated Tailored Cover Letter
                </label>
                <span className="mono-font badge-chip badge-emerald" style={{ fontSize: '0.72rem' }}>
                  {job.matchScore || job.match_score || 90}% Match Rationale
                </span>
              </div>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={7}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-color-strong)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                  lineHeight: 1.5
                }}
              />
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={22} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Attached CV: {candidate?.name || 'Candidate'} Resume.pdf
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Parsed skills & vector embedding attached automatically
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Redirecting to Job Site...</>
                ) : (
                  <>
                    <ExternalLink size={16} />
                    Apply on Official Site
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
