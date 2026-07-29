import React from 'react';
import { Check, Plus } from 'lucide-react';

export default function SkillBadge({ skill, isMatched = true }) {
  if (isMatched) {
    return (
      <span className="badge-chip badge-emerald">
        <Check size={12} strokeWidth={3} />
        {skill}
      </span>
    );
  }

  return (
    <span className="badge-chip badge-amber">
      <Plus size={12} strokeWidth={2.5} />
      {skill}
    </span>
  );
}
