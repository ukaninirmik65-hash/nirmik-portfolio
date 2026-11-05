# Final portfolio QA audit — 5 November 2026

## Result and scope

**8 findings fixed. 1 remaining performance finding documented.** No unresolved functional failure was observed in the executed checks. This is evidence for the tested scope, not a guarantee that every browser, device, assistive technology, or future third-party service response is bug-free.

The existing design, NU logo, palette, content, project statuses, services, form controls/options, animations and manual quotation policy are preserved. No prices, pricing calculator, testimonials, or resume download were added.

## Findings and regression results

| ID | Finding / root cause | Change and retest | Status |
| --- | --- | --- | --- |
| B01 | The original email regex accepted malformed local parts and empty domain labels. | Validate local-part dot rules, domain labels, length and hyphens. Malformed addresses now produce field errors and zero requests; valid plus addresses and subdomains pass. | PASS |
| B02 | Phone validation accepted repeated or misplaced plus signs. | Normalize common formatting, then allow one leading plus and 7–15 digits. Invalid examples are rejected; formatted international numbers pass. | PASS |
| B03 | An old success message remained when a subsequent Send or Prepare draft attempt failed validation. | Clear prior success before validating a new attempt. Browser regression: four field errors, no success message, no extra request. | PASS |
| B04 | Selecting another service externally could leave a previous submission success visible. | Clear success/draft state when a service starts a new inquiry. Browser fixture confirms the new service without stale success. | PASS |
| B05 | The rotating-role span had an accessible name on a generic element, flagged by Lighthouse. | Add an appropriate group role. Final Lighthouse accessibility score: 100. | PASS |
| B06 | A Google Fonts CSS import introduced a render-blocking external dependency waterfall. | Self-host the same Latin variable fonts, retain their licenses, and preload them. No font family or layout redesign. Final FCP: mobile 1.9 s, desktop 0.2 s. | PASS |
| B07 | The original portrait was discovered only after JavaScript and transferred as a 1.85 MB PNG. | Preload a pixel-identical lossless WebP source with the original PNG fallback. WebP is 1.23 MB; original and decoded pixels are unchanged. Actual image loading and dimensions verified. Further mobile cost remains in B09. | PASS |
| B08 | An external service-card request during a pending submission changed the visible service while the submitted brief retained the old one. | Freeze the in-flight service and restore conflicting external changes until the request completes. Browser fixture: visible and captured service both Figma, controls disabled, double-click sends once. | PASS |
| B09 | Mobile loading is still slow under Lighthouse's simulated mobile conditions. | Lossless delivery and font fixes reduce LCP from 11.6 s to 8.3 s, but the full-resolution portrait remains expensive and initial JS contributes blocking work. No lossy compression, downscaling or feature removal was applied. | FAIL |

There are **9 findings in total: 8 fixed, 1 remaining**. B09 prevents an honest all-green performance or “zero known issues” claim. Further portrait downscaling/lossy delivery would conflict with the owner's explicit photo requirements.

## Executed functional checks

| Area | Executed checks | Result |
| --- | --- | --- |
| Navigation | Five desktop navigation links and active indicators; all eight mobile links; footer anchors, logo/home and section destinations | PASS |
| Mobile menu | Open/close, links close the menu, keyboard focus trap, Escape restores trigger focus, body scrolling unlocks | PASS |
| Theme | Both themes across the responsive matrix; toggle and persisted theme behavior | PASS |
| Tech Stack | All 11 technology buttons update their explanation, including beginner TypeScript/Next.js content | PASS |
| Projects | All work = 7, React = 3, JavaScript = 1, Websites = 3, In Progress = 2; seven scope disclosures open/close | PASS |
| Services | All seven service links open the inquiry dialog with the matching service selected | PASS |
| FAQ | All four disclosures open/close, including keyboard activation | PASS |
| External projects | Clicked all seven source and four demo links; destinations opened. Separate repository API and live-demo HTTP checks returned 200. Atal demo redirects to its login screen. | PASS |
| Social links | GitHub, Instagram and Freelancer destinations opened. LinkedIn points to the supplied profile but redirects to LinkedIn's authentication wall. | PASS / BLOCKED for viewing LinkedIn profile behind authentication |
| Contact | Copy-email confirmation; complete encoded mailto and WhatsApp drafts; WhatsApp link opens its Share page with the correct number/message | PASS |
| External contact clients | Sending a mailto draft through a configured local mail app or sending a WhatsApp message was not performed. The online Web3Forms route was tested separately. | BLOCKED |
| Modal | Inside clicks stay open; outside backdrop click closes; dragging a text selection from inside to outside stays open; Escape and close button work; six repeated open/close cycles unlock body scrolling | PASS |
| Console | No application console warnings/errors observed in the production interaction check; final Lighthouse best-practices audit also passed | PASS |

