import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, FileText } from 'lucide-react';

export default function ApplyModal({ job, candidate, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Manager at ${job.company},\n\nI am writing to express my strong interest in the ${job.title} position in ${job.location}. Based on my background as a ${candidate.title} with experience in ${job.matchedSkills.slice(0, 3).join(', ')}, I am confident that I can make an immediate contribution to your engineering team.\n\nMy AI resume match score of ${job.matchScore}% highlights strong alignment with your technical stack. I look forward to discussing how my experience fits your requirements.\n\nBest regards,\n${candidate.name}`
  );

  const handleApply = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content animate-pop-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="company-logo" style={{ background: job.logoBg, width: '40px', height: '40px', fontSize: '0.95rem' }}>
              {job.logoText}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Apply to {job.company}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {job.title} • {job.flag} {job.location}
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
              Application Submitted!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Your resume and AI-optimized cover letter have been sent to {job.company} via the agent pipeline.
            </p>
            <button className="btn-primary" onClick={onClose}>
              Done & Return to Jobs
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--accent-cyan)" />
                  AI-Generated Tailored Cover Letter
                </label>
                <span className="mono-font badge-chip badge-emerald" style={{ fontSize: '0.72rem' }}>
                  {job.matchScore}% Match Rationale
                </span>
              </div>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={8}
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
                  Attached CV: {candidate.name} Resume.pdf
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
                  <>Sending Application...</>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Application
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
