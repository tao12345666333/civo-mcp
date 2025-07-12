import { CIVO_API_KEY, CIVO_API_URL, checkRateLimit, CivoInstance, CivoInstanceList } from "./civo.js";

export async function createInstance(params: {
  hostname: string;
  size: string;
  template_id: string;
  count?: number;
  region?: string;
}): Promise<CivoInstance> {
  checkRateLimit();
  
  const url = `${CIVO_API_URL}/instances`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      hostname: params.hostname,
      size: params.size,
      template_id: params.template_id,
      count: params.count?.toString() || "1",
      region: params.region || "LON1"
    })
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function listInstances(params: {
  region?: string;
  page?: number;
  per_page?: number;
}): Promise<CivoInstanceList> {
  checkRateLimit();
  
  const url = new URL(`${CIVO_API_URL}/instances`);
  if (params.region) url.searchParams.set("region", params.region);
  if (params.page) url.searchParams.set("page", params.page.toString());
  if (params.per_page) url.searchParams.set("per_page", params.per_page.toString());

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

export async function rebootInstance(params: {
  id: string;
  region: string;
}): Promise<any> {
  checkRateLimit();
  
  const url = `${CIVO_API_URL}/instances/${params.id}/reboots`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    },
    body: new URLSearchParams({
      region: params.region
    })
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function shutdownInstance(params: {
  id: string;
  region: string;
}): Promise<any> {
  checkRateLimit();
  
  const url = `${CIVO_API_URL}/instances/${params.id}/stop`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    },
    body: new URLSearchParams({
      region: params.region
    })
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function startInstance(params: {
  id: string;
  region: string;
}): Promise<any> {
  checkRateLimit();
  
  const url = `${CIVO_API_URL}/instances/${params.id}/start`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    },
    body: new URLSearchParams({
      region: params.region
    })
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function resizeInstance(params: {
  id: string;
  size: string;
  region: string;
}): Promise<any> {
  checkRateLimit();
  
  const url = new URL(`${CIVO_API_URL}/instances/${params.id}/resize`);
  url.searchParams.set("region", params.region);

  const response = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    },
    body: new URLSearchParams({
      size: params.size
    })
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function deleteInstance(params: {
  id: string;
  region: string;
}): Promise<any> {
  checkRateLimit();
  
  const url = new URL(`${CIVO_API_URL}/instances/${params.id}`);
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