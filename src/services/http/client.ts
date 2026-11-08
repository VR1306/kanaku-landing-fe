import "server-only";
import type { z } from "zod";
import { ApiError } from "./errors";
import { buildUrl, type QueryParams } from "./url";

export interface HttpClientOptions {
  baseUrl: string;
  /** Bearer token; kept on the server and never sent to the browser. */
  token?: string;
  timeoutMs: number;
}

export interface RequestOptions<T> {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: QueryParams;
  body?: unknown;
  /** Validates the JSON response. */
  schema?: z.ZodType<T>;
  headers?: Record<string, string>;
}

/** Minimal fetch wrapper with timeout, auth header and normalized errors. */
export function createHttpClient({ baseUrl, token, timeoutMs }: HttpClientOptions) {
  async function request<T = unknown>(options: RequestOptions<T>): Promise<T> {
    const url = buildUrl(baseUrl, options.path, options.query);

    let response: Response;
    try {
      response = await fetch(url, {
        method: options.method ?? "GET",
        headers: {
          Accept: "application/json",
          ...(options.body !== undefined && { "Content-Type": "application/json" }),
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (cause) {
      const timedOut = cause instanceof DOMException && cause.name === "TimeoutError";
      throw new ApiError(
        timedOut ? 504 : 502,
        timedOut ? "UPSTREAM_TIMEOUT" : "UPSTREAM_UNREACHABLE",
        timedOut ? "Upstream request timed out" : "Upstream service is unreachable",
      );
    }

    if (!response.ok) {
      throw new ApiError(
        response.status >= 500 ? 502 : response.status,
        "UPSTREAM_ERROR",
        `Upstream responded with status ${response.status}`,
      );
    }

    const json: unknown = await response.json().catch(() => {
      throw new ApiError(502, "UPSTREAM_INVALID_RESPONSE", "Upstream returned invalid JSON");
    });
    if (!options.schema) return json as T;

    const parsed = options.schema.safeParse(json);
    if (!parsed.success) {
      throw new ApiError(502, "UPSTREAM_INVALID_RESPONSE", "Upstream response failed validation");
    }
    return parsed.data;
  }

  return { request };
}

export type HttpClient = ReturnType<typeof createHttpClient>;
