'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, ShieldCheck, GraduationCap, ChevronRight } from 'lucide-react';

const DEMO_DATA = [
  { year: 1948, productivity: 100, compensation: 100 },
  { year: 1955, productivity: 127, compensation: 126 },
  { year: 1963, productivity: 155, compensation: 152 },
  { year: 1971, productivity: 192, compensation: 188 },
  { year: 1980, productivity: 225, compensation: 197 },
  { year: 1990, productivity: 270, compensation: 206 },
  { year: 2000, productivity: 334, compensation: 222 },
  { year: 2010, productivity: 405, compensation: 233 },
  { year: 2023, productivity: 475, compensation: 258 },
];

function HeroChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDrawn(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const width = 560;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 32, left: 44 };

  const xMin = 1948;
  const xMax = 2023;
  const yMin = 80;
  const yMax = 500;

  const scaleX = (year: number) =>
    padding.left + ((year - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
  const scaleY = (val: number) =>
    height - padding.bottom - ((val - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);

  const productivityPath = DEMO_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.year)} ${scaleY(d.productivity)}`
  ).join(' ');

  const compensationPath = DEMO_DATA.map((d, i) =>
    `${i === 0 ? 'M' : 'L'} ${scaleX(d.year)} ${scaleY(d.compensation)}`
  ).join(' ');

  const nixonX = scaleX(1971);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-bg-primary" style={{ maxWidth: width }}>
      {/* Chart label */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="text-xs font-semibold tracking-widest uppercase text-text-secondary">
          Productivity vs. Compensation
        </span>
        <span className="text-xs text-text-secondary font-mono">1948–2023</span>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ display: 'block' }}
      >
        {/* Grid lines */}
        {[100, 200, 300, 400].map((val) => (
          <line
            key={val}
            x1={padding.left}
            y1={scaleY(val)}
            x2={width - padding.right}
            y2={scaleY(val)}
            stroke="var(--border)"
            strokeWidth="0.5"
          />
        ))}

        {/* Year labels */}
        {[1950, 1970, 1990, 2010].map((year) => (
          <text
            key={year}
            x={scaleX(year)}
            y={height - 8}
            textAnchor="middle"
            className="fill-text-secondary"
            style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
          >
            {year}
          </text>
        ))}

        {/* Y-axis labels */}
        {[100, 200, 300, 400].map((val) => (
          <text
            key={val}
            x={padding.left - 6}
            y={scaleY(val) + 3}
            textAnchor="end"
            className="fill-text-secondary"
            style={{ fontSize: '9px', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
          >
            {val}
          </text>
        ))}

        {/* 1971 marker line */}
        <line
          x1={nixonX}
          y1={padding.top}
          x2={nixonX}
          y2={height - padding.bottom}
          stroke="var(--data-red)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity={drawn ? 0.7 : 0}
          style={{ transition: 'opacity 0.6s ease 1.2s' }}
        />
        <text
          x={nixonX + 4}
          y={padding.top + 10}
          className="fill-data-red"
          style={{
            fontSize: '9px',
            fontFamily: 'var(--font-jetbrains-mono, monospace)',
            fontWeight: 600,
            opacity: drawn ? 1 : 0,
            transition: 'opacity 0.6s ease 1.4s',
          }}
        >
          1971
        </text>

        {/* Productivity line */}
        <path
          d={productivityPath}
          fill="none"
          stroke="var(--accent-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          strokeDashoffset={drawn ? 0 : 1200}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s' }}
        />

        {/* Compensation line */}
        <path
          d={compensationPath}
          fill="none"
          stroke="var(--accent-orange)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          strokeDashoffset={drawn ? 0 : 1200}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s' }}
        />

        {/* End dots */}
        {drawn && (
          <>
            <circle
              cx={scaleX(2023)}
              cy={scaleY(475)}
              r="4"
              fill="var(--accent-blue)"
              className="animate-pulse-dot"
            />
            <circle
              cx={scaleX(2023)}
              cy={scaleY(258)}
              r="4"
              fill="var(--accent-orange)"
              className="animate-pulse-dot"
            />
          </>
        )}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 border-t border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 rounded-full bg-accent-blue" />
          <span className="text-xs text-text-secondary">Productivity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-4 rounded-full bg-accent-orange" />
          <span className="text-xs text-text-secondary">Hourly Compensation</span>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: Layers,
    title: 'Multi-Causal Analysis',
    description:
      'Every trend has multiple causes. We show 3–5 explanatory factors, weighted by evidence, so you see the full picture — not just one convenient story.',
    accent: 'bg-accent-blue/10 text-accent-blue',
  },
  {
    icon: ShieldCheck,
    title: 'Source Verification',
    description:
      'Every data point links directly to its original source — FRED, BLS, Census, academic papers. Verify anything yourself in seconds.',
    accent: 'bg-data-green/10 text-data-green',
  },
  {
    icon: GraduationCap,
    title: 'Statistical Learning',
    description:
      'Toggle between Skeptic, Neutral, and Believer perspectives on each chart. Learn to evaluate competing interpretations of the same data.',
    accent: 'bg-accent-purple/10 text-accent-purple',
  },
];

export default function Home() {
  return (
    <div>
      {/* === HERO === */}
      <section className="relative overflow-hidden">
        {/* Subtle grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left column — text */}
            <div>
              <div className="animate-rise-up stagger-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-secondary px-3 py-1 text-xs font-medium text-text-secondary">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-data-green animate-pulse-dot" />
                  A Data Literacy Project
                </span>
              </div>

              <h1 className="mt-6 animate-rise-up stagger-2">
                <span className="block text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                  WTF Happened
                </span>
                <span className="block text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  in <span className="text-data-red">1971</span>
                  <span className="text-accent-blue">?</span>
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-text-secondary animate-rise-up stagger-3">
                We love the question. Let&apos;s answer it{' '}
                <em className="not-italic font-semibold text-text-primary">honestly</em>.
              </p>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-secondary animate-rise-up stagger-4">
                Complex economic trends rarely have single causes. Explore interactive charts with
                multi-causal analysis, verified sources, and competing perspectives — not propaganda.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 animate-rise-up stagger-5">
                <Link
                  href="/explore"
                  className="group inline-flex items-center gap-2 rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-blue/90 hover:shadow-md"
                >
                  Explore the Charts
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/explore/wage-productivity-gap"
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-secondary"
                >
                  See an example
                  <ChevronRight className="h-3.5 w-3.5 text-text-secondary" />
                </Link>
              </div>
            </div>

            {/* Right column — chart */}
            <div className="animate-rise-up stagger-4 flex justify-center lg:justify-end">
              <HeroChart />
            </div>
          </div>
        </div>
      </section>

      {/* === SEPARATOR === */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <hr className="border-border" />
      </div>

      {/* === CLAIM vs REALITY === */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-accent-blue">
              The Problem
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              One chart, one cause, one answer.
              <br />
              <span className="text-text-secondary font-normal">That&apos;s not how economics works.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary max-w-lg mx-auto">
              Sites like <span className="font-mono text-xs bg-bg-secondary px-1.5 py-0.5 rounded border border-border">wtfhappenedin1971.com</span> present
              charts with a single implied cause — the end of the gold standard. We present the same
              data with the full context: multiple causes, verified sources, and competing interpretations.
            </p>
          </div>
        </div>
      </section>

      {/* === FEATURES === */}
      <section className="bg-bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-accent-blue">
              How We&apos;re Different
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              Data journalism, not data propaganda.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="group">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.accent}`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-base font-bold text-text-primary">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === STATS ROW === */}
      <section className="border-y border-border bg-bg-primary py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: '14', label: 'Interactive Charts', sub: 'and growing' },
              { value: '70', label: 'Causal Factors', sub: 'analyzed' },
              { value: '42', label: 'Perspectives', sub: 'skeptic · neutral · believer' },
              { value: '61', label: 'Verified Sources', sub: 'linked directly' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-text-primary font-mono">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-text-primary">
                  {stat.label}
                </div>
                <div className="text-xs text-text-secondary">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-bg-dark px-6 py-12 text-center sm:px-12 sm:py-16">
            {/* Subtle grid pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--accent-blue) 1px, transparent 1px), linear-gradient(90deg, var(--accent-blue) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <h2 className="relative text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to think critically about data?
            </h2>
            <p className="relative mt-3 mx-auto max-w-md text-sm leading-relaxed text-slate-400">
              Explore every chart with multi-causal analysis, verified sources, and three
              competing perspectives. Form your own conclusions.
            </p>

            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/explore"
                className="group inline-flex items-center gap-2 rounded-lg bg-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent-blue/90 hover:shadow-xl"
              >
                Start Exploring
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
