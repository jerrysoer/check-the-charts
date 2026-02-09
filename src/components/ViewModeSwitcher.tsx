'use client';

import type { ViewMode } from '@/lib/types';
import { Eye, Scale, Flame } from 'lucide-react';

interface ViewModeSwitcherProps {
  activeMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const MODES: { mode: ViewMode; label: string; icon: typeof Eye; color: string; activeClass: string }[] = [
  {
    mode: 'skeptic',
    label: 'Skeptic',
    icon: Eye,
    color: 'text-accent-purple',
    activeClass: 'bg-accent-purple text-white',
  },
  {
    mode: 'neutral',
    label: 'Neutral',
    icon: Scale,
    color: 'text-text-secondary',
    activeClass: 'bg-text-primary text-white',
  },
  {
    mode: 'believer',
    label: 'Believer',
    icon: Flame,
    color: 'text-accent-orange',
    activeClass: 'bg-accent-orange text-white',
  },
];

export default function ViewModeSwitcher({ activeMode, onChange }: ViewModeSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-bg-secondary p-1">
      {MODES.map(({ mode, label, icon: Icon, activeClass }) => {
        const isActive = activeMode === mode;
        return (
          <button
            key={mode}
            onClick={() => onChange(mode)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
              isActive ? activeClass : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
