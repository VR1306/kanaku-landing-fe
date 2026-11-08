export type QueryParams = Record<string, string | number | boolean | undefined>;

/** Resolves `path` against `baseUrl` (keeping any base path) and appends defined query params. */
export function buildUrl(baseUrl: string, path: string, query?: QueryParams): URL {
  const url = new URL(path.replace(/^\//, ""), baseUrl.replace(/\/?$/, "/"));
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url;
}
