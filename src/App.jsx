import React, { useState, useEffect, useCallback } from 'react';
import SplashLoader from './components/SplashLoader';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ErrorBanner from './components/ErrorBanner';
import { useAuth } from './context/AuthContext';

import HomeDashboard from './pages/HomeDashboard';
import UploadResume from './pages/UploadResume';
import JobMatches from './pages/JobMatches';
import SearchJobs from './pages/SearchJobs';
import Profile from './pages/Profile';
import About from './pages/About';
import Auth from './pages/Auth';
import SavedJobs from './pages/SavedJobs';
import HistoryPage from './pages/History';

import { SAMPLE_RESUMES } from './data/mockResume';
import { DEFAULT_SEARCH_LOCATION } from './data/searchCountries';
import { getJobRecommendations, checkBackendHealth, ApiError } from './services/api';
import { formatJobsFromResponse } from './utils/formatJobs';

import './styles/main.css';
import './styles/dashboard.css';
import './styles/animations.css';

export default function App() {
  const { logHistory, profile, isAuthenticated } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [resumeKey, setResumeKey] = useState(null);
  const [customResume, setCustomResume] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [liveJobs, setLiveJobs] = useState([]);
  const [isMatchingLoading, setIsMatchingLoading] = useState(false);
  const [matchingStep, setMatchingStep] = useState(0);
  const [activeLocation, setActiveLocation] = useState('Dubai');
  const [matchError, setMatchError] = useState(null);
  const [matchWarnings, setMatchWarnings] = useState([]);
  const [backendConfig, setBackendConfig] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  const [skillSearchJobs, setSkillSearchJobs] = useState([]);
  const [skillSearchSkill, setSkillSearchSkill] = useState('');
  const [skillSearchLocation, setSkillSearchLocation] = useState(DEFAULT_SEARCH_LOCATION);
  const [skillSearchDataSource, setSkillSearchDataSource] = useState(null);
  const [skillSearchLastQuery, setSkillSearchLastQuery] = useState(null);
  const [skillSearchError, setSkillSearchError] = useState(null);
  const [isSkillSearchLoading, setIsSkillSearchLoading] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (profile?.defaultCountry) {
      setActiveLocation(profile.defaultCountry);
    }
  }, [profile?.defaultCountry]);

  useEffect(() => {
    checkBackendHealth()
      .then((health) => {
        setBackendConfig(health.config);
        if (health.setup_hints?.length) {
          setMatchWarnings(
            health.setup_hints.map((hint) => ({
              code: 'SETUP_HINT',
              message: hint,
              severity: 'warning',
            }))
          );
        }
      })
      .catch((err) => {
        setMatchError({
          title: 'Backend Offline',
          message: err.message,
          details: err.details,
          type: 'error',
        });
      });
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const currentResume = customResume || (resumeKey ? SAMPLE_RESUMES[resumeKey] : null);

  const handleSelectSampleResume = (key) => {
    setCustomResume(null);
    setResumeKey(key);
    setMatchError(null);
  };

  const handleFetchJobRecommendations = useCallback(async (pdfFile, location = 'Dubai', role = 'Software Engineer', resumeText = null) => {
    setIsMatchingLoading(true);
    setMatchingStep(1);
    setActiveLocation(location);
    setMatchError(null);
    setMatchWarnings([]);

    try {
      const response = await getJobRecommendations(
        pdfFile,
        location,
        role,
        resumeText,
        (step) => setMatchingStep(step)
      );

      if (response.config_status) {
        setBackendConfig(response.config_status);
      }

      if (response.parsed_profile) {
        setCustomResume(response.parsed_profile);
      } else if (response.candidate_contact) {
        setCustomResume((prev) => ({
          ...(prev || {}),
          name: response.candidate_contact.name || prev?.name,
          email: response.candidate_contact.email || prev?.email,
          phone: response.candidate_contact.phone || prev?.phone,
          location: response.candidate_contact.location || prev?.location || location,
        }));
      }

      if (response.warnings?.length) {
        setMatchWarnings(response.warnings);
      }

      setDataSource(response.data_source || null);

      const formatted = formatJobsFromResponse(response, location, role);
      if (formatted.length > 0) {
        setLiveJobs(formatted);
        setActiveTab('matches');
        logHistory({
          type: 'upload',
          title: 'CV uploaded & matched',
          description: `Matched ${formatted.length} jobs for ${role}`,
          location,
          jobCount: formatted.length,
        });
      } else {
        setMatchError({
          title: 'No Jobs Found',
          message: 'The backend returned zero job matches. Try a different location or check your API keys.',
          type: 'warning',
        });
      }
    } catch (err) {
      const isApiError = err instanceof ApiError;
      setMatchError({
        title: isApiError ? 'Matching Failed' : 'Connection Error',
        message: err.message,
        details: isApiError ? err.details : undefined,
        type: 'error',
      });
      setMatchingStep(0);
    } finally {
      setIsMatchingLoading(false);
    }
  }, [logHistory]);

  const navigateTab = (tab) => setActiveTab(tab);

  return (
    <div className="app-container" data-theme={theme}>
      {showSplash && (
        <SplashLoader onComplete={() => setShowSplash(false)} />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        jobCount={liveJobs.length}
        isAuthenticated={isAuthenticated}
      />

      <div className="main-wrapper">
        <Navbar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          theme={theme}
          onToggleTheme={toggleTheme}
          activeTab={activeTab}
          onNavigateTab={navigateTab}
        />

        <main>
          {matchError && activeTab !== 'about' && (
            <div className="global-alert-container">
              <ErrorBanner
                type={matchError.type || 'error'}
                title={matchError.title}
                message={matchError.message}
                details={matchError.details}
                onDismiss={() => setMatchError(null)}
              />
            </div>
          )}

          {matchWarnings.length > 0 && !matchError && (activeTab === 'upload' || activeTab === 'matches') && (
            <div className="global-alert-container">
              {matchWarnings.slice(0, 2).map((w, i) => (
                <ErrorBanner
                  key={`${w.code}-${i}`}
                  type={w.severity === 'error' ? 'error' : 'warning'}
                  title={w.code === 'SETUP_HINT' ? 'Setup Required' : w.code?.replace(/_/g, ' ')}
                  message={w.message}
                  onDismiss={w.code === 'SETUP_HINT' ? undefined : () =>
                    setMatchWarnings((prev) => prev.filter((_, idx) => idx !== i))
                  }
                />
              ))}
            </div>
          )}

          {activeTab === 'home' && (
            <HomeDashboard
              currentResume={currentResume}
              jobs={liveJobs}
              onNavigateTab={navigateTab}
            />
          )}

          {activeTab === 'upload' && (
            <UploadResume
              currentResume={currentResume}
              onSelectSampleResume={handleSelectSampleResume}
              onNavigateTab={navigateTab}
              onFetchJobRecommendations={handleFetchJobRecommendations}
              isMatchingLoading={isMatchingLoading}
              matchingStep={matchingStep}
            />
          )}

          {activeTab === 'matches' && (
            <JobMatches
              jobs={liveJobs}
              activeLocation={activeLocation}
              isMatchingLoading={isMatchingLoading}
              dataSource={dataSource}
              onNavigateTab={navigateTab}
            />
          )}

          {activeTab === 'search' && (
            <SearchJobs
              onNavigateTab={navigateTab}
              jobs={skillSearchJobs}
              setJobs={setSkillSearchJobs}
              skill={skillSearchSkill}
              setSkill={setSkillSearchSkill}
              location={skillSearchLocation}
              setLocation={setSkillSearchLocation}
              dataSource={skillSearchDataSource}
              setDataSource={setSkillSearchDataSource}
              lastSearch={skillSearchLastQuery}
              setLastSearch={setSkillSearchLastQuery}
              error={skillSearchError}
              setError={setSkillSearchError}
              isLoading={isSkillSearchLoading}
              setIsLoading={setIsSkillSearchLoading}
            />
          )}

          {activeTab === 'saved' && (
            <SavedJobs onNavigateTab={navigateTab} />
          )}

          {activeTab === 'history' && (
            <HistoryPage onNavigateTab={navigateTab} />
          )}

          {activeTab === 'profile' && (
            <Profile
              currentResume={currentResume}
              onNavigateTab={navigateTab}
            />
          )}

          {activeTab === 'auth' && (
            <Auth onNavigateTab={navigateTab} />
          )}

          {activeTab === 'about' && (
            <About />
          )}
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} JobRecommender. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
