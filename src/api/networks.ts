import { CIVO_API_KEY, CIVO_API_URL } from './civo.js';

export interface Network {
  id: string;
  name: string;
  default: boolean;
  cider: string;
  label: string;
}

export async function listNetworks(): Promise<Network[]> {
  const url = `${CIVO_API_URL}/networks`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CIVO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to list networks: ${response.statusText}`);
  }

  return await response.json();
}

export async function createNetwork(params: {
  label: string;
  region?: string;
}): Promise<any> {
  const url = `${CIVO_API_URL}/networks`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CIVO_API_KEY}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(`Failed to create network: ${response.statusText}`);
  }

  return await response.json();
}

export async function renameNetwork(params: {
  id: string;
  label: string;
  region?: string;
}): Promise<any> {
  const url = `${CIVO_API_URL}/networks/${params.id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CIVO_API_KEY}`,
    },
    body: JSON.stringify({ label: params.label, region: params.region }),
  });

  if (!response.ok) {
    throw new Error(`Failed to rename network: ${response.statusText}`);
  }

  return await response.json();
}

export async function deleteNetwork(params: {
  id: string;
  region: string;
}): Promise<any> {
  const url = new URL(`${CIVO_API_URL}/networks/${params.id}`);
  url.searchParams.set('region', params.region);

  const response = await fetch(url.toString(), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${CIVO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete network: ${response.statusText}`);
  }

  return await response.json();
}
