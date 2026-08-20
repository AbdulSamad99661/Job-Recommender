import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

const PAGE_TITLES = {
  home: 'Dashboard',
  upload: 'Upload Resume',
  search: 'Search Jobs',
  matches: 'Job Matches',
  profile: 'My Profile',
  about: 'How It Works',
};

export default function Navbar({
  onMenuToggle,
  theme,
  onToggleTheme,
  activeTab = 'home',
}) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="icon-btn mobile-hamburger-btn"
          onClick={onMenuToggle}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-page-title">
          <h2>{PAGE_TITLES[activeTab] || 'Job Recommender'}</h2>
          <p>AI-powered job matching for all professions</p>
        </div>
      </div>

      <div className="navbar-actions">
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
      </div>
    </header>
  );
}
