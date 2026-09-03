import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UPLOAD_PRIORITY_LOCATIONS, OTHER_COUNTRIES, DEFAULT_SEARCH_LOCATION } from '../data/searchCountries';
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
  Save,
  Loader2,
  Settings,
} from 'lucide-react';

export default function Profile({ currentResume, onNavigateTab }) {
  const { user, profile, isAuthenticated, updateProfileSettings, loading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [defaultCountry, setDefaultCountry] = useState(DEFAULT_SEARCH_LOCATION);
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || user?.displayName || '');
      setDefaultCountry(profile.defaultCountry || DEFAULT_SEARCH_LOCATION);
      setTargetRole(profile.targetRole || 'Software Engineer');
    }
  }, [profile, user]);

  const handleSaveAccount = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg(null);
    try {
      await updateProfileSettings({
        displayName: displayName.trim(),
        defaultCountry,
        targetRole: targetRole.trim(),
        email: user?.email || profile?.email || '',
      });
      setSaveMsg('Profile saved successfully.');
    } catch (err) {
      setSaveMsg(err.message || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated && !loading) {
    return (
      <div className="page-container custom-scrollbar animate-fade-in">
        <div className="empty-state-card profile-empty-state">
          <UserCircle size={40} />
          <h3>Sign in for your profile</h3>
          <p>Create an account to save your settings, jobs, and activity history. You can still upload a CV as a guest.</p>
          <button type="button" className="btn-primary" onClick={() => onNavigateTab?.('auth')}>
            Sign In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  const resumeName = currentResume?.name || profile?.displayName || user?.displayName || 'Your Profile';
  const resumeTitle = currentResume?.title || profile?.targetRole || '—';
  const resumeEmail = currentResume?.email || user?.email || profile?.email || '—';
  const resumePhone = currentResume?.phone || '—';
  const resumeLocation = currentResume?.location || profile?.defaultCountry || '—';
  const experienceLevel = currentResume?.experienceLevel || '—';
  const summary = currentResume?.summary || 'Upload a CV to extract your executive summary, or update your account settings below.';

  const topSkills = currentResume?.topSkills || [];
  const experience = currentResume?.experience || [];
  const projects = currentResume?.projects || [];
  const education = currentResume?.education || [];
  const matchScoreBoosters = currentResume?.insights?.matchScoreBoosters || [];
  const strengthAreas = currentResume?.insights?.strengthAreas || [];

  const avatarInitials = resumeName.length >= 2 ? resumeName.substring(0, 2).toUpperCase() : 'CV';

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="profile-account-card glass-panel">
        <h3 className="profile-card-title"><Settings size={18} /> Account Settings</h3>
        <form className="profile-account-form" onSubmit={handleSaveAccount}>
          <div className="profile-account-grid">
            <label className="auth-field">
              <span>Display name</span>
              <input className="filter-input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label>
            <label className="auth-field">
              <span>Email</span>
              <input className="filter-input" value={user?.email || ''} disabled />
            </label>
            <label className="auth-field">
              <span>Default country</span>
              <select className="filter-select" value={defaultCountry} onChange={(e) => setDefaultCountry(e.target.value)}>
                {UPLOAD_PRIORITY_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.label}</option>
                ))}
                <optgroup label="Other countries">
                  {OTHER_COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </optgroup>
              </select>
            </label>
            <label className="auth-field">
              <span>Target role</span>
              <input className="filter-input" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
            </label>
          </div>
          {saveMsg && <p className="profile-save-msg">{saveMsg}</p>}
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? <><Loader2 size={16} className="animate-spin-slow" /> Saving…</> : <><Save size={16} /> Save Account</>}
          </button>
        </form>
      </div>

      {!currentResume?.name ? (
        <div className="empty-state-card profile-empty-state" style={{ marginTop: '20px' }}>
          <UploadCloud size={32} />
          <h3>No CV parsed yet</h3>
          <p>Upload your resume to see extracted skills, experience, and education here.</p>
          <button type="button" className="btn-secondary" onClick={() => onNavigateTab?.('upload')}>
            Upload Resume
          </button>
        </div>
      ) : (
        <>
          <div className="profile-banner-card">
            <div className="profile-banner-header">
              <div className="profile-user-info">
                <div className="user-avatar profile-avatar">{avatarInitials}</div>
                <div className="profile-user-details">
                  <div className="profile-name-row">
                    <h1 className="profile-name">{resumeName}</h1>
                    <span className="badge-chip badge-emerald profile-verified-badge">
                      <CheckCircle2 size={12} /> CV Parsed & Verified
                    </span>
                  </div>
                  <p className="profile-title">{resumeTitle}</p>
                  <div className="profile-contact-list">
                    <span className="profile-contact-item"><Mail size={14} /> {resumeEmail}</span>
                    <span className="profile-contact-item"><Phone size={14} /> {resumePhone}</span>
                    <span className="profile-contact-item"><MapPin size={14} /> {resumeLocation}</span>
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
                <h3 className="profile-card-title"><Sparkles size={18} color="var(--accent-cyan)" /> Extracted Technical Taxonomy & Skills</h3>
                {topSkills.length > 0 ? (
                  <div className="profile-skills-list">
                    {topSkills.map((skill, idx) => {
                      const sName = typeof skill === 'string' ? skill : (skill.name || `Skill ${idx + 1}`);
                      const sCategory = typeof skill === 'string' ? 'Technical Skill' : (skill.category || 'Skill');
                      const sRating = typeof skill === 'string' ? 90 : (skill.rating || 90);
                      return (
                        <div key={`${sName}_${idx}`} className="profile-skill-item">
                          <div className="profile-skill-header">
                            <span className="profile-skill-name">{sName}</span>
                            <span className="profile-skill-meta">{sCategory} • {sRating}%</span>
                          </div>
                          <div className="profile-skill-bar-track">
                            <div className="profile-skill-bar-fill" style={{ width: `${sRating}%` }} />
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
                <h3 className="profile-card-title"><Briefcase size={18} color="var(--primary)" /> Work History</h3>
                {experience.length > 0 ? experience.map((exp, idx) => (
                  <div key={idx} className="profile-experience-item">
                    <div className="profile-experience-header">
                      <h4 className="profile-experience-role">{exp.role}</h4>
                      <span className="mono-font profile-experience-period">{exp.period}</span>
                    </div>
                    <div className="profile-experience-company">{exp.company}</div>
                    <p className="profile-experience-desc">{exp.description}</p>
                  </div>
                )) : <p className="profile-empty-section">No work history found on your CV.</p>}
              </div>
            </div>

            <div className="profile-sidebar-content">
              <div className="profile-card">
                <div className="profile-booster-header">
                  <TrendingUp size={20} color="var(--accent-emerald)" />
                  <h3 className="profile-booster-title">AI Match Booster</h3>
                </div>
                {matchScoreBoosters.length > 0 ? matchScoreBoosters.map((tip, idx) => (
                  <div key={idx} className="profile-booster-tip-item">💡 {tip}</div>
                )) : <p className="profile-empty-section">Upload a CV to get personalized match tips.</p>}
                {strengthAreas.length > 0 && (
                  <div className="profile-strengths-box">
                    <h4 className="profile-strengths-heading">Key Strength Drivers:</h4>
                    <div className="profile-strengths-chips">
                      {strengthAreas.map((area, idx) => {
                        const areaName = typeof area === 'string' ? area : (area.name || `Strength ${idx + 1}`);
                        return <span key={`${areaName}_${idx}`} className="badge-chip badge-indigo profile-strength-chip">{areaName}</span>;
                      })}
                    </div>
                  </div>
                )}
              </div>

              {education.length > 0 && (
                <div className="profile-card">
                  <h3 className="profile-card-title"><GraduationCap size={18} color="var(--accent-emerald)" /> Education</h3>
                  {education.map((edu, idx) => (
                    <div key={idx} className="profile-education-item">
                      <h4 className="profile-education-degree">{edu.degree}</h4>
                      <p className="profile-education-institution">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              )}

              {projects.length > 0 && (
                <div className="profile-card">
                  <h3 className="profile-card-title"><FolderGit2 size={18} color="var(--accent-cyan)" /> Projects</h3>
                  {projects.map((proj, idx) => (
                    <div key={idx} className="profile-experience-item">
                      <h4 className="profile-experience-role">{proj.title}</h4>
                      <p className="profile-experience-desc">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
