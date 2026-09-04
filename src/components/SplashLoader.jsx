import React, { useEffect, useState } from 'react';
import { Sparkles, Cpu } from 'lucide-react';
import AppLogo from './AppLogo';

export default function SplashLoader({ onComplete }) {
  const [loadingText, setLoadingText] = useState('Initializing AI Engine...');
  const [progress, setProgress] = useState(15);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if splash screen was already shown in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash === 'true') {
      onComplete();
      return;
    }

    const timer1 = setTimeout(() => {
      setLoadingText('Loading CV Understanding Model...');
      setProgress(55);
    }, 600);

    const timer2 = setTimeout(() => {
      setLoadingText('Connecting to Explainable Matcher Engine...');
      setProgress(90);
    }, 1200);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
    }, 1700);

    const timer4 = setTimeout(() => {
      sessionStorage.setItem('hasSeenSplash', 'true');
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className={`splash-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-logo-box animate-pulse-glow">
        <div className="splash-ring"></div>
        <AppLogo size={72} className="splash-logo-img" />
      </div>

      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '6px' }}>
          JobRecommender
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
          <Sparkles size={16} color="#0EA5E9" />
          Explainable Resume Understanding
        </p>
      </div>

      <div style={{ width: '240px', background: 'rgba(255,255,255,0.08)', height: '6px', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: 'linear-gradient(90deg, #6366F1, #0EA5E9)', 
            transition: 'width 0.4s ease',
            borderRadius: '99px'
          }} 
        />
      </div>

      <p className="mono-font" style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Cpu size={14} className="animate-spin-slow" />
        {loadingText}
      </p>
    </div>
  );
}
