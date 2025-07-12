import { CIVO_API_KEY, CIVO_API_URL, checkRateLimit, CivoKubernetesCluster, CivoKubernetesClusterList, CivoKubernetesVersion } from "./civo.js";

export async function listClusters(params: {
  region?: string;
}): Promise<CivoKubernetesClusterList> {
  checkRateLimit();
  
  const url = new URL(`${CIVO_API_URL}/kubernetes/clusters`);
  if (params.region) url.searchParams.set("region", params.region);

  const response = await fetch(url.toString(), {
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function createCluster(params: {
  name: string;
  region: string;
  network_id: string;
  nodes: number;
  node_size: string;
  kubernetes_version: string;
}): Promise<CivoKubernetesCluster> {
  checkRateLimit();
  
  const url = `${CIVO_API_URL}/kubernetes/clusters`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      name: params.name,
      region: params.region,
      network_id: params.network_id,
      nodes: params.nodes.toString(),
      node_size: params.node_size,
      kubernetes_version: params.kubernetes_version
    })
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function deleteCluster(params: {
  id: string;
  region: string;
}): Promise<any> {
  checkRateLimit();
  
  const url = new URL(`${CIVO_API_URL}/kubernetes/clusters/${params.id}`);
  url.searchParams.set("region", params.region);

  const response = await fetch(url.toString(), {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    },
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function listAvailableVersions(): Promise<CivoKubernetesVersion[]> {
  checkRateLimit();
  
  const url = `${CIVO_API_URL}/kubernetes/versions`;
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
