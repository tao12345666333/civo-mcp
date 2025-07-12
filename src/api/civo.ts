// Check for API key
export const CIVO_API_KEY = process.env.CIVO_API_KEY!;
if (!CIVO_API_KEY && process.env.NODE_ENV !== 'test') {
  console.error("Error: CIVO_API_KEY environment variable is required");
  process.exit(1);
}

// Civo API base URL
export const CIVO_API_URL = "https://api.civo.com/v2";

// Rate limiting configuration
const RATE_LIMIT = {
  perSecond: 1,
  perMonth: 15000
};

let requestCount = {
  second: 0,
  month: 0,
  lastReset: Date.now()
};

export function checkRateLimit() {
  const now = Date.now();
  if (now - requestCount.lastReset > 1000) {
    requestCount.second = 0;
    requestCount.lastReset = now;
  }
  if (requestCount.second >= RATE_LIMIT.perSecond ||
    requestCount.month >= RATE_LIMIT.perMonth) {
    throw new Error('Rate limit exceeded');
  }
  requestCount.second++;
  requestCount.month++;
}

// Civo API response interfaces
export interface CivoInstance {
  id: string;
  hostname: string;
  size: string;
  status: string;
  public_ip: string | null;
  private_ip: string | null;
  created_at: string;
}

export interface CivoInstanceList {
  items: CivoInstance[];
  page: number;
  per_page: number;
  pages: number;
}

export interface CivoDiskImage {
  id: string;
  name: string;
  version: string;
  state: string;
  distribution: string;
  description: string | null;
  label: string | null;
}

export interface CivoDiskImageList {
  items: CivoDiskImage[];
}

export interface CivoKubernetesCluster {
  id: string;
  name: string;
  status: string;
  region: string;
  version: string;
}

export interface CivoKubernetesClusterList {
  items: CivoKubernetesCluster[];
}

export interface CivoKubernetesVersion {
  version: string;
  label: string;
  type: string;
}