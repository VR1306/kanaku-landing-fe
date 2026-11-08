import { getLandingConfig, LandingRenderer } from "@/features/landing";

export default async function HomePage() {
  const config = await getLandingConfig();
  return <LandingRenderer config={config} />;
}
