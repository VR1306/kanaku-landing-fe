import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/LegalPage";
import { getLegalDocument } from "@/features/legal/service";

export async function generateMetadata(): Promise<Metadata> {
  const r = await getLegalDocument("terms");
  const doc = r.status === "ok" ? r.doc : null;
  return { title: doc?.title ?? "Terms & Conditions", description: doc?.summary || undefined };
}

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
