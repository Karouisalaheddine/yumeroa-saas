/**
 * Yumeroa Headless WordPress Client
 * We use a simple REST implementation here for MVP sync. 
 * Advanced configurations may upgrade to WPGraphQL if nested node parsing is required.
 */

const WP_API_URL = process.env.WP_API_URL || 'https://placeholder.wp.com/wp-json/wp/v2';
const WP_API_USER = process.env.WP_API_USER;
const WP_API_APP_PASS = process.env.WP_API_APP_PASS; // WP Application Password

type WPFetchOptions = {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  cache?: RequestCache;
  revalidate?: number;
};

export async function fetchWP<T>({ endpoint, method = 'GET', body, cache = 'force-cache', revalidate }: WPFetchOptions): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (WP_API_USER && WP_API_APP_PASS) {
    const encoded = Buffer.from(`${WP_API_USER}:${WP_API_APP_PASS}`).toString('base64');
    headers['Authorization'] = `Basic ${encoded}`;
  }

  const url = `${WP_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    ...(revalidate !== undefined ? { next: { revalidate } } : {}),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`WP Fetch Failed (${url}):`, res.status, errorBody);
    throw new Error(`WordPress API Error: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// Example specific functions
export async function getWPPost(id: number) {
  return fetchWP<any>({ endpoint: `/posts/${id}?_embed` });
}

export async function getWPCategories() {
  return fetchWP<any[]>({ endpoint: `/categories` });
}
