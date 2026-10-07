// instrumentation-client.ts
import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest",
    ui_host: "https://us.posthog.com", // o https://eu.posthog.com si elegiste EU
    defaults: "2026-05-30",
    capture_pageview: false, // lo manejamos manualmente en App Router
    capture_pageleave: true,
});