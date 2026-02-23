"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useHeyflowEvents,
  type HeyflowEventName,
  type HeyflowEventPayload,
} from "@/hooks/useHeyflowEvents";

export function QuoteComponent() {
  const [mounted, setMounted] = useState(false);

  const handleHeyflowEvent = useCallback(
    (eventName: HeyflowEventName | string, payload: HeyflowEventPayload) => {
      // Track in your analytics (e.g. GA4, Mixpanel, or your API)
      console.log("[Heyflow]", eventName, payload);
      if (eventName === "heyflow-submit") {
        // Example: send conversion or save response
        // analytics.track("flow_submitted", payload);
      }
    },
    []
  );

  useHeyflowEvents(handleHeyflowEvent);

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