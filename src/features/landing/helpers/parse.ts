import { landingShellSchema, sectionSchema, type LandingConfig } from "../schemas/config";

export type ParseResult =
  { ok: true; config: LandingConfig; issues: string[] } | { ok: false; issues: string[] };

/**
 * Validates untrusted (e.g. API-provided) landing content.
 * A broken shell rejects the payload; a broken individual section is skipped
 * so one bad entry cannot take the whole page down.
 */
export function parseLandingConfig(raw: unknown): ParseResult {
  const shell = landingShellSchema.safeParse(raw);
  if (!shell.success) {
    return {
      ok: false,
      issues: shell.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
    };
  }

  const issues: string[] = [];
  const sections: LandingConfig["sections"] = [];
  shell.data.sections.forEach((candidate, index) => {
    const result = sectionSchema.safeParse(candidate);
    if (result.success) sections.push(result.data);
    else issues.push(`sections.${index}: ${result.error.issues[0]?.message ?? "invalid section"}`);
  });

  return { ok: true, config: { ...shell.data, sections }, issues };
}
