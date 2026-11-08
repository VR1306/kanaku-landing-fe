import { z } from "zod";
import { parseLandingConfig } from "./parse";
import { landingConfigSchema } from "../schemas/config";

/** JSON Schema of the config, so an admin console can build forms and validate client-side. */
export function getLandingJsonSchema() {
  return z.toJSONSchema(landingConfigSchema, { io: "input", unrepresentable: "any" });
}

export interface ValidationReport {
  valid: boolean;
  issues: string[];
}

/** Strict check used before publishing: any skipped section makes the draft invalid. */
export function validateLandingContent(raw: unknown): ValidationReport {
  const result = parseLandingConfig(raw);
  const issues = result.issues;
  return { valid: result.ok && issues.length === 0, issues };
}
