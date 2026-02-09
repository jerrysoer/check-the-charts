import type { DataSource } from '@/lib/types';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface SourceVerificationProps {
  dataSource: DataSource;
}

export default function SourceVerification({ dataSource }: SourceVerificationProps) {
  return (
    <div className="rounded-lg border border-border bg-bg-primary p-4">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-data-green" />
        <h3 className="text-sm font-semibold text-text-primary">Primary Data Source</h3>
      </div>

      <div className="mt-3 space-y-2">
        <p className="text-sm font-medium text-text-primary">{dataSource.name}</p>
        <a
          href={dataSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-blue hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          View original data
        </a>
        <p className="text-xs text-text-secondary">
          Last updated: <span className="font-mono">{dataSource.lastUpdated}</span>
        </p>
      </div>
    </div>
  );
}
