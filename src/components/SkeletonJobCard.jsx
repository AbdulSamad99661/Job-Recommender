import React from 'react';

export default function SkeletonJobCard() {
  return (
    <div className="job-card" style={{ opacity: 0.8 }}>
      <div className="job-header">
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div className="skeleton-box" style={{ width: '48px', height: '48px', borderRadius: '12px' }} />
          <div>
            <div className="skeleton-box" style={{ width: '220px', height: '20px', marginBottom: '8px' }} />
            <div className="skeleton-box" style={{ width: '140px', height: '14px' }} />
          </div>
        </div>
        <div className="skeleton-box" style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
      </div>

      <div style={{ display: 'flex', gap: '12px', margin: '16px 0' }}>
        <div className="skeleton-box" style={{ width: '80px', height: '24px', borderRadius: '99px' }} />
        <div className="skeleton-box" style={{ width: '90px', height: '24px', borderRadius: '99px' }} />
        <div className="skeleton-box" style={{ width: '100px', height: '24px', borderRadius: '99px' }} />
      </div>

      <div className="skeleton-box" style={{ width: '100%', height: '42px', borderRadius: '8px' }} />
    </div>
  );
}
