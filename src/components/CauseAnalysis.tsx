import type { CausalFactor } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

interface CauseAnalysisProps {
  causes: CausalFactor[];
}

export default function CauseAnalysis({ causes }: CauseAnalysisProps) {
  const sorted = [...causes].sort((a, b) => b.weight - a.weight);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-widest uppercase text-accent-blue">
        Causal Factors
      </h3>
      <div className="space-y-3">
        {sorted.map((cause) => (
          <div key={cause.name} className="rounded-lg border border-border bg-bg-primary p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-text-primary">{cause.name}</h4>
                  <span className="rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs font-bold font-mono text-accent-blue">
                    {cause.weight}%
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                  {cause.description}
                </p>
              </div>
            </div>

            {/* Weight bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-bg-secondary">
              <div
                className="h-full rounded-full bg-accent-blue transition-all duration-500"
                style={{ width: `${cause.weight}%` }}
              />
            </div>

            {/* Source */}
            <a
              href={cause.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-text-secondary hover:text-accent-blue transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              {cause.source}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
