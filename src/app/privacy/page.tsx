import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/LegalPage";
import { getLegalDocument } from "@/features/legal/service";

export async function generateMetadata(): Promise<Metadata> {
  const r = await getLegalDocument("privacy");
  const doc = r.status === "ok" ? r.doc : null;
  return { title: doc?.title ?? "Privacy Policy", description: doc?.summary || undefined };
}

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
