import { getLandingConfig } from "@/features/landing";
import { NotFoundView } from "@/features/landing/components/NotFoundView";

export default async function NotFound() {
  const { notFound } = await getLandingConfig();
  return <NotFoundView content={notFound} />;
}
