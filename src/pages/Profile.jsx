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
  FolderGit2
} from 'lucide-react';

export default function Profile({ currentResume }) {
  // Safe Fallbacks to prevent null/undefined runtime crashes
  const resumeName = currentResume?.name || 'BELLA TREVINO';
  const resumeTitle = currentResume?.title || 'Web Developer';
  const resumeEmail = currentResume?.email || 'bellatrevino@email.com';
  const resumePhone = currentResume?.phone || '(123) 456-7890';
  const resumeLocation = currentResume?.location || 'Chicago, IL';
  const experienceLevel = currentResume?.experienceLevel || 'Full-Stack Developer (GPA: 3.9)';
  const summary = currentResume?.summary || 'Graduate of computer science with experience working across full-stack software development. Looking for a role where I can grow and learn from experienced team members.';
  
  const topSkills = currentResume?.topSkills || [
    { name: 'JavaScript (React, Node.js)', rating: 95, category: 'Frontend & Backend' },
    { name: 'Python (Django, scikit-learn)', rating: 90, category: 'AI & Data' },
    { name: 'SQL (PostgreSQL)', rating: 92, category: 'Database' },
    { name: 'REST API Development', rating: 94, category: 'Backend' },
    { name: 'Agile & Collaboration', rating: 95, category: 'Soft Skills' }
  ];

  const experience = currentResume?.experience || [
    {
      role: 'Web Developer Intern',
      company: 'Book of the Month',
      period: 'April 2019 - September 2019 / Chicago, IL',
      description: 'Built an internal book recommendation app in React and Node.js. Partnered to architect a PostgreSQL-backed search module cutting team monthly book-logging time by 14 hours.'
    }
  ];

  const projects = currentResume?.projects || [
    {
      title: 'Social Media Scheduler (Creator)',
      desc: 'Designed a Django-and-Node scheduling tool. Trained a scikit-learn model on historical engagement data lifting post interaction rates by 23%. Grew tool to 517 monthly active users.'
    },
    {
      title: 'Computer Science Club (Co-founder)',
      desc: 'Organized weekly pair-programming sessions and curated Git workflows & REST API workshops for 37 active members.'
    }
  ];

  const education = currentResume?.education || [
    {
      degree: 'B.S. Computer Science (GPA: 3.9)',
      institution: 'University of Illinois Chicago',
      year: '2016 - 2020',
      honors: 'Cum Laude Society • Presidential Scholarship • Dean’s List (6/8 semesters)'
    }
  ];

  const matchScoreBoosters = currentResume?.insights?.matchScoreBoosters || [
    'Add production cloud deployment keywords (Docker, AWS, Vercel) to elevate match score to 98%',
    'Highlight PostgreSQL search module & REST API experience on candidate headline',
    'Include target location preferences (Dubai, India, Pakistan, Remote) in executive summary'
  ];

  const strengthAreas = currentResume?.insights?.strengthAreas || [
    'React & Node.js',
    'Python & Scikit-Learn',
    'PostgreSQL & SQL',
    'REST API Architecture'
  ];

  const avatarInitials = resumeName.length >= 2 
    ? resumeName.substring(0, 2).toUpperCase() 
    : 'CV';

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      {/* Top Banner Card */}
      <div className="profile-banner-card">
        <div className="profile-banner-header">
          <div className="profile-user-info">
            <div className="user-avatar profile-avatar">
              {avatarInitials}
            </div>
            <div className="profile-user-details">
              <div className="profile-name-row">
                <h1 className="profile-name">
                  {resumeName}
                </h1>
                <span className="badge-chip badge-emerald profile-verified-badge">
                  <CheckCircle2 size={12} />
                  CV Parsed & Verified
                </span>
              </div>
              <p className="profile-title">
                {resumeTitle}
              </p>
              
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
            <span className="profile-exp-label">Experience & GPA</span>
            <strong className="profile-exp-value">{experienceLevel}</strong>
          </div>
        </div>

        <div className="profile-summary-box">
          <h4 className="profile-summary-heading">
            Executive Summary / Career Objective:
          </h4>
          <p className="profile-summary-text">
            {summary}
          </p>
        </div>
      </div>

      {/* Main Grid: Skills, Experience, Projects & Education */}
      <div className="profile-grid">
        {/* Left Side: Parsed Skills & History */}
        <div className="profile-main-content">
          {/* Skills Breakdown */}
          <div className="profile-card">
            <h3 className="profile-card-title">
              <Sparkles size={18} color="var(--accent-cyan)" />
              Extracted Technical Taxonomy & Skills
            </h3>

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
                      <div 
                        className="profile-skill-bar-fill"
                        style={{ 
                          width: `${sRating}%`, 
                          background: sRating > 90 
                            ? 'linear-gradient(90deg, #10B981, #34D399)' 
                            : 'linear-gradient(90deg, #6366F1, #0EA5E9)'
                        }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div className="profile-card">
            <h3 className="profile-card-title">
              <Briefcase size={18} color="var(--primary)" />
              Work History
            </h3>

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
          </div>

          {/* Extracted Projects Section */}
          {projects && projects.length > 0 && (
            <div className="profile-card">
              <h3 className="profile-card-title">
                <FolderGit2 size={18} color="var(--accent-cyan)" />
                Key Projects & Technical Accomplishments
              </h3>

              <div className="profile-experience-list">
                {projects.map((proj, idx) => (
                  <div key={idx} className="profile-experience-item">
                    <h4 className="profile-experience-role" style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{proj.title}</h4>
                    <p className="profile-experience-desc" style={{ marginTop: '4px' }}>{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          <div className="profile-card">
            <h3 className="profile-card-title">
              <GraduationCap size={18} color="var(--accent-emerald)" />
              Education & Honors
            </h3>

            <div className="profile-education-list">
              {education.map((edu, idx) => (
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
              Suggested improvements to elevate candidate match score to 98%:
            </p>

            <div className="profile-booster-tips">
              {matchScoreBoosters.map((tip, idx) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}
