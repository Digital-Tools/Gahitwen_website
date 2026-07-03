// Shared quote / international rate engine.
//
// This module is intentionally framework-agnostic (no React, no DOM) so it can
// be imported by BOTH the React frontend (for a live, indicative estimate) and
// the Netlify serverless function (for the authoritative server-side estimate).
//
// All base rates are expressed in USD per hour at the US baseline. They are
// derived from 2026 industry-average hourly rates for software and cybersecurity
// services (blended mid-level/boutique positioning). Region multipliers adjust
// for local market pricing, and currency FX rates convert the USD figure into
// the customer's local currency. FX/multiplier values are approximate and meant
// to be edited by the Gahitwen team (ideally refreshed from a live FX source
// over time) — they are NOT a binding price.

export type ServiceCategory = 'technology' | 'cybersecurity';
export type BillingModel = 'project' | 'retainer';

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'RWF'
  | 'KES'
  | 'TZS'
  | 'UGX'
  | 'NGN'
  | 'ZAR'
  | 'AED'
  | 'INR';

export interface Currency {
  code: CurrencyCode;
  /** Display symbol, used as a fallback when Intl currency formatting is unavailable. */
  symbol: string;
  name: string;
  /** Approximate units of this currency per 1 USD. Placeholder — refresh from a live source. */
  perUsd: number;
}

export interface Region {
  id: string;
  name: string;
  currency: CurrencyCode;
  /** Market price multiplier relative to the US baseline (1.0). */
  multiplier: number;
}

export interface Scope {
  id: string;
  label: string;
  description: string;
  /** Estimated hours range for project work, or hours/month for retainers. */
  minHours: number;
  maxHours: number;
}

export interface ServiceDef {
  id: string;
  name: string;
  category: ServiceCategory;
  billing: BillingModel;
  /** Base blended rate in USD/hour at the US baseline. */
  rateUsdPerHour: number;
  /** Short line shown next to the rate in the UI. */
  blurb: string;
}

// ---------------------------------------------------------------------------
// Currencies (approximate FX — placeholders, edit as needed)
// ---------------------------------------------------------------------------

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', perUsd: 1 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', perUsd: 0.88 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', perUsd: 0.75 },
  RWF: { code: 'RWF', symbol: 'FRw', name: 'Rwandan Franc', perUsd: 1400 },
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', perUsd: 129 },
  TZS: { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', perUsd: 2600 },
  UGX: { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', perUsd: 3750 },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', perUsd: 1550 },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', perUsd: 17.5 },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', perUsd: 3.67 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', perUsd: 88 },
};

// ---------------------------------------------------------------------------
// Regions (drive both currency and a local market multiplier)
// ---------------------------------------------------------------------------

export const REGIONS: Region[] = [
  { id: 'north-america', name: 'North America', currency: 'USD', multiplier: 1.0 },
  { id: 'europe', name: 'Europe', currency: 'EUR', multiplier: 0.95 },
  { id: 'uk', name: 'United Kingdom', currency: 'GBP', multiplier: 1.0 },
  { id: 'middle-east', name: 'Middle East', currency: 'AED', multiplier: 0.9 },
  { id: 'rwanda', name: 'Rwanda', currency: 'RWF', multiplier: 0.55 },
  { id: 'kenya', name: 'Kenya', currency: 'KES', multiplier: 0.6 },
  { id: 'tanzania', name: 'Tanzania', currency: 'TZS', multiplier: 0.55 },
  { id: 'uganda', name: 'Uganda', currency: 'UGX', multiplier: 0.55 },
  { id: 'east-africa', name: 'East Africa (other)', currency: 'USD', multiplier: 0.55 },
  { id: 'nigeria', name: 'Nigeria / West Africa', currency: 'NGN', multiplier: 0.6 },
  { id: 'southern-africa', name: 'Southern Africa', currency: 'ZAR', multiplier: 0.65 },
  { id: 'asia', name: 'Asia', currency: 'INR', multiplier: 0.55 },
  { id: 'global', name: 'Rest of World', currency: 'USD', multiplier: 0.85 },
];

export const DEFAULT_REGION_ID = 'north-america';

// ---------------------------------------------------------------------------
// Scopes — one set for project work, one for ongoing retainers
// ---------------------------------------------------------------------------

export const PROJECT_SCOPES: Scope[] = [
  {
    id: 'discovery',
    label: 'Discovery / Assessment',
    description: 'Scoping, audit, or proof-of-concept engagement.',
    minHours: 16,
    maxHours: 40,
  },
  {
    id: 'small',
    label: 'Small Project',
    description: 'A focused build or single deliverable.',
    minHours: 80,
    maxHours: 160,
  },
  {
    id: 'medium',
    label: 'Medium Project',
    description: 'A multi-feature product or platform.',
    minHours: 200,
    maxHours: 400,
  },
  {
    id: 'large',
    label: 'Large / Enterprise',
    description: 'Complex, multi-team, long-running engagement.',
    minHours: 500,
    maxHours: 1000,
  },
];

export const RETAINER_SCOPES: Scope[] = [
  {
    id: 'starter',
    label: 'Starter (monthly)',
    description: 'Essential ongoing coverage for a small footprint.',
    minHours: 30,
    maxHours: 60,
  },
  {
    id: 'growth',
    label: 'Growth (monthly)',
    description: 'Expanded coverage for a growing organization.',
    minHours: 80,
    maxHours: 140,
  },
  {
    id: 'enterprise',
    label: 'Enterprise (monthly)',
    description: '24/7 coverage for large or regulated environments.',
    minHours: 160,
    maxHours: 260,
  },
];

