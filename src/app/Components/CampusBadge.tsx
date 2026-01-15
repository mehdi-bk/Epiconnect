import React from 'react';
import { getCampusByCode } from '../data/campuses';

interface CampusBadgeProps {
  campusCode: string;
  size?: 'sm' | 'md' | 'lg';
  showFlag?: boolean;
}

export function CampusBadge({ campusCode, size = 'md', showFlag = false }: CampusBadgeProps) {
  const campus = getCampusByCode(campusCode);
  
  if (!campus) return null;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${sizeClasses[size]}`}
      style={{ backgroundColor: campus.color, color: '#fff' }}
    >
      {showFlag && <span>{campus.flag}</span>}
      <span>{campus.code}</span>
    </span>
  );
}
