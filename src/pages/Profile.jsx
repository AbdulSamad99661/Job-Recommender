import React from 'react';
import { 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

export default function Profile({ currentResume }) {
  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      {/* Top Banner Card */}
      <div className="profile-banner-card">
        <div className="profile-banner-header">
          <div className="profile-user-info">
            <div className="user-avatar profile-avatar">
              {currentResume.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="profile-user-details">
              <div className="profile-name-row">
                <h1 className="profile-name">
                  {currentResume.name}
                </h1>
                <span className="badge-chip badge-emerald profile-verified-badge">
                  <CheckCircle2 size={12} />
                  Parsed & Verified
                </span>
              </div>
              <p className="profile-title">
                {currentResume.title}
              </p>
              
              <div className="profile-contact-list">
                <span className="profile-contact-item">
                  <Mail size={14} /> {currentResume.email}
                </span>
                <span className="profile-contact-item">
                  <Phone size={14} /> {currentResume.phone}
                </span>
                <span className="profile-contact-item">
                  <MapPin size={14} /> {currentResume.location}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-exp-badge">
            <span className="profile-exp-label">Experience Level</span>
            <strong className="profile-exp-value">{currentResume.experienceLevel}</strong>
          </div>
        </div>

        <div className="profile-summary-box">
          <h4 className="profile-summary-heading">
            Executive Summary:
          </h4>
          <p className="profile-summary-text">
            {currentResume.summary}
          </p>
        </div>
      </div>

      {/* Main Grid: Skills & Experience + Skill Gap Insights */}
      <div className="profile-grid">
        {/* Left Side: Parsed Skills & History */}
        <div className="profile-main-content">
          {/* Skills Breakdown */}
          <div className="profile-card">
            <h3 className="profile-card-title">
              <Sparkles size={18} color="var(--accent-cyan)" />
              Extracted Technical Taxonomy
            </h3>

            <div className="profile-skills-list">
              {currentResume.topSkills.map((skill) => (
                <div key={skill.name} className="profile-skill-item">
                  <div className="profile-skill-header">
                    <span className="profile-skill-name">{skill.name}</span>
                    <span className="profile-skill-meta">{skill.category} • {skill.rating}%</span>
                  </div>
                  <div className="profile-skill-bar-track">
                    <div 
                      className="profile-skill-bar-fill"
                      style={{ 
                        width: `${skill.rating}%`, 
                        background: skill.rating > 90 
                          ? 'linear-gradient(90deg, #10B981, #34D399)' 
                          : 'linear-gradient(90deg, #6366F1, #0EA5E9)'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div className="profile-card">
            <h3 className="profile-card-title">
              <Briefcase size={18} color="var(--primary)" />
              Work History
            </h3>

            <div className="profile-experience-list">
              {currentResume.experience.map((exp, idx) => (
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
          </div>

          {/* Education */}
          <div className="profile-card">
            <h3 className="profile-card-title">
              <GraduationCap size={18} color="var(--accent-emerald)" />
              Education & Certification
            </h3>

            <div className="profile-education-list">
              {currentResume.education.map((edu, idx) => (
                <div key={idx} className="profile-education-item">
                  <div className="profile-education-details">
                    <h4 className="profile-education-degree">{edu.degree}</h4>
                    <p className="profile-education-institution">{edu.institution}</p>
                    <span className="badge-chip badge-emerald profile-education-badge">
                      {edu.honors}
                    </span>
                  </div>
                  <span className="mono-font profile-education-year">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: AI Feedback & Skill Gap Analysis */}
        <div className="profile-sidebar-content">
          <div className="profile-card">
            <div className="profile-booster-header">
              <TrendingUp size={20} color="var(--accent-emerald)" />
              <h3 className="profile-booster-title">AI Match Booster</h3>
            </div>

            <p className="profile-booster-sub">
              Suggested improvements to elevate your candidate match score from 88% to 98%:
            </p>

            <div className="profile-booster-tips">
              {currentResume.insights.matchScoreBoosters.map((tip, idx) => (
                <div key={idx} className="profile-booster-tip-item">
                  💡 {tip}
                </div>
              ))}
            </div>

            <div className="profile-strengths-box">
              <h4 className="profile-strengths-heading">
                Key Strength Drivers:
              </h4>
              <div className="profile-strengths-chips">
                {currentResume.insights.strengthAreas.map((area) => (
                  <span key={area} className="badge-chip badge-indigo profile-strength-chip">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

