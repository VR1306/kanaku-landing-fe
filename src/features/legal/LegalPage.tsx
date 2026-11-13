import Link from "next/link";
import { notFound } from "next/navigation";
import { Brand, Container } from "@/components/ui";
import { getLandingConfig } from "@/features/landing";
import { getLegalDocument, type LegalSlug } from "./service";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function Unavailable({ brand }: { brand: string }) {
  return (
    <main id="main" className="flex-1 py-24">
      <Container className="max-w-[640px] text-center">
        <h1 className="font-heading text-3xl font-bold text-ink">
          This page is temporarily unavailable
        </h1>
        <p className="mt-4 text-ink-muted">
          We couldn&apos;t load this document right now. Please try again in a moment.
        </p>
        <Link href="/" className="mt-8 inline-block font-semibold text-primary underline">
          ← Back to {brand}
        </Link>
      </Container>
    </main>
  );
}

/** A published legal document. All text comes from the Admin Portal. */
export async function LegalPage({ slug }: { slug: LegalSlug }) {
  const [result, { site }] = await Promise.all([getLegalDocument(slug), getLandingConfig()]);
  if (result.status === "missing") notFound();
  if (result.status === "unavailable") return <Unavailable brand={site.brand.name} />;
  const doc = result.doc;

  return (
    <>
      <header className="border-b border-line bg-inverse py-4 text-on-inverse">
        <Container className="flex items-center justify-between">
          <Link href="/" aria-label={`${site.brand.name} home`}>
            <Brand name={site.brand.name} />
          </Link>
          <Link href="/" className="text-sm text-on-inverse-muted hover:text-on-inverse">
            ← Back to home
          </Link>
        </Container>
      </header>
      <main id="main" className="flex-1 py-12 lg:py-16">
        <Container className="max-w-[860px]">
          <p className="text-[13px] font-bold tracking-[0.14em] text-accent-dark uppercase">
            Last updated {dateFormat.format(new Date(doc.updated))}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-ink lg:text-5xl">{doc.title}</h1>
          {doc.summary ? (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{doc.summary}</p>
          ) : null}

          <nav aria-label="Contents" className="mt-8 rounded-2xl border border-line p-5">
            <p className="text-sm font-semibold text-ink">On this page</p>
            <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-ink-body underline-offset-2 hover:underline">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 space-y-10">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-6">
                <h2 className="font-heading text-2xl font-bold text-ink">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-ink-body">
                  {s.blocks.map((b, j) =>
                    typeof b === "string" ? (
                      <p key={j}>{b}</p>
                    ) : (
                      <ul key={j} className="list-disc space-y-2 pl-6">
                        {b.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
