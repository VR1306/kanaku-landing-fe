import "server-only";
import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { ApiError } from "../http/errors";
import { fail } from "./response";

type RouteHandler = (request: NextRequest) => Promise<Response> | Response;

/**
 * Wraps a route handler with centralized error handling so every BFF endpoint
 * returns the same envelope and never leaks internal error details.
 */
export function withApiHandler(handler: RouteHandler): RouteHandler {
  return async (request) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return fail(400, "VALIDATION_ERROR", "Request validation failed", error.issues);
      }
      if (error instanceof ApiError) {
        return fail(error.status, error.code, error.message, error.details);
      }
      console.error("[bff] unhandled error", error);
      return fail(500, "INTERNAL_ERROR", "Something went wrong");
    }
  };
}

/** Parses and validates a JSON body. Throws a ZodError / ApiError on failure. */
export async function parseJsonBody<T>(request: NextRequest, schema: z.ZodType<T>): Promise<T> {
  const raw: unknown = await request.json().catch(() => {
    throw new ApiError(400, "INVALID_JSON", "Request body must be valid JSON");
  });
  return schema.parse(raw);
}

/** Constant-time bearer-secret check. A missing server secret disables the endpoint. */
export function requireBearerSecret(request: NextRequest, secret: string | undefined): void {
  if (!secret) throw new ApiError(503, "NOT_CONFIGURED", "Endpoint is not configured");

  const header = request.headers.get("authorization") ?? "";
  const provided = Buffer.from(header.startsWith("Bearer ") ? header.slice(7) : "");
  const expected = Buffer.from(secret);
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    throw new ApiError(401, "UNAUTHORIZED", "Invalid or missing credentials");
  }
}
