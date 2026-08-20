import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import SkeletonJobCard from '../components/SkeletonJobCard';
import ErrorBanner from '../components/ErrorBanner';
import { searchJobsBySkill, ApiError } from '../services/api';
import { formatJobsFromResponse } from '../utils/formatJobs';
import {
  Search,
  MapPin,
  Sparkles,
  Loader2,
  Briefcase,
} from 'lucide-react';

const LOCATIONS = [
  { id: 'Dubai', label: 'Dubai 🇦🇪' },
  { id: 'Pakistan', label: 'Pakistan 🇵🇰' },
  { id: 'India', label: 'India 🇮🇳' },
];

const QUICK_SKILLS = ['Python', 'Civil Engineer', 'Registered Nurse', 'Mechanical Engineer', 'Accountant', 'Data Analyst', 'Pharmacist', 'Project Manager'];

const DATA_SOURCE_LABELS = {
  rapidapi: 'Live listings via RapidAPI',
  openai_generated: 'AI-generated (no live listings found)',
};

export default function SearchJobs({ onApplyJob }) {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('Dubai');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [lastSearch, setLastSearch] = useState(null);

  const handleSearch = async (e) => {
    e?.preventDefault();
    const query = skill.trim();
    if (query.length < 2) {
      setError({ title: 'Enter a skill', message: 'Type a skill or role — e.g. Civil Engineer, Nursing, Python, Accountant.', type: 'warning' });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchJobsBySkill(query, location);
      const formatted = formatJobsFromResponse(response, location, query);
      setJobs(formatted);
      setDataSource(response.data_source || null);
      setLastSearch({ skill: query, location });

      if (formatted.length === 0) {
        setError({
          title: 'No Jobs Found',
          message: `No live jobs above 30% match for "${query}" in ${location}. Try another skill or location.`,
          type: 'warning',
        });
      }
    } catch (err) {
      const isApiError = err instanceof ApiError;
      setJobs([]);
      setError({
        title: isApiError ? 'Search Failed' : 'Connection Error',
        message: err.message,
        details: isApiError ? err.details : undefined,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyQuickSkill = (quickSkill) => {
    setSkill(quickSkill);
  };

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="upload-page-header">
        <div className="badge-chip badge-cyan" style={{ marginBottom: '8px' }}>
          <Search size={14} color="var(--accent-cyan)" />
          Live Skill Search
        </div>
        <h1>Search Jobs by Skill</h1>
        <p>Find live jobs in India, Pakistan, or Dubai — no CV upload needed.</p>
      </div>

      <form className="search-jobs-form glass-panel" onSubmit={handleSearch}>
        <div className="search-jobs-input-wrap">
          <Search size={18} className="search-jobs-input-icon" />
          <input
            type="text"
            className="filter-input search-jobs-input"
            placeholder="e.g. Civil Engineer, Nursing, Python, Accountant, Pharmacist"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="search-jobs-locations">
          <span className="search-jobs-label">
            <MapPin size={14} /> Location
          </span>
          <div className="search-location-pills">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                className={`location-pill ${location === loc.id ? 'active' : ''}`}
                onClick={() => setLocation(loc.id)}
                disabled={isLoading}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        <div className="search-quick-skills">
          <span className="search-jobs-label">Popular skills</span>
          <div className="quick-skill-chips">
            {QUICK_SKILLS.map((s) => (
              <button
                key={s}
                type="button"
                className="quick-skill-chip"
                onClick={() => applyQuickSkill(s)}
                disabled={isLoading}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary search-jobs-submit" disabled={isLoading || skill.trim().length < 2}>
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin-slow" /> Searching live jobs…
            </>
          ) : (
            <>
              <Sparkles size={18} /> Search Live Jobs
            </>
          )}
        </button>
      </form>

      {error && (
        <ErrorBanner
          type={error.type || 'error'}
          title={error.title}
          message={error.message}
          details={error.details}
          onDismiss={() => setError(null)}
        />
      )}

      {lastSearch && !isLoading && jobs.length > 0 && (
        <div className="search-results-header">
          <h2>
            <Briefcase size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
            {jobs.length} jobs for &ldquo;{lastSearch.skill}&rdquo; in {lastSearch.location}
          </h2>
          {dataSource && DATA_SOURCE_LABELS[dataSource] && (
            <p className="search-results-meta">{DATA_SOURCE_LABELS[dataSource]} · 30%+ match</p>
          )}
        </div>
      )}

      {isLoading && (
        <div className="matches-loading-block">
          <p className="matches-loading-text">Querying Indeed, LinkedIn & Glassdoor via RapidAPI…</p>
          <SkeletonJobCard />
          <SkeletonJobCard />
          <SkeletonJobCard />
        </div>
      )}

      {!isLoading && jobs.length > 0 && (
        <div className="search-results-list">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={onApplyJob} />
          ))}
        </div>
      )}

      {!isLoading && jobs.length === 0 && !error && !lastSearch && (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Search size={32} />
          </div>
          <h3>Search by Skill</h3>
          <p>Enter a skill or job title — e.g. <strong>Civil Engineer</strong>, <strong>Nursing</strong>, or <strong>Accountant</strong> — and pick a location.</p>
        </div>
      )}
    </div>
  );
}
