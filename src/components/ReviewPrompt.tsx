"use client";

import { useEffect, useState } from "react";

/** In-app review flywheel — prompt at moment of delivered value. */
export function ReviewPrompt({ fixedCount }: { fixedCount: number }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (fixedCount >= 3 && !dismissed) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [fixedCount, dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm card border-[var(--gold)] p-5 shadow-2xl">
      <p className="font-display text-lg font-semibold text-[var(--forest)]">
        You just fixed {fixedCount} products
      </p>
      <p className="mt-1 text-sm text-[var(--ink)]/70">
        That review on the Shopify App Store is how other merchants find ShelfCheck — and how we
        stay faceless and growing. 30 seconds helps the whole category.
      </p>
      <div className="mt-3 flex gap-2">
        <a
          className="btn-primary !py-2"
          href="https://apps.shopify.com/shelfcheck"
          target="_blank"
          rel="noreferrer"
          onClick={() => setDismissed(true)}
        >
          Leave a review
        </a>
        <button className="btn-secondary !py-2" type="button" onClick={() => setDismissed(true)}>
          Later
        </button>
      </div>
    </div>
  );
}
