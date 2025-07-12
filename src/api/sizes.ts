import { CIVO_API_KEY, CIVO_API_URL } from './civo.js';

export interface Size {
  name: string;
  description: string;
  cpu_cores: number;
  ram_mb: number;
  disk_gb: number;
  selectable: boolean;
  type: string;
}

export async function listSizes(): Promise<Size[]> {
  const url = `${CIVO_API_URL}/sizes`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CIVO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to list sizes: ${response.statusText}`);
  }

  return await response.json();
}
