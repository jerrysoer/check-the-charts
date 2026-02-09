'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ChartData } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/types';

interface ChartCardProps {
  chart: ChartData;
}

function MiniSparkline({ data }: { data: { value: number }[] }) {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const width = 200;
  const height = 48;
  const padding = 4;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12" preserveAspectRatio="none">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="var(--accent-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ChartCard({ chart }: ChartCardProps) {
  return (
    <Link
      href={`/explore/${chart.id}`}
      className="group block rounded-xl border border-border bg-bg-primary p-5 transition-all hover:border-accent-blue/40 hover:shadow-md"
    >
      {/* Category badge */}
      <span className="inline-block rounded-full bg-accent-blue/10 px-2 py-0.5 text-xs font-semibold text-accent-blue">
        {CATEGORY_LABELS[chart.category]}
      </span>

      {/* Title */}
      <h3 className="mt-3 text-base font-bold text-text-primary group-hover:text-accent-blue transition-colors">
        {chart.title}
      </h3>

      {/* Sparkline */}
      <div className="mt-3 rounded-lg bg-bg-secondary p-2">
        <MiniSparkline data={chart.chartData} />
      </div>

      {/* Common claim teaser */}
      <p className="mt-3 text-xs text-text-secondary leading-relaxed line-clamp-2">
        <span className="font-semibold text-data-red">Claim:</span> {chart.commonClaim}
      </p>

      {/* CTA */}
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-accent-blue">
        Explore this chart
        <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
