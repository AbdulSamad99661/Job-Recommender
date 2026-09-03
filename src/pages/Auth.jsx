import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';
import { DEFAULT_SEARCH_LOCATION } from '../data/searchCountries';
import { UPLOAD_PRIORITY_LOCATIONS, OTHER_COUNTRIES } from '../data/searchCountries';
import {
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  KeyRound,
  Loader2,
  Sparkles,
  Globe,
} from 'lucide-react';

const MODES = {
  login: 'login',
  signup: 'signup',
  forgot: 'forgot',
};

export default function Auth({ onNavigateTab }) {
  const { signIn, signUp, resetPassword, updateProfileSettings, isFirebaseConfigured, authError, setAuthError } = useAuth();
  const [mode, setMode] = useState(MODES.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [defaultCountry, setDefaultCountry] = useState(DEFAULT_SEARCH_LOCATION);
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const switchMode = (next) => {
    setMode(next);
    setMessage(null);
    setAuthError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setAuthError(null);
    setIsSubmitting(true);

    try {
      if (mode === MODES.login) {
        await signIn(email.trim(), password);
        setMessage({ type: 'success', text: 'Welcome back! Redirecting to your dashboard…' });
        setTimeout(() => onNavigateTab?.('home'), 800);
      } else if (mode === MODES.signup) {
        await signUp(email.trim(), password, displayName.trim());
        await updateProfileSettings({
          displayName: displayName.trim(),
          defaultCountry,
          targetRole: targetRole.trim(),
        });
        setMessage({ type: 'success', text: 'Account created successfully!' });
        setTimeout(() => onNavigateTab?.('profile'), 800);
      } else if (mode === MODES.forgot) {
        await resetPassword(email.trim());
        setMessage({ type: 'success', text: 'Password reset email sent. Check your inbox.' });
      }
    } catch (err) {
      setAuthError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isFirebaseConfigured) {
    return (
      <div className="page-container custom-scrollbar animate-fade-in">
        <div className="auth-gate-card">
          <h2>Firebase Not Configured</h2>
          <p>Add your Firebase web app keys to <code>.env</code> (see <code>.env.example</code>) and redeploy.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container custom-scrollbar animate-fade-in">
      <div className="auth-page-grid">
        <div className="auth-hero-panel">
          <div className="badge-chip badge-cyan" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} /> Secure Account
          </div>
          <h1>Your career workspace</h1>
          <p>
            Sign in to save jobs, track applications, and keep a full history of uploads, searches, and AI match sessions.
          </p>
          <ul className="auth-feature-list">
            <li>Save jobs with status: Applied, Interview, Offer</li>
            <li>Personal profile with default country & target role</li>
            <li>Full activity history across the platform</li>
            <li>Guest browsing still works — login unlocks persistence</li>
          </ul>
        </div>

        <div className="auth-form-panel glass-panel">
          <div className="auth-tabs">
            <button type="button" className={mode === MODES.login ? 'active' : ''} onClick={() => switchMode(MODES.login)}>Login</button>
            <button type="button" className={mode === MODES.signup ? 'active' : ''} onClick={() => switchMode(MODES.signup)}>Sign Up</button>
            <button type="button" className={mode === MODES.forgot ? 'active' : ''} onClick={() => switchMode(MODES.forgot)}>Forgot</button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === MODES.signup && (
              <label className="auth-field">
                <span>Full name</span>
                <div className="auth-input-wrap">
                  <User size={16} />
                  <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Alex Morgan" required />
                </div>
              </label>
            )}

            <label className="auth-field">
              <span>Email</span>
              <div className="auth-input-wrap">
                <Mail size={16} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
              </div>
            </label>

            {mode !== MODES.forgot && (
              <label className="auth-field">
                <span>Password</span>
                <div className="auth-input-wrap">
                  <Lock size={16} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} required />
                </div>
              </label>
            )}

            {mode === MODES.signup && (
              <>
                <label className="auth-field">
                  <span>Default country</span>
                  <div className="auth-input-wrap">
                    <Globe size={16} />
                    <select value={defaultCountry} onChange={(e) => setDefaultCountry(e.target.value)}>
                      {UPLOAD_PRIORITY_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>{loc.label}</option>
                      ))}
                      <optgroup label="Other countries">
                        {OTHER_COUNTRIES.map((c) => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                </label>
                <label className="auth-field">
                  <span>Target role</span>
                  <div className="auth-input-wrap">
                    <User size={16} />
                    <input type="text" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} placeholder="Software Engineer" />
                  </div>
                </label>
              </>
            )}

            {(authError || message) && (
              <div className={`auth-alert ${message?.type === 'success' ? 'success' : 'error'}`}>
                {message?.text || authError}
              </div>
            )}

            <button type="submit" className="btn-primary auth-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <><Loader2 size={18} className="animate-spin-slow" /> Please wait…</>
              ) : mode === MODES.login ? (
                <><LogIn size={18} /> Sign In</>
              ) : mode === MODES.signup ? (
                <><UserPlus size={18} /> Create Account</>
              ) : (
                <><KeyRound size={18} /> Send Reset Link</>
              )}
            </button>
          </form>

          {mode === MODES.login && (
            <p className="auth-footer-note">
              New here? <button type="button" className="auth-link" onClick={() => switchMode(MODES.signup)}>Create an account</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
