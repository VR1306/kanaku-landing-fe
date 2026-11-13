import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/LegalPage";
import { getLegalDocument } from "@/features/legal/service";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getLegalDocument("terms");
  return { title: doc?.title ?? "Terms & Conditions", description: doc?.summary || undefined };
}

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
