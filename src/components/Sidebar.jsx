import React from 'react';
import { useAuth } from '../context/AuthContext';
import AppLogo from './AppLogo';
import {
  Home,
  UploadCloud,
  Briefcase,
  Search,
  UserCheck,
  Info,
  X,
  Sparkles,
  Bookmark,
  History,
  LogIn,
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, jobCount = 0 }) {
  const { isAuthenticated, savedJobs } = useAuth();

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload Resume', icon: UploadCloud },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'matches', label: 'Job Matches', icon: Briefcase, badge: jobCount > 0 ? String(jobCount) : null },
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark, badge: savedJobs.length > 0 ? String(savedJobs.length) : null, authOnly: true },
    { id: 'history', label: 'History', icon: History, authOnly: true },
    { id: 'profile', label: 'My Profile', icon: UserCheck },
    { id: 'about', label: 'How it Works', icon: Info },
  ];

  if (!isAuthenticated) {
    navItems.splice(7, 0, { id: 'auth', label: 'Sign In', icon: LogIn });
  }

  return (
    <>
      {isOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-title">
            <div className="brand-icon">
              <AppLogo size={40} className="brand-logo-img" />
            </div>
            <div>
              <div style={{ lineHeight: 1.1, fontSize: '1.05rem', fontWeight: 800 }}>JobRecommender</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                AI Career Assistant
              </span>
            </div>
          </div>
          <button className="icon-btn mobile-close-btn" onClick={() => setIsOpen(false)} aria-label="Close Navigation Menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
              >
                <Icon size={19} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span className="badge-chip badge-cyan" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="agent-status-card">
            <div className="status-dot animate-pulse-glow"></div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} color="var(--accent-emerald)" />
                {isAuthenticated ? 'Account active' : 'Guest mode'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {isAuthenticated ? 'Jobs & history are saved' : 'Sign in to save jobs & history'}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
