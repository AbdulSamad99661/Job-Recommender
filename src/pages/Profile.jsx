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
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '24px', boxShadow: 'var(--card-shadow)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div 
              className="user-avatar" 
              style={{ width: '72px', height: '72px', fontSize: '1.8rem', borderRadius: 'var(--radius-md)' }}
            >
              {currentResume.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {currentResume.name}
                </h1>
                <span className="badge-chip badge-emerald">
                  <CheckCircle2 size={12} />
                  Parsed & Verified
                </span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: 700, marginTop: '2px' }}>
                {currentResume.title}
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mail size={14} /> {currentResume.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Phone size={14} /> {currentResume.phone}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {currentResume.location}
                </span>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color-strong)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>Experience Level</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{currentResume.experienceLevel}</strong>
          </div>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            Executive Summary:
          </h4>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            {currentResume.summary}
          </p>
        </div>
      </div>

      {/* Main Grid: Skills & Experience + Skill Gap Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Left Side: Parsed Skills & History */}
        <div>
          {/* Skills Breakdown */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="var(--accent-cyan)" />
              Extracted Technical Taxonomy
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentResume.topSkills.map((skill) => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{skill.name}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{skill.category} • {skill.rating}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--bg-surface-elevated)', borderRadius: '99px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${skill.rating}%`, 
                        background: skill.rating > 90 
                          ? 'linear-gradient(90deg, #10B981, #34D399)' 
                          : 'linear-gradient(90deg, #6366F1, #0EA5E9)', 
                        borderRadius: '99px' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={18} color="var(--primary)" />
              Work History
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {currentResume.experience.map((exp, idx) => (
                <div key={idx} style={{ paddingLeft: '16px', borderLeft: '3px solid var(--primary)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>{exp.role}</h4>
                    <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '6px' }}>{exp.company}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={18} color="var(--accent-emerald)" />
              Education & Certification
            </h3>

            {currentResume.education.map((edu, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>{edu.degree}</h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{edu.institution}</p>
                  <span className="badge-chip badge-emerald" style={{ marginTop: '6px', fontSize: '0.72rem' }}>
                    {edu.honors}
                  </span>
                </div>
                <span className="mono-font" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{edu.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: AI Feedback & Skill Gap Analysis */}
        <div>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '22px', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <TrendingUp size={20} color="var(--accent-emerald)" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>AI Match Booster</h3>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.4 }}>
              Suggested improvements to elevate your candidate match score from 88% to 98%:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentResume.insights.matchScoreBoosters.map((tip, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface-elevated)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color-strong)', fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: 1.45 }}>
                  💡 {tip}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>
                Key Strength Drivers:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {currentResume.insights.strengthAreas.map((area) => (
                  <span key={area} className="badge-chip badge-indigo" style={{ fontSize: '0.74rem' }}>
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
