import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  Sparkles, 
  ChevronDown, 
  CheckCircle2, 
  Zap, 
  Sun, 
  Moon
} from 'lucide-react';

export default function Navbar({ 
  onMenuToggle, 
  currentResume, 
  onSelectSampleResume,
  theme,
  onToggleTheme
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Mobile Hamburger Button - HIDDEN on Laptop/Desktop, VISIBLE on Mobile/Tablet */}
        <button 
          className="icon-btn mobile-hamburger-btn" 
          onClick={onMenuToggle}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* System Status Pill */}
        <div className="badge-chip badge-indigo system-status-pill">
          <Sparkles size={14} color="var(--primary)" />
          <span>n8n + Node.js Agent Engine: Ready</span>
        </div>
      </div>

      <div className="navbar-actions">
        {/* Day / Night Mode Toggle Button */}
        <button 
          className="icon-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun size={19} color="#FBBF24" />
          ) : (
            <Moon size={19} color="#6366F1" />
          )}
        </button>

        {/* Notifications Button */}
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="notif-badge"></span>
          </button>

          {showNotifications && (
            <div 
              className="glass-panel animate-pop-in notif-dropdown"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>Recent Agent Alerts</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', cursor: 'pointer' }}>Mark read</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.82rem', padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-elevated)' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>96% Semantic Match Found!</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>Nexus AI Labs posted a Senior AI Engineer position in Bangalore.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', fontSize: '0.82rem', padding: '10px', borderRadius: '8px', background: 'var(--bg-surface-elevated)' }}>
                  <Zap size={16} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>CV Skill Extraction Complete</strong>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>14 technical skills extracted from parsed resume.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <div 
            className="user-profile-menu"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="user-avatar">
              {currentResume.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="user-profile-info">
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {currentResume.name}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Active Profile
              </span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </div>

          {showProfileMenu && (
            <div 
              className="glass-panel animate-pop-in profile-dropdown"
            >
              <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '10px' }}>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Switch Active Demo Candidate:</p>
              </div>

              <button 
                className="sample-cv-btn"
                style={{ width: '100%', textWrap: 'wrap', textAlign: 'left', marginBottom: '8px' }}
                onClick={() => {
                  onSelectSampleResume('default');
                  setShowProfileMenu(false);
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>Alex Morgan</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>Senior Full-Stack & AI Engineer</div>
              </button>

              <button 
                className="sample-cv-btn"
                style={{ width: '100%', textWrap: 'wrap', textAlign: 'left' }}
                onClick={() => {
                  onSelectSampleResume('aiDataSpecialist');
                  setShowProfileMenu(false);
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>Sarah Khan</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>AI Specialist & Python Data Eng</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
