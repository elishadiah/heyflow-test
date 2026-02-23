"use client";

import Script from "next/script";

export function QuoteComponent() {
    return (
        <div>
            <div id="heyflow-container" className="w-full max-w-2xl"></div>

            <Script src="https://embed.heyflow.com/widget/4E1ANQvq0m7P4ru5OJ8S.js" strategy="afterInteractive" />
        </div>
    )
}