import React from 'react';
import { 
  Bot, 
  Sparkles, 
  Database, 
  Network, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export default function About() {
  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="badge-chip badge-indigo" style={{ marginBottom: '8px' }}>
            <Sparkles size={14} color="var(--primary)" />
            Final Year Project • Computer Science & AI
          </span>
          <h1 style={{ fontSize: '1.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Job Recommendation System
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
            Resume Understanding with Explainable Matching — bridging job seekers and tech employers across Pakistan 🇵🇰 and India 🇮🇳.
          </p>
        </div>

        {/* 3-Step Agent Workflow Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '22px', marginBottom: '36px' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Bot size={24} />
            </div>
            <span className="mono-font" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>AGENT 01</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '6px 0' }}>
              CV Analysis Agent
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Parses unstructured PDF/Word resumes into structured technical taxonomy, extracting skills, experience level, education, and target job roles.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--accent-cyan-light)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Database size={24} />
            </div>
            <span className="mono-font" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>ENGINE 02</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '6px 0' }}>
              Vector Embedding Engine
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Converts candidate skills and job descriptions into dense semantic vectors, calculating contextual similarity beyond exact keyword matching.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--card-shadow)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--accent-emerald-light)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Sparkles size={24} />
            </div>
            <span className="mono-font" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>AGENT 03</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '6px 0' }}>
              Explainable Matcher
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Generates transparent percentage scores, lists matched vs missing skills, and explains why a candidate is suitable for a given role.
            </p>
          </div>
        </div>

        {/* System Architecture Diagram Component */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '32px', boxShadow: 'var(--card-shadow)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Network size={20} color="var(--accent-cyan)" />
            System Architecture Overview
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Multi-agent workflow orchestration powering the frontend platform.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color-strong)', textAlign: 'center', flex: 1 }}>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem' }}>React SPA Frontend</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Dashboard & UI Layer</div>
            </div>

            <ArrowRight size={18} color="var(--accent-cyan)" className="desktop-arrow" />

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color-strong)', textAlign: 'center', flex: 1 }}>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem' }}>n8n Workflow</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Orchestrator Node</div>
            </div>

            <ArrowRight size={18} color="var(--accent-cyan)" className="desktop-arrow" />

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color-strong)', textAlign: 'center', flex: 1 }}>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem' }}>Node.js Agent Engine</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Parser & NLP Model</div>
            </div>

            <ArrowRight size={18} color="var(--accent-cyan)" className="desktop-arrow" />

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color-strong)', textAlign: 'center', flex: 1 }}>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.92rem' }}>Job Feeds</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>Pakistan 🇵🇰 & India 🇮🇳</div>
            </div>
          </div>
        </div>

        {/* Project Meta Info Footer */}
        <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color-strong)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.98rem' }}>
              Final Year Project Demonstration
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Job Recommendation System by Resume Understanding with Explainable Matching
            </div>
          </div>

          <div className="badge-chip badge-emerald" style={{ padding: '6px 14px' }}>
            <ShieldCheck size={14} /> System Operational
          </div>
        </div>
      </div>
    </div>
  );
}
