import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sun, Moon, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AppLogo from './AppLogo';

const PAGE_TITLES = {
  home: 'Dashboard',
  upload: 'Upload Resume',
  search: 'Search Jobs',
  matches: 'Job Matches',
  saved: 'Saved Jobs',
  history: 'History',
  profile: 'My Profile',
  auth: 'Sign In',
  about: 'How It Works',
};

export default function Navbar({
  onMenuToggle,
  theme,
  onToggleTheme,
  activeTab = 'home',
  onNavigateTab,
}) {
  const { user, profile, isAuthenticated, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const displayName = profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="icon-btn mobile-hamburger-btn" onClick={onMenuToggle} aria-label="Toggle Navigation Menu">
          <Menu size={20} />
        </button>
        <AppLogo size={36} className="navbar-logo" />
        <div className="navbar-page-title">
          <h2>{PAGE_TITLES[activeTab] || 'Job Recommender'}</h2>
          <p>AI-powered resume matching</p>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="icon-btn" onClick={onToggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          {theme === 'dark' ? <Sun size={19} color="#FBBF24" /> : <Moon size={19} color="#6366F1" />}
        </button>

        {!loading && (
          isAuthenticated ? (
            <div className="navbar-user-menu" ref={menuRef}>
              <button type="button" className="navbar-user-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="navbar-user-avatar">{displayName.substring(0, 2).toUpperCase()}</div>
                <span className="navbar-user-name">{displayName}</span>
                <ChevronDown size={16} />
              </button>
              {menuOpen && (
                <div className="navbar-user-dropdown">
                  <button type="button" onClick={() => { onNavigateTab?.('profile'); setMenuOpen(false); }}>
                    <User size={16} /> My Profile
                  </button>
                  <button type="button" onClick={() => { onNavigateTab?.('saved'); setMenuOpen(false); }}>
                    Saved Jobs
                  </button>
                  <button type="button" onClick={() => { onNavigateTab?.('history'); setMenuOpen(false); }}>
                    History
                  </button>
                  <button type="button" className="danger" onClick={() => { logout(); setMenuOpen(false); onNavigateTab?.('home'); }}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button type="button" className="btn-primary navbar-signin-btn" onClick={() => onNavigateTab?.('auth')}>
              <LogIn size={16} /> Sign In
            </button>
          )
        )}
      </div>
    </header>
  );
}
