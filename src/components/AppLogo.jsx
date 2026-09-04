import React from 'react';

export default function AppLogo({ size = 40, className = '' }) {
  return (
    <img
      src="/favicon.png"
      alt="JobMatch logo"
      className={`app-logo ${className}`.trim()}
      width={size}
      height={size}
      draggable={false}
    />
  );
}
