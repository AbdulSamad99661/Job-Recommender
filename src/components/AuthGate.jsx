import React from 'react';
import { Lock, LogIn } from 'lucide-react';

export default function AuthGate({ title, description, onSignIn }) {
  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="auth-gate-card">
        <div className="auth-gate-icon">
          <Lock size={32} />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <button type="button" className="btn-primary" onClick={onSignIn}>
          <LogIn size={16} /> Sign in to continue
        </button>
      </div>
    </div>
  );
}
