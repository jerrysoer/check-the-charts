export type ViewMode = 'skeptic' | 'neutral' | 'believer';

export type ChartCategory =
  | 'wages'
  | 'housing'
  | 'inequality'
  | 'prices'
  | 'trade'
  | 'labor'
  | 'demographics'
  | 'politics';

export const CATEGORY_LABELS: Record<ChartCategory, string> = {
  wages: 'Wages & Income',
  housing: 'Housing',
  inequality: 'Inequality',
  prices: 'Prices & Inflation',
  trade: 'Trade & Debt',
  labor: 'Labor Market',
  demographics: 'Demographics',
  politics: 'Politics & Society',
};

export interface DataPoint {
  year: number;
  value: number;
  secondaryValue?: number;
}

export interface Annotation {
  year: number;
  label: string;
  description: string;
}

export interface CausalFactor {
  name: string;
  weight: number; // 0-100 representing relative contribution
  description: string;
  source: string;
  sourceUrl: string;
}

export interface ViewPerspective {
  title: string;
  summary: string;
  interpretation: string;
}

export interface DataSource {
  name: string;
  url: string;
  lastUpdated: string;
}

export interface ChartData {
  id: string;
  category: ChartCategory;
  title: string;
  subtitle: string;
  commonClaim: string;
  actualTrend: string;
  dataSource: DataSource;
  chartData: DataPoint[];
  annotations: Annotation[];
  causes: CausalFactor[];
  skepticView: ViewPerspective;
  neutralView: ViewPerspective;
  believerView: ViewPerspective;
  valueLabel: string;
  secondaryValueLabel?: string;
  unit: string;
}
