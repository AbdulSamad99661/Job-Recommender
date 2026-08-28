import React, { useState } from 'react';
import PDFPreviewModal from '../components/PDFPreviewModal';
import { SAMPLE_RESUME_TEXT } from '../data/mockResume';
import {
  UPLOAD_PRIORITY_LOCATIONS,
  OTHER_COUNTRIES,
  DEFAULT_SEARCH_LOCATION,
  OTHER_COUNTRY_IDS,
} from '../data/searchCountries';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  ArrowRight,
  Bot,
  Cpu,
  Eye,
  Clock,
  HardDrive,
  Globe,
  Loader2,
  Send,
  AlertCircle,
} from 'lucide-react';

export default function UploadResume({
  currentResume,
  onSelectSampleResume,
  onNavigateTab,
  onFetchJobRecommendations,
  isMatchingLoading,
  matchingStep = 0,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedSampleKey, setSelectedSampleKey] = useState(null);
  const [targetLocation, setTargetLocation] = useState(DEFAULT_SEARCH_LOCATION);
  const [fileError, setFileError] = useState(null);

  const isPdfFile = (file) =>
    file instanceof File &&
    (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));

  const formatFileSize = (bytes) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const storeFile = (selectedFile) => {
    setFileError(null);
    setSelectedSampleKey(null);

    if (selectedFile instanceof File && !isPdfFile(selectedFile)) {
      setFileError('Only PDF files are supported. Please upload a .pdf resume.');
      return;
    }

    const fileName = selectedFile.name || 'Uploaded_Resume.pdf';
    const fileUrl = selectedFile instanceof File ? URL.createObjectURL(selectedFile) : null;

    setFileDetails({
      name: fileName,
      size: formatFileSize(selectedFile.size),
      ext: fileName.split('.').pop()?.toUpperCase() || 'PDF',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileUrl,
      rawFile: selectedFile instanceof File ? selectedFile : null,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) storeFile(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) storeFile(e.target.files[0]);
  };

  const handleSampleSelect = (key, label) => {
    onSelectSampleResume(key);
    setSelectedSampleKey(key);
    setFileDetails(null);
    setFileError(null);
    setFileDetails({
      name: `${label.replace(/\s+/g, '_')}_Sample.pdf`,
      size: '—',
      ext: 'TXT',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileUrl: null,
      rawFile: null,
      isSample: true,
      sampleKey: key,
    });
  };

  const handleSendCvAndMatch = () => {
    if (!fileDetails) return;

    const rawFile = fileDetails.rawFile || null;
    const resumeText = fileDetails.isSample ? SAMPLE_RESUME_TEXT[fileDetails.sampleKey] : null;
    const targetRole = currentResume?.title || 'Software Developer';

    onFetchJobRecommendations(rawFile, targetLocation, targetRole, resumeText);
  };

  const canSubmit = fileDetails && !isMatchingLoading;
  const step = isMatchingLoading ? matchingStep : (fileDetails ? 1 : 0);

  const stepLabels = [
    { label: 'Document Ready', desc: 'PDF selected and ready to send to backend' },
    { label: 'Uploading & Parsing CV', desc: 'Backend extracts skills, experience, and target role' },
    { label: 'AI Profile Analysis', desc: 'OpenAI enhances parsing when API key is configured' },
    { label: 'Fetching Live Jobs', desc: 'Querying RapidAPI JSearch for real listings' },
    { label: 'Match Scores Ready', desc: 'Jobs scored and ranked for your profile' },
  ];

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="upload-container">
        <div className="page-header upload-page-header">
          <span className="badge-chip badge-indigo">
            <UploadCloud size={14} /> Resume Upload
          </span>
          <h1>Upload your CV &amp; find jobs</h1>
          <p>
            Choose a location (Dubai, Pakistan, India, Remote, or 100+ countries), upload a PDF or try a sample profile — we'll parse your skills and match you with live listings.
          </p>
        </div>

        {/* Location picker */}
        <div className="location-picker-card">
          <div className="location-picker-header">
            <label className="location-picker-label">
              <Globe size={18} color="var(--accent-cyan)" />
              Target Job Location
            </label>
            <p className="location-picker-hint">Where to search for live job listings</p>
          </div>

          <div className="search-location-pills upload-location-pills">
            {UPLOAD_PRIORITY_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                className={`location-pill ${targetLocation === loc.id ? 'active' : ''}`}
                onClick={() => setTargetLocation(loc.id)}
                disabled={isMatchingLoading}
              >
                {loc.label}
              </button>
            ))}
          </div>

          <div className="search-location-select-wrap">
            <Globe size={16} className="search-location-select-icon" />
            <select
              className="filter-input search-location-select"
              value={OTHER_COUNTRY_IDS.has(targetLocation) ? targetLocation : ''}
              onChange={(e) => {
                if (e.target.value) setTargetLocation(e.target.value);
              }}
              disabled={isMatchingLoading}
              aria-label="Select another country"
            >
              <option value="">Other countries ({OTHER_COUNTRIES.length}+)</option>
              {OTHER_COUNTRIES.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dropzone */}
        <div
          className={`dropzone-card ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <UploadCloud size={32} className="dropzone-icon" />
          <h3>Drag &amp; Drop PDF Resume Here</h3>
          <p>PDF only, up to 10 MB. Word documents are not yet supported.</p>
          <label htmlFor="file-upload" className="btn-primary" style={{ cursor: 'pointer' }}>
            <UploadCloud size={16} /> Browse PDF File
          </label>
        </div>

        {fileError && (
          <div className="upload-file-error">
            <AlertCircle size={16} />
            {fileError}
          </div>
        )}

        {/* Selected file card */}
        {fileDetails && (
          <div className="active-file-card animate-pop-in">
            <div className="active-file-inner">
              <div className="active-file-info">
                <div className="file-icon-wrap">
                  <FileText size={22} />
                </div>
                <div>
                  <div className="active-file-name-row">
                    <h4>{fileDetails.name}</h4>
                    <span className={`badge-chip ${isMatchingLoading ? 'badge-indigo' : 'badge-emerald'}`}>
                      {isMatchingLoading ? 'Processing…' : fileDetails.isSample ? 'Sample Profile' : 'Ready to Match'}
                    </span>
                  </div>
                  <div className="active-file-meta">
                    <span><HardDrive size={13} /> {fileDetails.size} ({fileDetails.ext})</span>
                    <span><Clock size={13} /> {fileDetails.time}</span>
                  </div>
                </div>
              </div>

              <div className="active-file-actions">
                <button
                  type="button"
                  className="btn-primary btn-preview"
                  onClick={() => setShowPreviewModal(true)}
                >
                  <Eye size={16} /> Preview
                </button>
                <button
                  type="button"
                  className="btn-primary btn-match"
                  onClick={handleSendCvAndMatch}
                  disabled={!canSubmit}
                >
                  {isMatchingLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin-slow" />
                      Matching… (Step {Math.min(step, 4)}/4)
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send CV &amp; Match Jobs ({targetLocation})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sample profiles */}
        <div className="sample-profiles-card">
          <div className="sample-profiles-header">
            <Bot size={20} color="var(--accent-cyan)" />
            <h4>Try Sample Profiles</h4>
            <span className="sample-hint">Sends plain-text CV to backend (no PDF needed)</span>
          </div>
          <div className="sample-profiles-grid">
            {[
              { key: 'default', name: 'Alex Morgan', desc: 'Full Stack • React & Node' },
              { key: 'bellaTrevino', name: 'Bella Trevino', desc: 'React • UI/UX' },
              { key: 'aiDataSpecialist', name: 'Sarah Khan', desc: 'AI & Python' },
            ].map(({ key, name, desc }) => (
              <button
                key={key}
                type="button"
                className={`sample-cv-btn ${selectedSampleKey === key ? 'selected' : ''}`}
                onClick={() => handleSampleSelect(key, name)}
                disabled={isMatchingLoading}
              >
                <div className="sample-name">{name}</div>
                <div className="sample-desc">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Real progress stepper — only during/after backend call */}
        {(isMatchingLoading || matchingStep >= 4) && (
          <div className="progress-stepper animate-pop-in">
            <div className="stepper-header">
              <h3><Cpu size={20} /> Backend Pipeline Progress</h3>
              <span className="badge-chip badge-indigo">
                {matchingStep >= 4 ? 'Complete' : `Step ${Math.min(matchingStep, 4)}/4`}
              </span>
            </div>

            {stepLabels.map((s, idx) => {
              const stageNum = idx + 1;
              const isActive = matchingStep >= stageNum || (stageNum === 1 && fileDetails);
              const isCurrent = isMatchingLoading && matchingStep === stageNum;
              return (
                <div key={stageNum} className={`step-item ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                  {isActive && !isCurrent ? (
                    <CheckCircle2 size={20} color="var(--accent-emerald)" />
                  ) : isCurrent ? (
                    <Loader2 size={20} className="animate-spin-slow" color="var(--primary)" />
                  ) : (
                    <CheckCircle2 size={20} color="var(--text-dim)" />
                  )}
                  <div>
                    <div className="step-label">{s.label}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              );
            })}

            {matchingStep >= 4 && !isMatchingLoading && currentResume && (
              <div className="parse-result-card animate-pop-in">
                <p className="parse-result-summary">{currentResume.summary}</p>
                <div className="parse-result-meta">
                  <span className="badge-chip badge-emerald">
                    {currentResume.topSkills?.length || 0} skills extracted
                  </span>
                  {currentResume.parseMethod && (
                    <span className="badge-chip badge-indigo">{currentResume.parseMethod}</span>
                  )}
                </div>
                <button type="button" className="btn-primary" onClick={() => onNavigateTab?.('matches')}>
                  View Job Recommendations <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <PDFPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        fileDetails={fileDetails}
        candidate={currentResume}
      />
    </div>
  );
}
