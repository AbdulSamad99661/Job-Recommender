import React from 'react';
import {
  Sparkles,
  Briefcase,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  FolderGit2,
  UploadCloud,
  UserCircle,
} from 'lucide-react';

export default function Profile({ currentResume, onNavigateTab }) {
  if (!currentResume?.name) {
    return (
      <div className="page-container custom-scrollbar animate-fade-in">
        <div className="empty-state-card profile-empty-state">
          <div className="empty-state-icon">
            <UserCircle size={40} />
          </div>
          <h3>No Profile Yet</h3>
          <p>
            Upload your CV or use a sample profile on the Upload page. Your parsed skills, experience, and contact details will appear here.
          </p>
          <button type="button" className="btn-primary" onClick={() => onNavigateTab?.('upload')}>
            <UploadCloud size={16} /> Upload Resume
          </button>
        </div>
      </div>
    );
  }

  const resumeName = currentResume.name;
  const resumeTitle = currentResume.title || '—';
  const resumeEmail = currentResume.email || '—';
  const resumePhone = currentResume.phone || '—';
  const resumeLocation = currentResume.location || '—';
  const experienceLevel = currentResume.experienceLevel || '—';
  const summary = currentResume.summary || 'No summary extracted from your CV yet.';

  const topSkills = currentResume.topSkills || [];
  const experience = currentResume.experience || [];
  const projects = currentResume.projects || [];
  const education = currentResume.education || [];
  const matchScoreBoosters = currentResume.insights?.matchScoreBoosters || [];
  const strengthAreas = currentResume.insights?.strengthAreas || [];

  const avatarInitials = resumeName.length >= 2
    ? resumeName.substring(0, 2).toUpperCase()
    : 'CV';

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="profile-banner-card">
        <div className="profile-banner-header">
          <div className="profile-user-info">
            <div className="user-avatar profile-avatar">
              {avatarInitials}
            </div>
            <div className="profile-user-details">
              <div className="profile-name-row">
                <h1 className="profile-name">{resumeName}</h1>
                <span className="badge-chip badge-emerald profile-verified-badge">
                  <CheckCircle2 size={12} />
                  CV Parsed & Verified
                </span>
              </div>
              <p className="profile-title">{resumeTitle}</p>

              <div className="profile-contact-list">
                <span className="profile-contact-item">
                  <Mail size={14} /> {resumeEmail}
                </span>
                <span className="profile-contact-item">
                  <Phone size={14} /> {resumePhone}
                </span>
                <span className="profile-contact-item">
                  <MapPin size={14} /> {resumeLocation}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-exp-badge">
            <span className="profile-exp-label">Experience</span>
            <strong className="profile-exp-value">{experienceLevel}</strong>
          </div>
        </div>

        <div className="profile-summary-box">
          <h4 className="profile-summary-heading">Executive Summary / Career Objective:</h4>
          <p className="profile-summary-text">{summary}</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-main-content">
          <div className="profile-card">
            <h3 className="profile-card-title">
              <Sparkles size={18} color="var(--accent-cyan)" />
              Extracted Skills & Competencies
            </h3>

            {topSkills.length > 0 ? (
              <div className="profile-skills-list">
                {topSkills.map((skill, idx) => {
                  const sName = typeof skill === 'string' ? skill : (skill.name || `Skill ${idx + 1}`);
                  const sCategory = typeof skill === 'string' ? 'Professional Skill' : (skill.category || 'Skill');
                  const sRating = typeof skill === 'string' ? 90 : (skill.rating || 90);

                  return (
                    <div key={`${sName}_${idx}`} className="profile-skill-item">
                      <div className="profile-skill-header">
                        <span className="profile-skill-name">{sName}</span>
                        <span className="profile-skill-meta">{sCategory} • {sRating}%</span>
                      </div>
                      <div className="profile-skill-bar-track">
                        <div
                          className="profile-skill-bar-fill"
                          style={{
                            width: `${sRating}%`,
                            background: sRating > 90
                              ? 'linear-gradient(90deg, #10B981, #34D399)'
                              : 'linear-gradient(90deg, #6366F1, #0EA5E9)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="profile-empty-section">No skills extracted yet.</p>
            )}
          </div>

          <div className="profile-card">
            <h3 className="profile-card-title">
              <Briefcase size={18} color="var(--primary)" />
              Work History
            </h3>

            {experience.length > 0 ? (
              <div className="profile-experience-list">
                {experience.map((exp, idx) => (
                  <div key={idx} className="profile-experience-item">
                    <div className="profile-experience-header">
                      <h4 className="profile-experience-role">{exp.role}</h4>
                      <span className="mono-font profile-experience-period">{exp.period}</span>
                    </div>
                    <div className="profile-experience-company">{exp.company}</div>
                    <p className="profile-experience-desc">{exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="profile-empty-section">No work history found on your CV.</p>
            )}
          </div>

          {projects.length > 0 && (
            <div className="profile-card">
              <h3 className="profile-card-title">
                <FolderGit2 size={18} color="var(--accent-cyan)" />
                Key Projects & Accomplishments
              </h3>

              <div className="profile-experience-list">
                {projects.map((proj, idx) => (
                  <div key={idx} className="profile-experience-item">
                    <h4 className="profile-experience-role" style={{ fontSize: '1rem', color: 'var(--text-main)' }}>
                      {proj.title}
                    </h4>
                    <p className="profile-experience-desc" style={{ marginTop: '4px' }}>{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="profile-card">
            <h3 className="profile-card-title">
              <GraduationCap size={18} color="var(--accent-emerald)" />
              Education & Honors
            </h3>

            {education.length > 0 ? (
              <div className="profile-education-list">
                {education.map((edu, idx) => (
                  <div key={idx} className="profile-education-item">
                    <div className="profile-education-details">
                      <h4 className="profile-education-degree">{edu.degree}</h4>
                      <p className="profile-education-institution">{edu.institution}</p>
                      {edu.honors && (
                        <span className="badge-chip badge-emerald profile-education-badge">
                          {edu.honors}
                        </span>
                      )}
                    </div>
                    <span className="mono-font profile-education-year">{edu.year}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="profile-empty-section">No education details found on your CV.</p>
            )}
          </div>
        </div>

        <div className="profile-sidebar-content">
          <div className="profile-card">
            <div className="profile-booster-header">
              <TrendingUp size={20} color="var(--accent-emerald)" />
              <h3 className="profile-booster-title">AI Match Booster</h3>
            </div>

            {matchScoreBoosters.length > 0 ? (
              <>
                <p className="profile-booster-sub">
                  Suggested improvements to elevate your match score:
                </p>
                <div className="profile-booster-tips">
                  {matchScoreBoosters.map((tip, idx) => (
                    <div key={idx} className="profile-booster-tip-item">
                      💡 {tip}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="profile-empty-section">Upload a CV to get personalized match tips.</p>
            )}

            {strengthAreas.length > 0 && (
              <div className="profile-strengths-box">
                <h4 className="profile-strengths-heading">Key Strength Drivers:</h4>
                <div className="profile-strengths-chips">
                  {strengthAreas.map((area, idx) => {
                    const areaName = typeof area === 'string' ? area : (area.name || `Strength ${idx + 1}`);
                    return (
                      <span key={`${areaName}_${idx}`} className="badge-chip badge-indigo profile-strength-chip">
                        {areaName}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
