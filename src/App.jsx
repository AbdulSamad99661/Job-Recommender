import React, { useState, useEffect, useCallback } from 'react';
import SplashLoader from './components/SplashLoader';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ApplyModal from './components/ApplyModal';
import ErrorBanner from './components/ErrorBanner';

import HomeDashboard from './pages/HomeDashboard';
import UploadResume from './pages/UploadResume';
import JobMatches from './pages/JobMatches';
import Profile from './pages/Profile';
import About from './pages/About';

import { SAMPLE_RESUMES } from './data/mockResume';
import { getJobRecommendations, checkBackendHealth, ApiError } from './services/api';

import './styles/main.css';
import './styles/dashboard.css';
import './styles/animations.css';

function formatJobsFromResponse(response, location, role) {
  if (!response?.jobs?.length) return [];
  return response.jobs.map((j, idx) => ({
    id: j.id || j.job_id || `job_${idx}`,
    title: j.title || `${role} - ${location}`,
    company: j.company || 'Top Employer',
    city: j.city || j.location || location,
    country: j.country || (location === 'Remote' ? 'Remote' : location),
    location: j.location || location,
    type: j.is_remote ? 'Remote' : 'Full-time',
    salary: j.salary || 'Competitive Salary',
    postedDate: j.posted_time_ago || j.posted_date || 'Recently',
    matchScore: typeof j.match_score === 'number' ? j.match_score : (typeof j.matchScore === 'number' ? j.matchScore : 50),
    rationale: j.explanation?.why_matched || j.whyMatched || `Candidate skill evaluation for ${location}.`,
    matchedSkills: j.explanation?.matching_skills || j.matchedSkills || [],
    missingSkills: j.explanation?.missing_skills || j.missingSkills || [],
    applyLink: j.apply_link || j.job_apply_link || 'https://linkedin.com',
    recommendation: j.explanation?.recommendation || 'High recommendation to apply.',
    source_platform: j.source_platform,
    dataSource: response.data_source,
  }));
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [resumeKey, setResumeKey] = useState('default');
  const [customResume, setCustomResume] = useState(null);
  const [selectedApplyJob, setSelectedApplyJob] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [liveJobs, setLiveJobs] = useState([]);
  const [isMatchingLoading, setIsMatchingLoading] = useState(false);
  const [matchingStep, setMatchingStep] = useState(0);
  const [activeLocation, setActiveLocation] = useState('Dubai');
  const [matchError, setMatchError] = useState(null);
  const [matchWarnings, setMatchWarnings] = useState([]);
  const [backendConfig, setBackendConfig] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

  const currentResume = customResume || SAMPLE_RESUMES[resumeKey];

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
  }, []);

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
      />

      <div className="main-wrapper">
        <Navbar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          currentResume={currentResume}
          onSelectSampleResume={handleSelectSampleResume}
          theme={theme}
          onToggleTheme={toggleTheme}
          activeTab={activeTab}
        />

        <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
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
              onNavigateTab={(tab) => setActiveTab(tab)}
              onApplyJob={(job) => setSelectedApplyJob(job)}
            />
          )}

          {activeTab === 'upload' && (
            <UploadResume
              currentResume={currentResume}
              onSelectSampleResume={handleSelectSampleResume}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onFetchJobRecommendations={handleFetchJobRecommendations}
              isMatchingLoading={isMatchingLoading}
              matchingStep={matchingStep}
            />
          )}

          {activeTab === 'matches' && (
            <JobMatches
              jobs={liveJobs}
              onApplyJob={(job) => setSelectedApplyJob(job)}
              activeLocation={activeLocation}
              isMatchingLoading={isMatchingLoading}
              dataSource={dataSource}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'profile' && (
            <Profile currentResume={currentResume} />
          )}

          {activeTab === 'about' && (
            <About />
          )}
        </main>
      </div>

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