Initial immediate filter samples were taken before React committed an update. They were superseded by checks waiting for the expected count. Early section screenshots taken during smooth scrolling were also superseded by settled `verified-desktop-*` captures; they are not evidence of a layout defect.

## Form validation and submission

The site has **one shared Contact / Project Inquiry form**, so both entry paths use the same tested fields, validators and transport.

- Empty submission: four required-field errors, first invalid field focused, zero requests.
- Malformed email and phone: rejected with field-specific feedback; valid corrections clear those errors.
- Optional details: retained company, page count, timeline, design readiness, reference URL and all four feature checkboxes.
- All 20 optional dropdown states (including placeholders) selected in the browser fixture; every service and dropdown option also covered by automated tests.
- Invalid optional URL, unsafe URL schemes, non-option values and short project descriptions rejected by tests. Hidden invalid optional details open for correction.
- Native typing respects the 100-character name and 3,000-character brief limits. Programmatic `fill()` can bypass HTML maxlength and was not misreported as a real typing defect.
- Leading/trailing spaces, punctuation, `<tags>`, Gujarati and emoji survive payload/draft encoding; submitted text is trimmed. Reply-To is the visitor's email.
- Simulated network failure, abort timeout, HTTP failure even with `success: true`, API error, unconfirmed response and HTML-like error text: error shown, data retained, button re-enabled, no success. Error text renders as text, not injected markup.
- Rapid double-click: one request. Controls disabled and `aria-busy=true` while pending.
- Confirmed success: reset only after success, feedback focused. New invalid Send/draft attempts clear stale success.
- Error and success regions remain separate. Errors can be dismissed; editing does not silently delete an API error.
- Honeypot, missing/placeholder configuration and malformed JSON behavior are covered by automated transport tests.

**Real delivery: PASS.** One clearly labeled `Portfolio QA — Final Audit` inquiry was submitted through the current production build served locally, using the configured real Web3Forms form identifier. The UI showed Sending, then Web3Forms-confirmed success and a reset form. The owner explicitly confirmed **Received in Inbox** at `ukaninirmik65@gmail.com`. This confirms the tested build-to-Web3Forms-to-Gmail path. It is separate from the earlier live-domain Inbox confirmation recorded in `QA-REPORT.md`; it must not be described as a new live-domain deployment test.

## Responsive and visual checks

Actual browser viewport dimensions recorded in the matrix:

| Viewport | Dark | Light |
| --- | --- | --- |
| 320 × 640 | PASS | PASS |
| 375 × 812 | PASS | PASS |
| 390 × 844 | PASS | PASS |
| 430 × 932 | PASS | PASS |
| 768 × 1024 | PASS | PASS |
| 1024 × 768 | PASS | PASS |
| 1280 × 800 | PASS | PASS |
| 1440 × 900 | PASS | PASS |
| 1920 × 1080 | PASS | PASS |

18 viewport/theme combinations and 126 section structural checks: no detected page horizontal overflow, header overlap, clipped card labels, broken images, or overflowing contact dialog. All seven page-count choices and six timeline choices remain present. Phone-width form inputs use 16px text. The dialog remains inside the viewport with one slim scroll area; it closes and unlocks page scrolling.

Visual review covered navbar, hero, About, Tech Stack, Experience, Projects, Services, Work Process, FAQ, Contact and footer in both palettes, with settled desktop captures and narrow mobile captures. No layout redesign was made. These are browser viewport checks, **not physical phone/tablet testing**.

### Photo integrity

- Original PNG retained byte-for-byte: **1122 × 1402**, 1,847,266 bytes.
- Original SHA-256: `26ce277474b2b42443791d9d098d02964acde49d08b643347ac961ae4e59fdd9`.
- Lossless WebP: **1122 × 1402**, 1,227,374 bytes (about 34% smaller).
- Decoded raw pixel buffers compare **exactly equal**. Image uses `object-fit: contain`; full aspect ratio retained. Original fallback is included.

## Cursor, accessibility and lifecycle checks

- Standard cursor: ordinary headings/paragraphs and non-clickable cards use `default`; buttons/links use `pointer`; editable controls retain native text behavior. Cursor classification regressions pass.
- Custom cursor: clicked position `(400, 360)` produced `translate3d(400px,360px,0px)` for the tip; layer uses `pointer-events: none`; standard-cursor toggle works. Actual text drag/highlight remains usable.
- Modal restores native interaction. Inside/outside clicks and text drag-out do not crash or accidentally dismiss the modal.
- Keyboard menu trap and Escape tested. Dialog initial/feedback focus, focus restoration and field labels are retained. Disclosure keyboard activation tested.
- Lighthouse accessibility: **100** on mobile and desktop. This is an automated audit, not a screen-reader certification.
- Reduced-motion/coarse-pointer/forced-color guards, listener cleanup, observer disconnects and animation-frame cancellation reviewed in code. No duplicate listener/runtime error surfaced in repeated overlay tests.
- **BLOCKED:** physical touch-device checks, independent Firefox/Safari/Edge interaction matrix, screen-reader testing, OS reduced-motion/forced-color switching and a long-duration heap/FPS profiling session were not performed. Do not infer these from the Chromium viewport tests or code review.

