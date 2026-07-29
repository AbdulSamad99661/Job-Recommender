import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Cpu, 
  Check,
  Plus,
  Zap,
  Layers,
  BarChart3
} from 'lucide-react';

export default function UploadResume({ 
  currentResume, 
  onSelectSampleResume, 
  onNavigateTab 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadStep, setUploadStep] = useState(0); // 0: Idle, 1: Uploading, 2: Parsing, 3: Vectorizing, 4: Complete

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startSimulatedUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      startSimulatedUpload(e.target.files[0]);
    }
  };

  const startSimulatedUpload = (selectedFile) => {
    setFile(selectedFile);
    setUploadStep(1);

    setTimeout(() => setUploadStep(2), 800);
    setTimeout(() => setUploadStep(3), 1800);
    setTimeout(() => setUploadStep(4), 2800);
  };

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge-chip badge-cyan" style={{ marginBottom: '8px' }}>
            <Sparkles size={14} color="var(--accent-cyan)" />
            Core Agentic AI Workflow
          </span>
          <h1 style={{ fontSize: '1.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Upload & Analyze Your Resume
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
            Upload your CV → AI Agent extracts technical keywords → Semantic Vector Matching → Receive instant explainable job recommendations across Pakistan 🇵🇰 and India 🇮🇳.
          </p>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div 
          className={`upload-dropzone ${isDragging ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            id="fileInput" 
            accept=".pdf,.doc,.docx" 
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />

          <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <UploadCloud size={34} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            Drag & Drop your resume file here
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Supports PDF, DOCX (Max 10MB) • Automated parsing & skill matching
          </p>

          <label htmlFor="fileInput" className="btn-primary" style={{ display: 'inline-flex' }}>
            Browse Computer
          </label>
        </div>

        {/* Sample Resume Switcher for Fast Demo */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '32px', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={20} color="var(--accent-cyan)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Instant Demo? Try Pre-Loaded Resumes
              </h4>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Click to test pipeline instantly</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <button 
              className="sample-cv-btn"
              onClick={() => {
                onSelectSampleResume('default');
                startSimulatedUpload({ name: 'Alex_Morgan_Senior_FullStack.pdf' });
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem' }}>Alex Morgan (Full-Stack Engineer)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                React, Node.js, REST APIs, Python, Micro-services
              </div>
            </button>

            <button 
              className="sample-cv-btn"
              onClick={() => {
                onSelectSampleResume('aiDataSpecialist');
                startSimulatedUpload({ name: 'Sarah_Khan_AI_Specialist.pdf' });
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem' }}>Sarah Khan (AI & Data Specialist)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Python, n8n, NLP Pipelines, SQL, Model Tuning
              </div>
            </button>
          </div>
        </div>

        {/* Multi-stage Progress Tracker */}
        {uploadStep > 0 && (
          <div className="progress-stepper animate-pop-in" style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={20} color="var(--primary)" />
                AI Agent Pipeline ({file ? file.name : 'CV Upload'})
              </h3>
              <span className="mono-font badge-chip badge-indigo" style={{ padding: '4px 10px' }}>
                {uploadStep === 4 ? '100% Analysis Ready' : `Stage ${uploadStep}/4`}
              </span>
            </div>

            <div className={`step-item ${uploadStep >= 1 ? 'active' : ''}`}>
              <CheckCircle2 size={20} color={uploadStep >= 1 ? 'var(--accent-emerald)' : 'var(--text-dim)'} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem' }}>Step 1: Document Ingestion & Sanitization</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Transferring raw text to n8n orchestration agent</div>
              </div>
            </div>

            <div className={`step-item ${uploadStep >= 2 ? 'active' : ''}`}>
              <CheckCircle2 size={20} color={uploadStep >= 2 ? 'var(--accent-emerald)' : 'var(--text-dim)'} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem' }}>Step 2: Skill & Keyword Extraction</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Extracting core technical tags, work duration, and experience level</div>
              </div>
            </div>

            <div className={`step-item ${uploadStep >= 3 ? 'active' : ''}`}>
              <CheckCircle2 size={20} color={uploadStep >= 3 ? 'var(--accent-emerald)' : 'var(--text-dim)'} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem' }}>Step 3: Vector Embedding & Similarity Scoring</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mapping candidate vector against active tech jobs in PK & IN</div>
              </div>
            </div>

            <div className={`step-item ${uploadStep >= 4 ? 'active' : ''}`}>
              <CheckCircle2 size={20} color={uploadStep >= 4 ? 'var(--accent-emerald)' : 'var(--text-dim)'} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.92rem' }}>Step 4: AI Analysis & Matching Complete!</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>Matched 8 tech roles with explainable keyword scoring</div>
              </div>
            </div>

            {/* AI Agent Response Summary Card */}
            {uploadStep === 4 && (
              <div 
                className="glass-panel animate-pop-in"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  marginTop: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart3 size={20} color="var(--accent-cyan)" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      AI Agent Analysis Response for {currentResume.name}
                    </h4>
                  </div>
                  <span className="badge-chip badge-emerald" style={{ padding: '4px 12px' }}>
                    96% Highest Match
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>Target Role & Experience</div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>{currentResume.targetRole}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{currentResume.experienceLevel}</div>
                  </div>

                  <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>Top Extracted Skill Chips</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {currentResume.topSkills.slice(0, 4).map((s) => (
                        <span key={s.name} className="badge-chip badge-indigo" style={{ fontSize: '0.72rem' }}>
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    🎯 Ready to explore your top matching tech roles in Pakistan & India?
                  </span>
                  <button className="btn-primary" onClick={() => onNavigateTab('matches')}>
                    View Explainable Matches Now
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Workflow Explainer Cards */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '18px', textAlign: 'center' }}>
            How the Resume Understanding Agent Works
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '22px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <div className="badge-chip badge-indigo" style={{ marginBottom: '12px' }}>1. Extract</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>CV Analysis Agent</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Strips document layout, identifies hard technical skills, job titles, and experience metrics.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '22px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <div className="badge-chip badge-cyan" style={{ marginBottom: '12px' }}>2. Vectorize</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Semantic Embedding</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Maps candidate profile into high-dimensional vector space to find semantic job alignment beyond exact keywords.
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '22px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
              <div className="badge-chip badge-emerald" style={{ marginBottom: '12px' }}>3. Explain</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Explainable Response</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Calculates percentage scores, lists matched vs missing skills, and explains why you fit each job.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
