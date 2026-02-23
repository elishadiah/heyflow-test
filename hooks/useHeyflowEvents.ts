"use client";

import { useEffect, useRef } from "react";

/** Known Heyflow dataLayer event names */
export type HeyflowEventName =
  | "heyflow-init"
  | "heyflow-exit"
  | "heyflow-change"
  | "heyflow-submit"
  | "heyflow-screen-view"
  | "heyflow-screen-leave"
  | "heyflow-button-click"
  | "heyflow-input-click";

/** Payload pushed to dataLayer (structure varies by event) */
export interface HeyflowEventPayload {
  event?: string;
  /** Present on heyflow-change, heyflow-submit, etc. */
  fields?: unknown;
  fieldsSimple?: Record<string, unknown>;
  screen_name?: string;
  screen_id?: string;
  previous_screen_id?: string;
  previous_screen_name?: string;
  custom_event_name?: string;
  custom_event_label?: string;
  [key: string]: unknown;
}

export type HeyflowEventHandler = (
  eventName: HeyflowEventName | string,
  payload: HeyflowEventPayload
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Subscribe to Heyflow dataLayer events in your Next.js app.
 * Call this in a client component that mounts with or after the Heyflow embed.
 *
 * @param onEvent - Called for each Heyflow event (e.g. heyflow-submit, heyflow-screen-view).
 */
export function useHeyflowEvents(onEvent: HeyflowEventHandler): void {
  const handlerRef = useRef(onEvent);
  handlerRef.current = onEvent;

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    const originalPush = window.dataLayer.push.bind(window.dataLayer);

    window.dataLayer.push = function (
      ...args: unknown[]
    ): ReturnType<typeof originalPush> {
      const first = args[0];
      if (
        first &&
        typeof first === "object" &&
        "event" in first &&
        typeof (first as { event: string }).event === "string"
      ) {
        const payload = first as HeyflowEventPayload;
        const eventName = payload.event as HeyflowEventName | string;
        if (eventName?.startsWith("heyflow-")) {
          try {
            handlerRef.current(eventName, payload);
          } catch (e) {
            console.error("[useHeyflowEvents]", e);
          }
        }
      }
      return originalPush(...args);
    };

    return () => {
      window.dataLayer!.push = originalPush;
    };
  }, []);
}
