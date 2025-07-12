import { CIVO_API_KEY, CIVO_API_URL } from './civo.js';

export interface Region {
  code: string;
  name: string;
  default: boolean;
  country: string;
  type: string;
}

export async function listRegions(): Promise<Region[]> {
  const url = `${CIVO_API_URL}/regions`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CIVO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to list regions: ${response.statusText}`);
  }

  return await response.json();
}
