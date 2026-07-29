import React, { useState, useEffect } from 'react';
import SplashLoader from './components/SplashLoader';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ApplyModal from './components/ApplyModal';

import HomeDashboard from './pages/HomeDashboard';
import UploadResume from './pages/UploadResume';
import JobMatches from './pages/JobMatches';
import Profile from './pages/Profile';
import About from './pages/About';

import { MOCK_JOBS } from './data/mockJobs';
import { SAMPLE_RESUMES } from './data/mockResume';

import './styles/main.css';
import './styles/dashboard.css';
import './styles/animations.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [resumeKey, setResumeKey] = useState('default');
  const [selectedApplyJob, setSelectedApplyJob] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Day / Night Theme State ('dark' | 'light')
  const [theme, setTheme] = useState('dark');

  // Synchronize data-theme attribute on document documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const currentResume = SAMPLE_RESUMES[resumeKey];

  return (
    <div className="app-container" data-theme={theme}>
      {/* One-Time Animated Splash Screen */}
      {showSplash && (
        <SplashLoader onComplete={() => setShowSplash(false)} />
      )}

      {/* Persistent Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Navbar with Theme Toggle */}
        <Navbar 
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          currentResume={currentResume}
          onSelectSampleResume={(key) => setResumeKey(key)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Dynamic Page Views */}
        <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {activeTab === 'home' && (
            <HomeDashboard 
              currentResume={currentResume}
              jobs={MOCK_JOBS}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onApplyJob={(job) => setSelectedApplyJob(job)}
            />
          )}

          {activeTab === 'upload' && (
            <UploadResume 
              currentResume={currentResume}
              onSelectSampleResume={(key) => setResumeKey(key)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'matches' && (
            <JobMatches 
              jobs={MOCK_JOBS}
              onApplyJob={(job) => setSelectedApplyJob(job)}
            />
          )}

          {activeTab === 'profile' && (
            <Profile 
              currentResume={currentResume}
            />
          )}

          {activeTab === 'about' && (
            <About />
          )}
        </main>
      </div>

      {/* Job Application Simulation Modal */}
      {selectedApplyJob && (
        <ApplyModal 
          job={selectedApplyJob}
          candidate={currentResume}
          onClose={() => setSelectedApplyJob(null)}
        />
      )}
    </div>
  );
}
