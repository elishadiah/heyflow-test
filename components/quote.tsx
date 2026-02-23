"use client";

import { createElement, useEffect, useState } from "react";

export function QuoteComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mt-12 w-full min-h-[400px]" aria-label="Heyflow">
      {mounted &&
        createElement("heyflow-wrapper", {
          "flow-id": "4E1ANQvq0m7P4ru5OJ8S",
          "dynamic-height": true,
          "scroll-up-on-navigation": true,
          "style-config": '{"width":"800px"}',
        })}
    </section>
  );
}