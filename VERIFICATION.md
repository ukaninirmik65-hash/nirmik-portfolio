# Verification — 3 November 2026

## Latest update: Web3Forms integration

**Implemented with an access-key placeholder. A real successful Web3Forms submission and email delivery are NOT verified. No access key has been supplied.** Follow the configuration and real-inbox checklist in README before considering delivery live.

- The site contains one shared Contact / Project Inquiry form; all existing forms are covered.
- Preserved all seven services, seven page-count options, six timeline options, four design-readiness options, all four checkboxes, and all existing input fields. Added the requested optional WhatsApp/phone field.
- Requests use `fetch`, multipart `FormData`, `Accept: application/json`, and the official endpoint. All fields and checkbox states are serialized, including human-readable project/page/timeline labels.
- The client email is used for `replyto`; a hidden `botcheck` checkbox and a local honeypot guard are included.
- Synchronous duplicate guard plus disabled controls/button during sending. Errors never reset the form; only HTTP success plus `success: true` resets values and service selection.
- **14 automated tests pass**, covering serialization, optional phone validation, Reply-To, missing keys, honeypot, API/HTTP errors, network failures, malformed responses, timeouts, and earlier portfolio/inquiry checks.
- **Production build passes**, 419.47 kB JS / 136.48 kB gzip, 38.06 kB CSS / 8.62 kB gzip.
- Browser mock fixture: a double-click generated one request, controls were disabled and `aria-busy` true while sending, a mocked API error preserved text/selections/checkboxes, and a mocked success cleared the form. This fixture never contacts Web3Forms and is excluded from the production build.
- Actual site on desktop and 390px mobile: required-field validation, clear missing-key error, retained values, preserved dropdown options, and direct email/WhatsApp alternatives verified. No horizontal overflow. Fresh production tab reported no console warnings or errors.
- A credential-free request to the official endpoint received HTTP 403 / a Cloudflare challenge. No challenge was bypassed, no invented key was sent, and no email was delivered by this probe. This does not establish whether a correctly configured browser submission will succeed.
- No automatic prices or pricing calculations were added. Photo and unrelated sections are unchanged.

The ZIP includes `.env.example`, the configured-source placeholder, source, tests, docs, dependency lockfile, and a fresh production build. No `.env.local` or real access key is included. The prebuilt form intentionally stays unconfigured until the owner supplies the key and rebuilds.

### Original site checks (before the Web3Forms update)

The original draft-only form behavior and test totals below are historical and superseded by the latest update above.

This is a newly built portfolio in `updated-portfolio`; no deleted project or old ZIP was required.

## Automated checks

- Dependencies installed successfully; the installation audit reported 0 vulnerabilities at that time.
- `npm test`: **7 passed, 0 failed**.
- `npm run build`: **passed**, Vite 7.3.7.
- Production JavaScript: 415.65 kB / 135.08 kB gzip.
- Production CSS: 37.83 kB / 8.57 kB gzip.
- Source formatted with Prettier.

Tests cover required fields, every dropdown value, invalid selections, email and URL validation, minimum brief length, complete message encoding, accurate project statuses, beginner skill labels, asset existence, and the portrait's SHA-256 hash and original pixel dimensions.

## Browser checks

Checked the development server and a fresh production preview at localhost.

- Desktop, tablet, and mobile layouts checked at **1440×1000**, **1280×720**, **768×1024**, **390×844**, and **320×740**.
- No horizontal overflow at the checked widths, comparing document scroll width with document client width (including scrollbar allowance).
- Original portrait loads at **1122×1402** pixels and displays with its original ratio, `height:auto`, and `object-fit:contain`. No crop, filters, stretching, or obscuring overlays.
- Dark/light modes switch correctly; theme selection persists after reload.
- All eight required sections and all seven project cards render.
- In Progress filtering shows exactly Atal Kriya and Motiwala Perfumes Clone. All Work restores seven cards.
- Scope notes and FAQ disclosures expand correctly.
- No unresolved internal anchor destinations, duplicate IDs, or failed loaded images were found. One H1 is present.
- Service-card links select the corresponding inquiry service.
- Every service choice, all seven page-count choices, all six timeline choices, all four design-readiness choices, and all four checkboxes were exercised in the browser.
- Empty form validation highlights required fields and focuses the first invalid field.
- A valid inquiry prepares email and WhatsApp links containing the selected pages, timeline, service, design, features, and message.
- Changing a field invalidates the old prepared draft, requiring preparation again.
- Desktop and mobile inquiry preparation tested; no real inquiry was sent.
- Copy-email button reports success.
- Mobile menu opens, focuses its first link, contains keyboard focus, and closes with Escape, restoring focus to the menu toggle.
- Fresh production tab reported **no console warnings or errors**.
- No displayed rupee amounts or automatic pricing appear in the page or prepared messages. The new source has no price-calculation utility.

Reduced-motion support is implemented through CSS media queries, Motion's `reducedMotion="user"`, and the role animation hook. The operating system preference was not changed during browser testing. This is not a formal accessibility certification or exhaustive device/browser compatibility test.

## Photo integrity

The uploaded `Professional Corporate Portrait.png` was copied byte-for-byte to `public/images/nirmik-ukani.png`.

SHA-256:

`26CE277474B2B42443791D9D098D02964ACDE49D08B643347AC961AE4E59FDD9`

Original dimensions: **1122×1402**. File size: **1,847,266 bytes**. The exact asset is also included in the production build.

## External content

- Anita Jewellery, Neelmadhav Public School, ERP, and Atal Kriya deployment links were verified in the browser on the delivery date. ERP and Atal Kriya open login screens.
- Anita and school screenshots were captured from their actual deployments. All other covers are explicitly labeled illustrations.
- Prior unavailable Tetris and agency deployments are omitted from demo links. Source repositories remain linked for all seven projects.
- Social/profile URLs match the supplied details. Third-party destinations may change after delivery.
- Completion statuses follow the owner's confirmation. Scope notes do not claim unfinished ERP modules, real backend authentication, live tracking, client relationships, or ecommerce checkout.

No testimonials, resume, experience totals, availability promises, or achievements were fabricated. No public hosting deployment, email delivery, or WhatsApp message sending was performed. GitHub publication is part of the final enhancement delivery.

## Delivery

The ZIP contains source, project assets, package manifest and lockfile, Vite configuration, tests, documentation, and the prebuilt `dist` folder. `node_modules`, Git metadata, temporary browser artifacts, and secrets are excluded. Run `npm install` after extraction, then `npm run dev`, or `npm run preview` to view the included production build.

## Final enhancement checks — 4 November 2026

- Production build completed without errors; all 14 automated tests passed.
- Browser checked at 1440px desktop, 768px tablet, and 390px mobile widths with no horizontal overflow. The supplied portrait retained its original dimensions and contain sizing.
- Tested dark/light switching, navigation, mobile menu opening and closing, Escape focus restoration, and project filtering.
- Separate field validation displayed six required-field messages without an API error or success message.
- Browser mock fixture: double-click generated one request with a disabled sending state; API failures retained input, errors remained during edits, and dismissal worked. An unconfirmed response produced an error, never success. Confirmed mock success reset the form and showed only the success message.
- Website browser console reported no warnings or errors. Mock tests do not demonstrate live email delivery.
- No Web3Forms key was supplied; live successful submission and inbox delivery remain pending configuration.
