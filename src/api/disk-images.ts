import { CIVO_API_KEY, CIVO_API_URL, checkRateLimit, CivoDiskImage, CivoDiskImageList } from "./civo.js";

export async function listDiskImages(params: {
  region?: string;
}): Promise<CivoDiskImageList> {
  checkRateLimit();
  
  const url = new URL(`${CIVO_API_URL}/disk_images`);
  if (params.region) url.searchParams.set("region", params.region);

  const response = await fetch(url.toString(), {
    headers: {
      "Authorization": `Bearer ${CIVO_API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`Civo API error: ${response.status} ${response.statusText}`);
  }

  return { items: await response.json() };
}

export async function getDiskImage(params: {
  id: string;
  region: string;
}): Promise<CivoDiskImage> {
  checkRateLimit();
  
  const url = new URL(`${CIVO_API_URL}/disk_images/${params.id}`);
  url.searchParams.set("region", params.region);

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