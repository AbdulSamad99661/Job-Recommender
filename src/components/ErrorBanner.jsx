import React from 'react';
import { AlertTriangle, XCircle, Info, X } from 'lucide-react';

const VARIANTS = {
  error: { icon: XCircle, className: 'error-banner error' },
  warning: { icon: AlertTriangle, className: 'error-banner warning' },
  info: { icon: Info, className: 'error-banner info' },
};

export default function ErrorBanner({ type = 'error', title, message, details, onDismiss }) {
  if (!message && !title) return null;

  const { icon: Icon, className } = VARIANTS[type] || VARIANTS.error;

  return (
    <div className={className} role="alert">
      <Icon size={20} className="error-banner-icon" />
      <div className="error-banner-body">
        {title && <strong className="error-banner-title">{title}</strong>}
        {message && <p className="error-banner-message">{message}</p>}
        {details && <p className="error-banner-details">{details}</p>}
      </div>
      {onDismiss && (
        <button type="button" className="error-banner-dismiss" onClick={onDismiss} aria-label="Dismiss">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
