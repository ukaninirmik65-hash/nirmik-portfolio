# Contact form and portfolio QA — 4 November 2026

## Resolved screenshot issue

The screenshot showed an unconfigured Web3Forms form, not a validation failure. The owner supplied the public Web3Forms form identifier, which is now configured in the frontend with an optional Vite environment override. No Gmail password or private account token is used.

## Real end-to-end result

- Submitted one clearly labeled QA inquiry through https://nirmik-portfolio.vercel.app/ using the normal client-facing contact dialog.
- Included the required name, email, service and brief, plus company, pages, timeline, design readiness, reference URL and three feature selections.
- Observed the sending state, followed by Web3Forms-confirmed success. The form reset only after that success and keyboard focus moved to the confirmation.
- The owner explicitly confirmed **Received in Inbox** at the destination Gmail account. This verifies a real website-to-Web3Forms-to-Gmail delivery.
- Reply-To is explicitly set to the visitor email and covered by the payload tests. No third-party test recipient was contacted.

## Fixes

- Configured the supplied public form identifier to resolve the missing-configuration failure.
- If configuration is removed in the future, show an upfront availability notice and offer complete email/WhatsApp drafts rather than a dead-end Send action. Drafts are never presented as delivered messages.
- Kept the close control visible while scrolling the long dialog.
- Focus submission feedback after success/failure, while avoiding focus theft if the dialog was closed during the request.
- Added a visible project-description minimum/character-count hint linked to the textarea.
- Retained every dropdown choice, all optional details, frontend services, personal content and manual quotation rules.

## QA coverage

- All 17 automated tests pass: field validation, every dropdown option, exact supplied portrait integrity, complete submission serialization, Reply-To, duplicate-safe request handling, API/HTTP/malformed/network/timeout failures, missing keys and honeypot handling.
- Browser checks at 1440px desktop, 768px tablet and 320px mobile widths: no horizontal overflow; usable contact dialog, mobile navigation, Escape dismissal and focus restoration.
- Tested optional-detail validation: an invalid hidden reference URL opens its section and receives focus.
- Email/WhatsApp draft URLs include the complete selected brief and explicitly require manual sending.
- Mock transport checks: double-click sends once, loading disables controls, errors retain data, unconfirmed responses never show success, successful responses reset fields and focus confirmation.
- Portfolio checks: all internal anchor destinations exist, all seven projects render, In Progress filtering returns two projects, FAQ expands, theme switching persists after reload, and the complete original portrait remains 1122×1402 with contain sizing. No displayed prices or automatic quotations.
- No browser console errors or warnings observed during the checks. The production build passes.

Remote project/social sites can change independently. The checks above are browser viewport tests, not exhaustive testing on every physical device or browser.

## Developer cursor QA

- Production build and all 17 existing tests pass; no new runtime dependencies. The initial production JS increase is about 1.3 KB gzip.
- Browser verified: one cursor layer, pointer-events:none, interactive button state, image/card states, working project filter clicks, saved standard-cursor opt-out across reload, and theme-matched dark/light ring colors.
- Contact dialog immediately restores the native cursor, accepts text input, closes with Escape, and unlocks page scrolling. The original photo retains contain sizing and no CSS filter.
- At 390px mobile width both the cursor layer and toggle are hidden, the normal cursor is restored, and there is no horizontal overflow. Keyboard navigation also restores the native cursor. No console warnings or errors observed.
- Reduced-motion, coarse-pointer, and forced-color behavior is guarded in both CSS and matchMedia lifecycle logic. OS accessibility preferences were not changed during this browser check.
- Performance review: only transform writes on two elements, no layout reads per frame, one loop that stops when settled, and cleanup of listeners/observer/frames on opt-out or unmount. This is not a formal FPS benchmark.
