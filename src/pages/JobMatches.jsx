import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import SkeletonJobCard from '../components/SkeletonJobCard';
import {
  Sparkles,
  SearchX,
  Search,
  UploadCloud,
  MapPin,
} from 'lucide-react';

const DATA_SOURCE_LABELS = {
  rapidapi: 'Live listings via RapidAPI',
  openai_generated: 'AI-generated (no live listings found)',
  skill_engine_fallback: 'Skill-based fallback recommendations',
  n8n: 'Matched via automation workflow',
};

export default function JobMatches({
  jobs,
  onApplyJob,
  activeLocation = 'Dubai',
  isMatchingLoading = false,
  dataSource = null,
  onNavigateTab,
}) {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [minScore, setMinScore] = useState(50);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter((job) => {
    if (selectedCountry !== 'All' && job.country !== selectedCountry) return false;
    if (selectedCity !== 'All' && job.city !== selectedCity) return false;
    if (selectedType !== 'All' && job.type !== selectedType) return false;
    if (job.matchScore < minScore) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title?.toLowerCase().includes(q);
      const matchCompany = job.company?.toLowerCase().includes(q);
      const matchCity = job.city?.toLowerCase().includes(q);
      const matchSkill = job.matchedSkills?.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchCity && !matchSkill) return false;
    }
    return true;
  });

  const hasJobs = jobs.length > 0;
  const isFilteredEmpty = hasJobs && filteredJobs.length === 0;

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="job-matches-header">
        <div>
          <div className="badge-chip badge-cyan" style={{ marginBottom: '6px' }}>
            <Sparkles size={14} color="var(--accent-cyan)" />
            AI Semantic Match Results
          </div>
          <h1>Recommended Jobs ({isMatchingLoading ? '…' : filteredJobs.length})</h1>
          <p className="job-matches-subtitle">
            {hasJobs ? (
              <>
                <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                {' '}Matched for <strong>{activeLocation}</strong>
                {dataSource && DATA_SOURCE_LABELS[dataSource] && (
                  <> · {DATA_SOURCE_LABELS[dataSource]}</>
                )}
              </>
            ) : (
              'Upload a CV to get AI-matched job recommendations'
            )}
          </p>
        </div>
      </div>

      {/* Filters — hidden while loading with no jobs yet */}
      {(hasJobs || isMatchingLoading) && (
        <div className="filters-bar">
          <div className="filter-search-wrap">
            <Search size={16} color="var(--text-muted)" className="filter-search-icon" />
            <input
              type="text"
              className="filter-input filter-search-input"
              placeholder="Search title, skill, city…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isMatchingLoading}
            />
          </div>

          <div className="filter-group">
            <label>Country:</label>
            <select
              className="filter-select"
              value={selectedCountry}
              onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity('All'); }}
              disabled={isMatchingLoading}
            >
              <option value="All">All Locations</option>
              <option value="Dubai">Dubai 🇦🇪</option>
              <option value="Pakistan">Pakistan 🇵🇰</option>
              <option value="India">India 🇮🇳</option>
              <option value="Remote">Remote 🌐</option>
            </select>
          </div>

          <div className="filter-group">
            <label>City:</label>
            <select className="filter-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={isMatchingLoading}>
              <option value="All">All Cities</option>
              {selectedCountry !== 'India' && (
                <>
                  <option value="Karachi">Karachi 🇵🇰</option>
                  <option value="Lahore">Lahore 🇵🇰</option>
                  <option value="Islamabad">Islamabad 🇵🇰</option>
                </>
              )}
              {selectedCountry !== 'Pakistan' && (
                <>
                  <option value="Bangalore">Bangalore 🇮🇳</option>
                  <option value="Mumbai">Mumbai 🇮🇳</option>
                  <option value="Delhi">Delhi 🇮🇳</option>
                </>
              )}
            </select>
          </div>

          <div className="filter-group">
            <label>Work Mode:</label>
            <select className="filter-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} disabled={isMatchingLoading}>
              <option value="All">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="filter-group filter-score-group">
            <label>Min Score:</label>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              disabled={isMatchingLoading}
            />
            <span className="mono-font badge-chip badge-indigo">{minScore}%+</span>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isMatchingLoading && (
        <div className="matches-loading-block">
          <p className="matches-loading-text">Searching live jobs and calculating match scores…</p>
          <SkeletonJobCard />
          <SkeletonJobCard />
          <SkeletonJobCard />
        </div>
      )}

      {/* Job list */}
      {!isMatchingLoading && filteredJobs.length > 0 && (
        <div>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={onApplyJob} />
          ))}
        </div>
      )}

      {/* Empty: no jobs at all */}
      {!isMatchingLoading && !hasJobs && (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <UploadCloud size={32} />
          </div>
          <h3>No Job Matches Yet</h3>
          <p>
            Upload your PDF resume on the Upload page and click <strong>Send CV &amp; Match Jobs</strong> to get AI-powered recommendations for {activeLocation}.
          </p>
          <button type="button" className="btn-primary" onClick={() => onNavigateTab?.('upload')}>
            <UploadCloud size={16} /> Upload Resume
          </button>
        </div>
      )}

      {/* Empty: filtered out */}
      {!isMatchingLoading && isFilteredEmpty && (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <SearchX size={32} />
          </div>
          <h3>No Jobs Match Your Filters</h3>
          <p>Try lowering the minimum score or clearing your search query.</p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setSelectedCountry('All');
              setSelectedCity('All');
              setSelectedType('All');
              setMinScore(50);
              setSearchQuery('');
            }}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
