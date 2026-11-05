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

## Interactive Tech Stack — Skills-only replacement

- Replaced the existing Skills markup in place; exactly one Skills section remains. Other section components, navbar, cursor, contact forms, global styles, theme variables and dependencies were not modified.
- Exactly 11 technologies in the four requested groups. Ten locally bundled technology logo SVGs render; REST has no official brand logo and uses a clearly labeled REST/API text badge. No extra technology or proficiency claim was added.
- Verified every card's selection and detail text, keyboard activation, beginner labels, and dark/light colors. Names are always visible without hover.
- Browser checks at 1440px desktop, 768px tablet and 320px mobile widths showed no horizontal overflow or clipped names. All card tap targets exceeded 44px. No browser console warnings/errors observed.
- React is the only floating logo. Browser confirmed its animation runs in view and pauses off screen; floating is disabled at tablet/mobile widths. Reduced-motion hooks and CSS disable motion; OS reduced-motion settings were not changed during this check.
- No new libraries or remote logo requests. The production build and all 17 existing tests pass.

## New NU Fold logo identity

- Original shared-stem NU mark and outlined Nirmik Ukani wordmark replace the previous branding in navbar, footer, portrait caption, About monogram, service invitation and favicon.
- The existing navbar flex structure is unchanged: desktop height remains 86px, navigation width remains 405.78px, and the logo slot is 105×45px (previously approximately 104.66×45px).
- SVG paths were validated for finite coordinates. The complete name renders correctly without runtime fonts. Standalone SVG icon and wordmark, plus dark/light favicons, are included.
- Reviewed both color themes and favicon sizes 16, 24, 32 and 48px. Website favicon changes with the theme toggle and retains the correct theme after reload.
- Browser checks at desktop, 768px tablet and 320px mobile widths: no horizontal overflow, working mobile menu, five correct logo placements, no broken images or console errors.
- Global theme colors, form fields/submission, project data, photo and section content are unchanged. No logo-processing tools or font files are shipped as dependencies.

## Outside-click and cursor fixes — 5 November 2026

### Changes and root causes

- DeveloperCursor previously hid itself over paragraph/heading/list text and reappeared over child containers. It now uses consistent target classification, so ordinary text no longer causes repeated custom/native cursor swaps. Selection drags and editing still use the native cursor.
- Removed the blanket cursor:none!important rule; explicit native/default, interactive, editable, disabled and busy semantics now coexist with the custom cursor. Captured cursor nodes and a disposal guard prevent late animation callbacks from reading cleared refs. Cursor preference updates are kept out of state updater callbacks.
- The mobile menu focus trap no longer assumes its ref or focus targets are present. Outside-pointer detection validates connected containers and Node targets and respects composed event paths. All listener registration/removal pairs remain balanced.
- Backdrop dismissal now requires a primary press that both begins and ends outside the dialog. Dragging text or a scrollbar from inside the form to outside cannot dismiss it. Queued close events from an earlier opening cannot close a currently reopened native dialog.
- The menu and contact dialog share a reference-counted body scroll lock. Closing overlays in either order cannot prematurely unlock the page or leave it permanently locked.

### Verification

- All **21 automated tests** pass, including four new regression tests covering lock release ordering/idempotence, invalid/missing outside targets, composed paths, backdrop hit testing and stable cursor classifications.
- Browser viewport checks: 1440px desktop, 1366×768 laptop, and 390px mobile. These are Chromium viewport checks, not a claim of testing every physical device or browser engine.
- Real coordinate-based backdrop click closed the form and unlocked scrolling. Five repeated open/outside-close cycles all ended closed and unlocked, with draft data preserved when reopening.
- A real text-selection drag from inside the dialog to outside left the dialog open, selection highlighted, native cursor restored and scroll lock intact.
- Native dropdown open/Escape/select interactions kept the dialog open; optional pages/timeline selections remained intact.
- Outside-menu clicks dismissed the menu. Opening the form while the mobile menu was open correctly closed the menu, kept the modal scroll lock, and released scrolling after Escape.
- With custom cursor disabled, paragraphs/headings/cards showed default, links/buttons showed pointer, fields showed text, and busy disabled inputs/buttons showed wait. With custom cursor enabled, paragraph/heading state stayed default and filter buttons were interactive. The tested pointer at 150×300 produced an exact translate3d(150px,300px,0) tip position.
- Cursor opt-out persisted across reload; input text selection and project filters worked. No browser console warnings or errors observed in the tested flows.
- No intermittent application crash was reproduced during these checks; the unsafe ref/target paths and close-state race identified in code were corrected rather than masked by error suppression.
- Logo, navbar layout, colors, content, responsive structure, animations, form payloads and Web3Forms submission code were preserved.

### Exact modified files

- src/components/DeveloperCursor.jsx
- src/components/Header.jsx
- src/sections/Contact.jsx
- src/styles/index.css
- src/utils/interactions.js (new)
- tests/interactions.test.js (new)
- QA-REPORT.md

## Validation visual feedback — 5 November 2026

- CSS-only styling update to the shared Contact / Project Inquiry component; fields, choices, validation rules, submission handlers and API configuration were not modified.
- Invalid fields use clear theme-specific red borders and a subtle tint; focused invalid fields retain a red outline/ring rather than the normal green accent. Error messages use readable 12px red text and wrap naturally.
- Normal fields retain existing theme styling and focus accent. Disabled controls are muted. Only the existing confirmed-submission message receives the green success treatment; no :valid or empty-optional-field success decoration was added.
- Browser verified no errors before validation, field-specific errors after validation, and removal of styling and summary when values are corrected. Invalid email and optional phone values were checked. Both the Contact and service-prefilled Project Inquiry entry points were used.
- Dark/light themes and desktop 1440px plus mobile 390px/320px layouts were checked: no overlapping or clipped messages and no horizontal overflow.
- Error-message foreground/background contrast computes to 7.74:1 dark and 5.90:1 light using the actual form panel colors. This calculation is not a full accessibility audit.
- Mock transport checks confirmed red failure feedback without success, muted disabled inputs while sending, and green confirmation only after explicit mock success. No new real emails were sent.
- Production build and all 21 existing tests pass. No browser console warnings or errors observed.
