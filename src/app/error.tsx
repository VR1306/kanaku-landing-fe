"use client";

import { Container } from "@/components/ui";
import { useLabels } from "@/features/landing/components/LabelsProvider";

export default function Error({ retry }: { error: Error; retry: () => void }) {
  const labels = useLabels();

  return (
    <main className="flex flex-1 items-center py-20 text-center">
      <Container>
        <h1 className="font-heading text-3xl font-bold">{labels?.errorTitle}</h1>
        <p className="mt-3 text-ink-muted">{labels?.errorMessage}</p>
        {labels && (
          <button
            type="button"
            onClick={() => retry()}
            className="mt-6 h-12 rounded-full bg-primary px-6 font-bold text-on-primary"
          >
            {labels.retry}
          </button>
        )}
      </Container>
    </main>
  );
}
