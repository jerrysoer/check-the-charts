'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquareQuote, TrendingUp } from 'lucide-react';
import { getChartById } from '@/lib/charts';
import type { ViewMode } from '@/lib/types';
import InteractiveChart from '@/components/InteractiveChart';
import ViewModeSwitcher from '@/components/ViewModeSwitcher';
import CauseAnalysis from '@/components/CauseAnalysis';
import SourceVerification from '@/components/SourceVerification';
import { CATEGORY_LABELS } from '@/lib/types';

export default function ChartDetailPage() {
  const params = useParams();
  const chartId = params.chartId as string;
  const chart = getChartById(chartId);
  const [viewMode, setViewMode] = useState<ViewMode>('neutral');

  if (!chart) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-text-primary">Chart not found</h1>
        <p className="mt-2 text-text-secondary">
          The chart &ldquo;{chartId}&rdquo; doesn&apos;t exist.
        </p>
        <Link
          href="/explore"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all charts
        </Link>
      </div>
    );
  }

  const perspective =
    viewMode === 'skeptic'
      ? chart.skepticView
      : viewMode === 'believer'
        ? chart.believerView
        : chart.neutralView;

  const perspectiveBorder =
    viewMode === 'skeptic'
      ? 'border-accent-purple'
      : viewMode === 'believer'
        ? 'border-accent-orange'
        : 'border-border';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All Charts
      </Link>

      {/* Header */}
      <div className="mt-4">
        <span className="inline-block rounded-full bg-accent-blue/10 px-2.5 py-0.5 text-xs font-semibold text-accent-blue">
          {CATEGORY_LABELS[chart.category]}
        </span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          {chart.title}
        </h1>
        <p className="mt-1 text-base text-text-secondary">{chart.subtitle}</p>
      </div>

      {/* View mode + Chart */}
      <div className="mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-text-secondary">
            Perspective
          </h2>
          <ViewModeSwitcher activeMode={viewMode} onChange={setViewMode} />
        </div>

        <div className="mt-6 rounded-xl border border-border bg-bg-primary p-4 sm:p-6">
          <InteractiveChart
            chartData={chart.chartData}
            annotations={chart.annotations}
            valueLabel={chart.valueLabel}
            secondaryValueLabel={chart.secondaryValueLabel}
            unit={chart.unit}
          />
        </div>
      </div>

      {/* Claim vs Reality + Perspective */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Common Claim vs Actual Trend */}
        <div className="space-y-4">
          <div className="rounded-lg border border-data-red/30 bg-data-red/5 p-4">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="h-4 w-4 text-data-red" />
              <h3 className="text-xs font-semibold tracking-widest uppercase text-data-red">
                Common Claim
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-primary italic">
              &ldquo;{chart.commonClaim}&rdquo;
            </p>
          </div>

          <div className="rounded-lg border border-data-green/30 bg-data-green/5 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-data-green" />
              <h3 className="text-xs font-semibold tracking-widest uppercase text-data-green">
                What the Data Shows
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-primary">
              {chart.actualTrend}
            </p>
          </div>
        </div>

        {/* Active Perspective */}
        <div className={`rounded-lg border-2 ${perspectiveBorder} p-4 transition-colors`}>
          <h3 className="text-base font-bold text-text-primary">{perspective.title}</h3>
          <p className="mt-2 text-sm font-medium text-text-secondary">{perspective.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {perspective.interpretation}
          </p>
        </div>
      </div>

      {/* Causal Factors + Source */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CauseAnalysis causes={chart.causes} />
        </div>
        <div>
          <SourceVerification dataSource={chart.dataSource} />

          {/* Annotations timeline */}
          <div className="mt-6 rounded-lg border border-border p-4">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-text-secondary">
              Key Events
            </h3>
            <div className="mt-3 space-y-3">
              {chart.annotations.map((annotation) => (
                <div key={annotation.year} className="flex gap-3">
                  <span className="shrink-0 rounded bg-data-red/10 px-1.5 py-0.5 text-xs font-bold font-mono text-data-red">
                    {annotation.year}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{annotation.label}</p>
                    <p className="text-xs text-text-secondary">{annotation.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
