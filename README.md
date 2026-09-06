# Veltro Digital

Marketing website for Veltro Digital — a Next.js (App Router) site with five pages
(Home, Services, About, Work, Contact), statically generated, styled with Tailwind
CSS, and delivering contact enquiries via [Resend](https://resend.com). Deployed to
Vercel.

## Development

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
npm test           # run Vitest unit and property-based tests
npm run test:e2e   # run Playwright end-to-end tests
npm run build      # production build
```

Copy `.env.example` to `.env.local` and fill in the values before running the
contact form locally:

```bash
cp .env.example .env.local
```

Using `RESEND_API_KEY=test` in development or CI triggers a mock send path, so no
real email is dispatched.

## Performance (Lighthouse CI)

Performance is enforced with [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
against a budget of a 90+ performance score (Requirement 17.1). Accessibility is
also checked at 90+ as a warning.

```bash
npm run lighthouse   # production build, then run Lighthouse CI against all 5 pages
```

The `lighthouse` script runs `npm run build` first because `lhci autorun` starts
the production server (`npm run start`), which requires an existing build. It
audits Home, Services, About, Work, and Contact using the `desktop` preset. A
performance score below 0.9 fails the run (`error`); accessibility below 0.9 only
warns. This is intended to run in CI; it needs Chrome and is slow to run locally.

## Environment Variables

| Variable               | Required | Description                                                    |
| ---------------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | Resend API key used by the contact form to send enquiry emails. |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Public site URL (e.g. `https://www.veltrodigital.co.uk`).       |

Never commit real values. `.env.local` is gitignored; `.env.example` holds
placeholders only.

## Deployment (Vercel)

No additional Vercel configuration is required beyond the environment variables —
this is a standard Next.js App Router app.

1. Connect the repository to Vercel (import the project from your Git provider).
2. In the Vercel project settings, add the environment variables above:
   - `RESEND_API_KEY` — your real Resend API key.
   - `NEXT_PUBLIC_SITE_URL` — `https://www.veltrodigital.co.uk`.
3. Deploy. Vercel auto-detects Next.js; no `vercel.json` is needed.
