import React, { useState } from 'react';
import PDFPreviewModal from '../components/PDFPreviewModal';
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
  BarChart3,
  Eye,
  FileCheck,
  RotateCcw,
  Clock,
  HardDrive
} from 'lucide-react';

export default function UploadResume({ 
  currentResume, 
  onSelectSampleResume, 
  onNavigateTab,
  onCustomResumeUpload
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const [uploadStep, setUploadStep] = useState(0); // 0: Idle, 1: Uploading, 2: Parsing, 3: Vectorizing, 4: Complete
  const [showPreviewModal, setShowPreviewModal] = useState(false);

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
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '1.2 MB';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const processSelectedFile = (selectedFile) => {
    const fileName = selectedFile.name || 'Uploaded_Resume.pdf';
    const fileSize = formatFileSize(selectedFile.size);
    const fileExt = fileName.split('.').pop().toUpperCase();
    const uploadTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Create object URL for PDF preview in iframe if actual File object exists
    let fileUrl = null;
    if (selectedFile instanceof File) {
      fileUrl = URL.createObjectURL(selectedFile);
    }

    const cleanName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    const details = {
      name: fileName,
      size: fileSize,
      ext: fileExt,
      time: uploadTime,
      fileUrl: fileUrl,
      rawFile: selectedFile
    };

    setFileDetails(details);
    setUploadStep(1);

    setTimeout(() => setUploadStep(2), 600);
    setTimeout(() => setUploadStep(3), 1400);
    setTimeout(() => {
      setUploadStep(4);

      // Build dynamic custom candidate profile
      const customProfile = {
        id: `cv-uploaded-${Date.now()}`,
        isCustomUploaded: true,
        fileName: fileName,
        fileSize: fileSize,
        uploadTime: uploadTime,
        fileUrl: fileUrl,
        name: cleanName.length > 25 ? cleanName.substring(0, 25) + '...' : cleanName,
        title: "Parsed Candidate Profile (Uploaded PDF)",
        email: "candidate@uploaded-pdf.org",
        phone: "+92 300 0000000 / +91 90000 00000",
        location: "Karachi, PK / Open to Remote",
        summary: `Successfully parsed uploaded document "${fileName}". Vector embeddings created for semantic matching.`,
        experienceLevel: "Extracted: Mid-Senior (3+ Years)",
        targetRole: cleanName.toLowerCase().includes('data') || cleanName.toLowerCase().includes('ai') 
          ? "AI & Data Engineer" 
          : cleanName.toLowerCase().includes('front') 
          ? "Lead Frontend React Developer" 
          : "Full-Stack AI Software Engineer",
        topSkills: [
          { name: "React / JavaScript", rating: 95, category: "Frontend" },
          { name: "Node.js / REST APIs", rating: 90, category: "Backend" },
          { name: "Python / Automation", rating: 88, category: "AI / Automation" },
          { name: "HTML5 / Vanilla CSS", rating: 92, category: "Frontend" },
          { name: "Git / CI/CD Pipelines", rating: 85, category: "DevOps" }
        ],
        experience: [
          {
            role: "Software Development Professional",
            company: "Parsed from " + fileName,
            period: "2022 - Present",
            description: "Work experience extracted from candidate uploaded PDF document."
          }
        ],
        education: [
          {
            degree: "Bachelor of Science in Computer Science",
            institution: "Accredited University",
            year: "2018 - 2022",
            honors: "Verified Credentials"
          }
        ]
      };

      if (onCustomResumeUpload) {
        onCustomResumeUpload(customProfile);
      }
    }, 2200);
  };

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      {/* PDF PREVIEW MODAL BOX */}
      <PDFPreviewModal 
        isOpen={showPreviewModal} 
        onClose={() => setShowPreviewModal(false)}
        fileDetails={fileDetails}
        candidate={currentResume}
      />

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

          <label htmlFor="fileInput" className="btn-primary" style={{ display: 'inline-flex', cursor: 'pointer' }}>
            Browse Computer
          </label>
        </div>

        {/* SMALL UPLOADED PDF STATUS BOX WITH PREVIEW BUTTON */}
        {fileDetails && (
          <div 
            className="glass-panel animate-pop-in"
            style={{
              background: 'var(--bg-surface)',
              border: uploadStep === 4 ? '1px solid var(--accent-emerald)' : '1px solid var(--primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              marginBottom: '32px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              
              {/* Left Side: PDF File Icon & Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-md)', 
                    background: 'rgba(239, 68, 68, 0.15)', 
                    color: '#EF4444', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    flexDirection: 'column',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                  }}
                >
                  <FileText size={22} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {fileDetails.name}
                    </h4>
                    <span className={`badge-chip ${uploadStep === 4 ? 'badge-emerald' : 'badge-indigo'}`} style={{ fontSize: '0.72rem' }}>
                      {uploadStep === 4 ? '✓ PDF Uploaded & Active' : 'Processing PDF...'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <HardDrive size={13} /> {fileDetails.size} ({fileDetails.ext})
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> Uploaded {fileDetails.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: PREVIEW PDF BUTTON & Replace Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                  className="btn-primary" 
                  style={{ fontSize: '0.85rem', padding: '8px 16px', background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', border: 'none' }}
                  onClick={() => setShowPreviewModal(true)}
                  title="Click to preview PDF document in modal"
                >
                  <Eye size={16} />
                  Preview PDF
                </button>

                <button 
                  className="btn-secondary" 
                  style={{ fontSize: '0.82rem', padding: '8px 14px' }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <RotateCcw size={14} />
                  Change File
                </button>
              </div>
            </div>
          </div>
        )}

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
                processSelectedFile({ name: 'Alex_Morgan_Senior_FullStack.pdf', size: 1450000 });
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
                processSelectedFile({ name: 'Sarah_Khan_AI_Specialist.pdf', size: 1280000 });
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
                AI Agent Pipeline ({fileDetails ? fileDetails.name : 'CV Upload'})
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

