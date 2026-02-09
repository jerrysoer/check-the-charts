import chartsData from '@/data/charts.json';
import { ChartData, ChartCategory } from './types';

const charts = chartsData as ChartData[];

export function getAllCharts(): ChartData[] {
  return charts;
}

export function getChartById(id: string): ChartData | undefined {
  return charts.find((chart) => chart.id === id);
}

export function getChartsByCategory(category: ChartCategory): ChartData[] {
  return charts.filter((chart) => chart.category === category);
}

export function getCategories(): ChartCategory[] {
  return [...new Set(charts.map((chart) => chart.category))];
}

export function searchCharts(query: string): ChartData[] {
  const lower = query.toLowerCase();
  return charts.filter(
    (chart) =>
      chart.title.toLowerCase().includes(lower) ||
      chart.subtitle.toLowerCase().includes(lower) ||
      chart.commonClaim.toLowerCase().includes(lower)
  );
}
