'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { getAllCharts, getCategories } from '@/lib/charts';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ChartCategory } from '@/lib/types';
import ChartCard from '@/components/ChartCard';

export default function ExplorePage() {
  const allCharts = getAllCharts();
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<ChartCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharts = useMemo(() => {
    let result = allCharts;

    if (selectedCategory !== 'all') {
      result = result.filter((chart) => chart.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        (chart) =>
          chart.title.toLowerCase().includes(lower) ||
          chart.subtitle.toLowerCase().includes(lower) ||
          chart.commonClaim.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [allCharts, selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
          Chart Explorer
        </h1>
        <p className="mt-2 text-base text-text-secondary">
          Interactive economic charts with multi-causal analysis and verified sources.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-accent-blue text-white'
                : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
            }`}
          >
            All Charts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-accent-blue text-white'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search charts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-bg-primary py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue sm:w-64"
          />
        </div>
      </div>

      {/* Chart grid */}
      <div className="mt-8">
        {filteredCharts.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg-secondary py-16 text-center">
            <p className="text-sm text-text-secondary">
              No charts match your search. Try different terms.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCharts.map((chart) => (
              <ChartCard key={chart.id} chart={chart} />
            ))}
          </div>
        )}
      </div>

      {/* Count */}
      <p className="mt-6 text-xs text-text-secondary text-center">
        Showing {filteredCharts.length} of {allCharts.length} charts
      </p>
    </div>
  );
}
