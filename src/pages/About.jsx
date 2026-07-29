import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Database, 
  Network, 
  ShieldCheck, 
  ArrowRight,
  ArrowDown
} from 'lucide-react';

export default function About() {
  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="about-wrapper">
        {/* Header */}
        <div className="about-header">
          <span className="badge-chip badge-indigo about-badge">
            <Sparkles size={14} color="var(--primary)" />
            Final Year Project • Computer Science & AI
          </span>
          <h1 className="about-title">
            Job Recommendation System
          </h1>
          <p className="about-subtitle">
            Resume Understanding with Explainable Matching — bridging job seekers and tech employers across Pakistan 🇵🇰 and India 🇮🇳.
          </p>
        </div>

        {/* 3-Step Agent Workflow Breakdown */}
        <div className="about-workflow-grid">
          <div className="about-card">
            <div className="about-card-icon icon-indigo">
              <Bot size={24} />
            </div>
            <span className="mono-font about-card-tag">AGENT 01</span>
            <h3 className="about-card-title">
              CV Analysis Agent
            </h3>
            <p className="about-card-desc">
              Parses unstructured PDF/Word resumes into structured technical taxonomy, extracting skills, experience level, education, and target job roles.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon icon-cyan">
              <Database size={24} />
            </div>
            <span className="mono-font about-card-tag">ENGINE 02</span>
            <h3 className="about-card-title">
              Vector Embedding Engine
            </h3>
            <p className="about-card-desc">
              Converts candidate skills and job descriptions into dense semantic vectors, calculating contextual similarity beyond exact keyword matching.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon icon-emerald">
              <Sparkles size={24} />
            </div>
            <span className="mono-font about-card-tag">AGENT 03</span>
            <h3 className="about-card-title">
              Explainable Matcher
            </h3>
            <p className="about-card-desc">
              Generates transparent percentage scores, lists matched vs missing skills, and explains why a candidate is suitable for a given role.
            </p>
          </div>
        </div>

        {/* System Architecture Diagram Component */}
        <div className="about-architecture-box">
          <h3 className="about-section-title">
            <Network size={20} color="var(--accent-cyan)" />
            System Architecture Overview
          </h3>
          <p className="about-section-desc">
            Multi-agent workflow orchestration powering the frontend platform.
          </p>

          <div className="architecture-flow">
            <div className="architecture-step">
              <div className="architecture-step-title">React SPA Frontend</div>
              <div className="architecture-step-sub">Dashboard & UI Layer</div>
            </div>

            <ArrowRight size={18} color="var(--accent-cyan)" className="architecture-arrow desktop-arrow" />
            <ArrowDown size={18} color="var(--accent-cyan)" className="architecture-arrow mobile-arrow" />

            <div className="architecture-step">
              <div className="architecture-step-title">n8n Workflow</div>
              <div className="architecture-step-sub">Orchestrator Node</div>
            </div>

            <ArrowRight size={18} color="var(--accent-cyan)" className="architecture-arrow desktop-arrow" />
            <ArrowDown size={18} color="var(--accent-cyan)" className="architecture-arrow mobile-arrow" />

            <div className="architecture-step">
              <div className="architecture-step-title">Node.js Agent Engine</div>
              <div className="architecture-step-sub">Parser & NLP Model</div>
            </div>

            <ArrowRight size={18} color="var(--accent-cyan)" className="architecture-arrow desktop-arrow" />
            <ArrowDown size={18} color="var(--accent-cyan)" className="architecture-arrow mobile-arrow" />

            <div className="architecture-step">
              <div className="architecture-step-title">Job Feeds</div>
              <div className="architecture-step-sub">Pakistan 🇵🇰 & India 🇮🇳</div>
            </div>
          </div>
        </div>

        {/* Project Meta Info Footer */}
        <div className="about-footer">
          <div className="about-footer-info">
            <div className="about-footer-title">
              Final Year Project Demonstration
            </div>
            <div className="about-footer-sub">
              Job Recommendation System by Resume Understanding with Explainable Matching
            </div>
          </div>

          <div className="badge-chip badge-emerald about-footer-badge">
            <ShieldCheck size={14} /> System Operational
          </div>
        </div>
      </div>
    </div>
  );
}