// ---------------------------------------------------------------------------
// Services (base USD/hour rates — edit to match real pricing)
// ---------------------------------------------------------------------------

export const SERVICES: ServiceDef[] = [
  // Technology
  {
    id: 'custom-software',
    name: 'Custom Software Development',
    category: 'technology',
    billing: 'project',
    rateUsdPerHour: 110,
    blurb: 'Web & enterprise applications built to spec.',
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps Solutions',
    category: 'technology',
    billing: 'project',
    rateUsdPerHour: 130,
    blurb: 'Migrations, CI/CD, and scalable infrastructure.',
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Design & Integration',
    category: 'technology',
    billing: 'project',
    rateUsdPerHour: 105,
    blurb: 'Cross-platform apps from concept to launch.',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics & AI Consulting',
    category: 'technology',
    billing: 'project',
    rateUsdPerHour: 140,
    blurb: 'Insights, dashboards, and applied AI.',
  },
  {
    id: 'database-management',
    name: 'Database Management & Optimization',
    category: 'technology',
    billing: 'project',
    rateUsdPerHour: 110,
    blurb: 'Design, tuning, and reliable data access.',
  },
  {
    id: 'security-solutions',
    name: 'Security Solutions & Compliance',
    category: 'technology',
    billing: 'project',
    rateUsdPerHour: 135,
    blurb: 'Hardening and compliance readiness.',
  },
  // Cybersecurity
  {
    id: 'penetration-testing',
    name: 'Penetration Testing',
    category: 'cybersecurity',
    billing: 'project',
    rateUsdPerHour: 175,
    blurb: 'Real-world attack simulation engagements.',
  },
  {
    id: 'managed-security',
    name: 'Managed Security (SOC/MSSP)',
    category: 'cybersecurity',
    billing: 'retainer',
    rateUsdPerHour: 140,
    blurb: '24/7 monitoring, detection, and response.',
  },
  {
    id: 'cloud-security',
    name: 'Cloud Security',
    category: 'cybersecurity',
    billing: 'project',
    rateUsdPerHour: 185,
    blurb: 'AWS, Azure & GCP security assessments.',
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    category: 'cybersecurity',
    billing: 'project',
    rateUsdPerHour: 275,
    blurb: 'Rapid containment and recovery.',
  },
  {
    id: 'security-consulting',
    name: 'Security Consulting',
    category: 'cybersecurity',
    billing: 'project',
    rateUsdPerHour: 185,
    blurb: 'Strategy, roadmaps, and advisory.',
  },
];

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export const getService = (id: string): ServiceDef | undefined =>
  SERVICES.find((s) => s.id === id);

export const getRegion = (id: string): Region | undefined =>
  REGIONS.find((r) => r.id === id);

export const scopesForBilling = (billing: BillingModel): Scope[] =>
  billing === 'retainer' ? RETAINER_SCOPES : PROJECT_SCOPES;

export const getScope = (billing: BillingModel, id: string): Scope | undefined =>
  scopesForBilling(billing).find((s) => s.id === id);

// ---------------------------------------------------------------------------
// Estimate computation
// ---------------------------------------------------------------------------

export interface EstimateInput {
  serviceId: string;
  scopeId: string;
  regionId: string;
}

export interface Estimate {
  serviceId: string;
  serviceName: string;
  billing: BillingModel;
  /** ' total' for project work, ' / month' for retainers. */
  unitLabel: string;
  currency: CurrencyCode;
  hourlyRateUsd: number;
  /** Local hourly rate (region-adjusted) for transparency. */
  hourlyRateLocal: number;
  minHours: number;
  maxHours: number;
  minUsd: number;
  maxUsd: number;
  minLocal: number;
  maxLocal: number;
}

/**
 * Compute an indicative estimate range for a single service. Returns null when
 * the service / scope / region combination is invalid.
 */
export const computeEstimate = (input: EstimateInput): Estimate | null => {
  const service = getService(input.serviceId);
  const region = getRegion(input.regionId);
  if (!service || !region) return null;

  const scope = getScope(service.billing, input.scopeId);
  if (!scope) return null;

  const currency = CURRENCIES[region.currency];
  const effectiveHourlyUsd = service.rateUsdPerHour * region.multiplier;

  const minUsd = Math.round(effectiveHourlyUsd * scope.minHours);
  const maxUsd = Math.round(effectiveHourlyUsd * scope.maxHours);

  const toLocal = (usd: number) => Math.round(usd * currency.perUsd);

  return {
    serviceId: service.id,
    serviceName: service.name,
    billing: service.billing,
    unitLabel: service.billing === 'retainer' ? ' / month' : ' total',
    currency: currency.code,
    hourlyRateUsd: service.rateUsdPerHour,
    hourlyRateLocal: Math.round(effectiveHourlyUsd * currency.perUsd),
    minHours: scope.minHours,
    maxHours: scope.maxHours,
    minUsd,
    maxUsd,
    minLocal: toLocal(minUsd),
    maxLocal: toLocal(maxUsd),
  };
};

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export const formatMoney = (amount: number, currency: CurrencyCode): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    const c = CURRENCIES[currency];
    return `${c?.symbol ?? ''}${Math.round(amount).toLocaleString('en-US')}`;
  }
};

export const formatEstimateRange = (estimate: Estimate): string => {
  const min = formatMoney(estimate.minLocal, estimate.currency);
  const max = formatMoney(estimate.maxLocal, estimate.currency);
  return `${min} – ${max}${estimate.unitLabel}`;
};
