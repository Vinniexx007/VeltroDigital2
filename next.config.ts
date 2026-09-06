import type { NextConfig } from "next";

// Vercel deployment: no additional configuration is required beyond setting the
// RESEND_API_KEY environment variable in the Vercel dashboard (see the design
// document). Next.js 16 App Router deploys to Vercel with zero special config —
// this file only tunes image formats and pins the file-tracing root.
const nextConfig: NextConfig = {
  // Pin the output file tracing root to this project directory. The build log
  // warns about an inferred workspace root because there are multiple lockfiles
  // in ancestor directories; setting this explicitly silences that warning and
  // ensures tracing is scoped to this app. In Next 16.3.4 this is a top-level
  // config key (see node_modules/next/dist/docs/.../config/next-config-js/output.md).
  outputFileTracingRoot: __dirname,
  images: {
    // AVIF is preferred for browsers that support it, with WebP as a fallback.
    // Array order matters — the first matching format from the request's
    // `Accept` header is used. See task 10.3 (Requirement 17.4).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
