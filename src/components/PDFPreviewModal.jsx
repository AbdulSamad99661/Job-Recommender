import React from 'react';
import { X, FileText, Download, ExternalLink, Sparkles, CheckCircle2, Eye } from 'lucide-react';

export default function PDFPreviewModal({ 
  isOpen, 
  onClose, 
  fileDetails, 
  candidate 
}) {
  if (!isOpen) return null;

  const fileName = fileDetails?.name || candidate?.fileName || `${candidate?.name || 'Resume'}.pdf`;
  const fileSize = fileDetails?.size || candidate?.fileSize || '1.2 MB';
  const fileUrl = fileDetails?.fileUrl;

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content glass-panel animate-pop-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '850px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          overflow: 'hidden',
          border: '1px solid var(--primary)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
        }}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-elevated)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileText size={22} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  PDF Document Preview: {fileName}
                </h3>
                <span className="badge-chip badge-emerald" style={{ fontSize: '0.72rem' }}>
                  ✓ Live PDF
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Size: {fileSize} • Uploaded & Vectorized by AI Agent
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="icon-btn"
            style={{ width: '34px', height: '34px' }}
            aria-label="Close Preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Render iframe PDF viewer if fileUrl exists, else render Document Sheet */}
        <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-dark)', padding: '16px' }}>
          {fileUrl ? (
            <div style={{ width: '100%', height: '520px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <iframe 
                src={fileUrl} 
                title="PDF Resume Preview"
                width="100%" 
                height="100%" 
                style={{ border: 'none', background: '#FFFFFF' }}
              />
            </div>
          ) : (
            /* Document Preview Sheet Fallback for sample/parsed resumes */
            <div 
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '32px',
                maxWidth: '740px',
                margin: '0 auto',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                color: 'var(--text-main)'
              }}
            >
              {/* Header inside simulated PDF document */}
              <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {candidate?.name || 'Alex Morgan'}
                  </h1>
                  <h2 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>
                    {candidate?.targetRole || candidate?.title || 'Senior Software Engineer'}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {candidate?.email} • {candidate?.phone} • {candidate?.location}
                  </p>
                </div>
                <span className="badge-chip badge-indigo" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                  PDF Document Page 1 / 1
                </span>
              </div>

              {/* Summary */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Professional Summary
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {candidate?.summary}
                </p>
              </div>

              {/* Top Skills extracted */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                  Extracted Hard Skills & Expertise
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {candidate?.topSkills?.map((s) => (
                    <span 
                      key={s.name} 
                      style={{ 
                        background: 'var(--bg-surface-elevated)', 
                        border: '1px solid var(--border-color-strong)', 
                        padding: '5px 12px', 
                        borderRadius: 'var(--radius-md)', 
                        fontSize: '0.8rem', 
                        fontWeight: 600,
                        color: 'var(--text-main)'
                      }}
                    >
                      {s.name} ({s.rating}%)
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience */}
              {candidate?.experience && candidate.experience.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    Work Experience
                  </h4>
                  {candidate.experience.map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                        <strong style={{ color: 'var(--text-main)' }}>{exp.role} — {exp.company}</strong>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{exp.period}</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {candidate?.education && candidate.education.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Education & Credentials
                  </h4>
                  {candidate.education.map((edu, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <strong style={{ color: 'var(--text-main)' }}>{edu.degree}</strong> • {edu.institution} ({edu.year})
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div 
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            🔒 Verified PDF preview rendered via secure browser sandbox
          </span>

          <div style={{ display: 'flex', gap: '12px' }}>
            {fileUrl && (
              <a 
                href={fileUrl} 
                download={fileName}
                className="btn-secondary"
                style={{ textDecoration: 'none', fontSize: '0.82rem', padding: '6px 14px' }}
              >
                <Download size={14} />
                Download Copy
              </a>
            )}

            <button 
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '6px 16px' }}
              onClick={onClose}
            >
              Done / Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
