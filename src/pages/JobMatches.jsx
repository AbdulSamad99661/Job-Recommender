import React, { useState } from 'react';
import JobCard from '../components/JobCard';
import SkeletonJobCard from '../components/SkeletonJobCard';
import { 
  Sparkles, 
  RefreshCw, 
  SlidersHorizontal,
  SearchX,
  Search
} from 'lucide-react';

export default function JobMatches({ jobs, onApplyJob }) {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [minScore, setMinScore] = useState(70);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Toggle skeleton loading demo
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  // Filter jobs based on selected criteria
  const filteredJobs = jobs.filter((job) => {
    // Country filter
    if (selectedCountry !== 'All' && job.country !== selectedCountry) return false;
    
    // City filter
    if (selectedCity !== 'All' && job.city !== selectedCity) return false;
    
    // Job Type filter
    if (selectedType !== 'All' && job.type !== selectedType) return false;
    
    // Min Score filter
    if (job.matchScore < minScore) return false;
    
    // Search Query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchCity = job.city.toLowerCase().includes(q);
      const matchSkill = job.matchedSkills.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchCity && !matchSkill) return false;
    }

    return true;
  });

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="job-matches-header">
        <div>
          <div className="badge-chip badge-cyan" style={{ marginBottom: '6px' }}>
            <Sparkles size={14} color="var(--accent-cyan)" />
            AI Semantic Match Results
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Recommended Jobs ({filteredJobs.length})
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            AI-matched technical positions in Pakistan 🇵🇰 and India 🇮🇳 with explainable skill rationale
          </p>
        </div>

        <button 
          className="btn-secondary" 
          onClick={handleRefresh}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin-slow' : ''} />
          {isLoading ? 'Recalculating Scores...' : 'Refresh AI Scores'}
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="filters-bar">
        {/* Inline Search Input */}
        <div style={{ position: 'relative', width: '240px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="filter-input"
            style={{ width: '100%', paddingLeft: '36px' }}
            placeholder="Search title, skill, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Country Filter */}
        <div className="filter-group">
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Country:</label>
          <select 
            className="filter-select"
            value={selectedCountry} 
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedCity('All'); // Reset city on country change
            }}
          >
            <option value="All">All Countries (🇮🇳 & 🇵🇰)</option>
            <option value="Pakistan">Pakistan 🇵🇰</option>
            <option value="India">India 🇮🇳</option>
          </select>
        </div>

        {/* City Filter */}
        <div className="filter-group">
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>City:</label>
          <select 
            className="filter-select"
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="All">All Cities</option>
            {selectedCountry !== 'India' && (
              <>
                <option value="Karachi">Karachi 🇵🇰</option>
                <option value="Lahore">Lahore 🇵🇰</option>
                <option value="Islamabad">Islamabad 🇵🇰</option>
                <option value="Peshawar">Peshawar 🇵🇰</option>
              </>
            )}
            {selectedCountry !== 'Pakistan' && (
              <>
                <option value="Bangalore">Bangalore 🇮🇳</option>
                <option value="Mumbai">Mumbai 🇮🇳</option>
                <option value="Delhi">Delhi 🇮🇳</option>
                <option value="Hyderabad">Hyderabad 🇮🇳</option>
              </>
            )}
          </select>
        </div>

        {/* Job Type Filter */}
        <div className="filter-group">
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Work Mode:</label>
          <select 
            className="filter-select"
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Work Modes</option>
            <option value="Full-time">Full-time</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Min Score Slider */}
        <div className="filter-group" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Min Score:</label>
          <input 
            type="range" 
            min="60" 
            max="95" 
            step="5"
            value={minScore} 
            onChange={(e) => setMinScore(Number(e.target.value))}
            style={{ width: '90px', accentColor: 'var(--primary)' }}
          />
          <span className="mono-font badge-chip badge-indigo" style={{ padding: '3px 10px' }}>
            {minScore}%+
          </span>
        </div>
      </div>

      {/* Job Card List View */}
      {isLoading ? (
        <div>
          <SkeletonJobCard />
          <SkeletonJobCard />
          <SkeletonJobCard />
        </div>
      ) : filteredJobs.length > 0 ? (
        <div>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={onApplyJob} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div style={{ textAlign: 'center', padding: '56px 24px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: 'var(--text-muted)' }}>
            <SearchX size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            No Matching Jobs Found
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 24px auto' }}>
            Try adjusting your search query, country, city, or minimum match score filter settings to explore more recommendations.
          </p>
          <button 
            className="btn-secondary"
            onClick={() => {
              setSelectedCountry('All');
              setSelectedCity('All');
              setSelectedType('All');
              setMinScore(60);
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