## Measured Lighthouse performance

Lighthouse **13.6.0**, production preview at `http://127.0.0.1:5191/`, Chrome headless, separate mobile and desktop runs. These are single lab runs, not real-user field data. Reports include exact audit configuration and timestamps.

| Metric | Baseline mobile | Final mobile | Final desktop |
| --- | --- | --- | --- |
| Performance | 62 | **64** | **95** |
| Accessibility | 96 | **100** | **100** |
| Best practices | 100 | **100** | **100** |
| SEO | 100 | **100** | **100** |
| First contentful paint | 2.4 s | 1.9 s | 0.2 s |
| Largest contentful paint | 11.6 s | 8.3 s | 1.5 s |
| Total blocking time | 380 ms | 400 ms | 70 ms |
| Cumulative layout shift | 0 | **0** | **0** |
| Speed index | 3.7 s | 3.0 s | 0.6 s |

Remaining mobile diagnostics include image delivery, approximately 64 KiB of unused-on-initial-load JavaScript, forced reflow and a render-blocking stylesheet. Some JavaScript supports below-fold features and animation. No claim is made that the site achieves a 90+ mobile performance score. The lossless photo constraint is preserved even though Lighthouse recommends smaller delivery dimensions.

## Build, security and deployment

- **PASS:** `npm test` — **26 passed, 0 failed**.
- **PASS:** `npm run build` — Vite 7.3.7; production CSS 59.51 kB / 12.70 kB gzip; JS 440.13 kB / 143.64 kB gzip.
- **PASS:** `git diff --check` — no whitespace errors (Git's LF/CRLF notices are not build/runtime failures).
- **PASS:** `npm audit --json` — 0 vulnerabilities reported across all severities at audit time.
- **PASS:** source review found no Gmail password, private API token or private-key pattern in the tested source/assets/configuration. Web3Forms uses a public form identifier; a Vite client variable is not private secret storage. Real environment files, node_modules, artifacts and ZIPs remain ignored by Git.
- **PASS:** external new-tab links retain `noopener noreferrer`; user text is rendered through React; no automatic pricing added. Sitemap/robots keep the supplied canonical public URL.
- **BLOCKED:** lint and type-check commands are not configured in this JavaScript repository. No invented lint/type-check pass is reported.
- **PASS — Deployment:** source commit `6a02955ffe1ae4d88a7755431c74c97773b65e15` pushed to `codex/portfolio` in `ukaninirmik65-hash/nirmik-portfolio`. GitHub's Vercel status reports successful deployment. The public site serves the tested `index-pLZx7EW9.js` and `index-CXPgsX2a.css` bundles. Downloaded live JS, CSS, lossless portrait and both font files compare byte-for-byte with the tested build. Sitemap and robots return HTTP 200 with the correct canonical URL (deployment line endings differ from the local Windows copy).
- **PASS — Live smoke test:** opened `https://nirmik-portfolio.vercel.app/`, confirmed the portrait and contact dialog, and reproduced malformed email/phone values. Both were correctly rejected with readable red field errors. No second real email was sent during this live smoke test; the real Inbox confirmation above belongs to the identical local production build.

## Exact files changed by this audit

Application/configuration:

- `index.html` — font/image resource preloads.
- `src/components/InquiryForm.jsx` — stale success state and in-flight service synchronization.
- `src/utils/inquiry.js` — email and phone validation.
- `src/sections/Introduction.jsx` — accessible role and lossless picture source.
- `src/data/portfolio.js` — optimized portrait source path.
- `src/styles/index.css` — same fonts self-hosted, picture wrapper sizing.
- `public/images/nirmik-ukani-lossless.webp` — new pixel-identical delivery asset.
- `public/fonts/dm-sans-latin-variable.woff2` and `space-grotesk-latin-variable.woff2` — self-hosted font files.
- `public/fonts/DM-Sans-OFL.txt` and `Space-Grotesk-OFL.txt` — licenses.

Verification/documentation:

- `tests/final-audit.test.js` — five regression tests.
- `tests/browser/form.jsx` — isolated mock failure modes and external service selection control, excluded from production.
- `FINAL-QA-REPORT.md` — this report.
- `README.md`, `QA-REPORT.md`, `VERIFICATION.md` — point to the current audit and distinguish historical results.

Local evidence is under `artifacts/final-audit/`: responsive matrix, interaction/form results, external destinations/HTTP checks, original-photo integrity, npm audit, Lighthouse JSON/HTML and screenshots. Tooling under `artifacts/qa-tools/` is isolated and is not a website dependency or ZIP requirement.
