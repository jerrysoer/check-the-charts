import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
      <h1 className="font-serif text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
        About This Project
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary">
        <p>
          <strong className="text-text-primary">Check the Charts</strong> is an educational web app that
          teaches critical thinking about economic data through interactive exploration of trends
          since 1971.
        </p>

        <p>
          Unlike sites that present charts with a single implied cause, we show multi-causal analysis,
          verified sources, and competing interpretations — so you can form your own conclusions.
        </p>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">Mission</h2>
        <p>
          Turn viral chart propaganda into a teaching moment for statistical literacy. Complex
          economic phenomena rarely have single causes, and intellectual honesty requires
          acknowledging uncertainty and considering alternative explanations.
        </p>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">What We&apos;re NOT</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Another Bitcoin marketing site</li>
          <li>A pro-gold-standard propaganda tool</li>
          <li>A simple chart gallery without context</li>
          <li>A political advocacy platform</li>
        </ul>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">What We ARE</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>A critical thinking teaching tool</li>
          <li>An example of honest data journalism</li>
          <li>A resource for educators and students</li>
          <li>A demonstration of multi-causal analysis</li>
        </ul>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">Built by</h2>
        <p>
          Made by <strong className="text-text-primary">jerrysoer</strong> and <strong className="text-text-primary">Claude</strong>.
        </p>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">Data Sources</h2>
        <p>
          Every chart is backed by publicly verifiable data. Our primary sources include:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 pt-2">
          {[
            { name: 'FRED (Federal Reserve)', url: 'https://fred.stlouisfed.org/', desc: 'Economic time series data' },
            { name: 'Bureau of Labor Statistics', url: 'https://www.bls.gov/data/', desc: 'Employment, wages, CPI' },
            { name: 'Economic Policy Institute', url: 'https://www.epi.org/data/', desc: 'Wage and inequality data' },
            { name: 'US Census Bureau', url: 'https://www.census.gov/data.html', desc: 'Income, housing, demographics' },
            { name: 'Congressional Budget Office', url: 'https://www.cbo.gov/data/budget-economic-data', desc: 'Budget and economic projections' },
            { name: 'World Inequality Database', url: 'https://wid.world/', desc: 'Global wealth distribution' },
          ].map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border bg-bg-card p-3 transition-colors hover:border-accent-blue group"
            >
              <div className="text-sm font-bold text-text-primary group-hover:text-accent-blue transition-colors">{source.name}</div>
              <div className="text-xs text-text-secondary mt-0.5">{source.desc}</div>
            </a>
          ))}
        </div>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">Learn More</h2>
        <p>
          Want to dig deeper into data literacy and critical thinking about economics?
        </p>
        <ul className="list-disc list-inside space-y-1 pt-1">
          <li><a href="https://www.gapminder.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-blue hover:underline">Gapminder</a> — Fighting misconceptions with data</li>
          <li><a href="https://ourworldindata.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-blue hover:underline">Our World in Data</a> — Research and data on global problems</li>
          <li><a href="https://www.slowboring.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-blue hover:underline">Slow Boring</a> — Data-driven policy analysis</li>
          <li><a href="https://fivethirtyeight.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-blue hover:underline">FiveThirtyEight</a> — Statistical journalism</li>
        </ul>

        <h2 className="font-serif text-lg font-bold text-text-primary pt-4">Open Source</h2>
        <p>
          This project is released under the MIT License. No ads, no paywall — this is a public
          service educational project. Contributions are welcome on{' '}
          <a href="https://github.com/jerrysoer/check-the-charts" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-blue hover:underline">GitHub</a>.
        </p>
      </div>

      <div className="mt-10">
        <Link
          href="/explore"
          className="group inline-flex items-center gap-2 rounded-xl bg-accent-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-accent-orange/90 shadow-lg shadow-accent-orange/20"
        >
          Explore the Charts
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
