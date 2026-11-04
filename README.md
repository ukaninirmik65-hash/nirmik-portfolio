# Nirmik Ukani — Frontend Developer portfolio

A responsive React/Vite portfolio for Nirmik Ukani. It includes Home, About, Skills, Experience, Projects, Services, Work Process, Contact, and a short FAQ. The design uses charcoal, warm white, and a soft green accent, with dark/light modes and purposeful motion.

## Run locally

1. Extract the complete ZIP.
2. Open a terminal in the extracted project folder containing `package.json`.
3. Use Node.js **22.12+** (Node 24 LTS is also suitable).

```bash
npm install
npm run dev
```

Open the local address printed by Vite, normally `http://127.0.0.1:5173`.

```bash
npm test
npm run build
npm run preview
```

The ZIP includes a prebuilt production site in `dist/`, as well as the full editable source. The included lockfile records the installed dependency versions. Dependencies are installed with `npm install`; a platform-specific `node_modules` folder is intentionally excluded from the ZIP.

## Inquiry form — no automatic pricing

The contact section now opens a focused, keyboard-accessible dialog inspired by the supplied reference. Service-card inquiry links open it with the selected service. Closing and reopening the dialog preserves the draft.

The form includes:

- Required name, email, service, and project message, plus optional WhatsApp/phone.
- An expandable **Additional project details** section containing optional company, page count, timeline, design readiness, reference URL, and feature selections.
- All seven confirmed frontend service choices.
- **Number of pages:** 1, 2–3, 4–5, 6–10, 11–15, more than 15, and not sure yet.
- **Preferred timeline:** within 1 week, 2 weeks, 3–4 weeks, 1–2 months, flexible, and not sure yet.
- Optional design-readiness dropdown.
- Optional existing website/reference URL.
- Feature checkboxes and a required project brief.
- Accessible validation, Web3Forms submission, and optional direct-contact drafts.

There are **no fixed prices, price ranges, packages, price fields, or automatic pricing calculations**. Nirmik personally reviews each brief and provides a quotation. Timeline selections are visitor preferences, not promised delivery times.

The site's single shared Contact / Project Inquiry form now submits through Web3Forms. **Send message** validates and posts every field as `FormData` to `https://api.web3forms.com/submit` with `Accept: application/json`. The button and controls are disabled during sending, with a synchronous guard against duplicate requests. API failures, network failures, timeouts, and missing configuration preserve the entered data. The form resets only after HTTP success plus `success: true` from Web3Forms. The client's email is explicitly sent as `replyto`.

The hidden `botcheck` honeypot follows the official checkbox format. Checked honeypots are blocked locally. Optional direct email/WhatsApp drafts and existing contact links remain available as alternatives; preparing a draft does not submit the form.

## Web3Forms configuration

The owner-provided Web3Forms public form identifier is configured in `src/config/web3forms.js`, so the deployed website and extracted ZIP can submit without extra setup. Web3Forms access keys are public, browser-visible form identifiers, not Gmail passwords or private API tokens. The destination inbox is determined by the Web3Forms account associated with that key; changing `profile.email` does not change routing.

To override the configured identifier, set `VITE_WEB3FORMS_ACCESS_KEY` in `.env.local` locally or in the Vercel project environment settings, then restart development or rebuild/redeploy. Vite embeds environment values at build time. Local environment files remain ignored by Git. Never put unrelated private credentials in frontend configuration.

If no usable key is configured, visitors see an upfront availability notice and can prepare a complete email/WhatsApp draft instead of encountering a dead-end submission. Draft preparation is never presented as successful delivery.

After changing the key, send one clearly labeled test, confirm the API success response, inspect the destination Gmail inbox/spam folder, and verify Reply-To targets the client's email. API acceptance alone does not prove Gmail inbox receipt.

References: [Web3Forms public keys](https://web3forms.com/#faq), [Reply-To](https://docs.web3forms.com/getting-started/customizations/custom-reply-to).

## Configuration and editable content

The public Web3Forms form identifier is configured as described above. Keep any unrelated private keys on a server.

| Location                         | Contents                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/data/portfolio.js`          | Personal details, social links, confirmed skills, four roles, projects, services, process, FAQ |
| `src/data/inquiry.js`            | Every dropdown option, feature checkbox, and initial form value                                |
| `src/utils/inquiry.js`           | Validation, message formatting, email and WhatsApp URLs                                        |
| `src/config/web3forms.js`        | Official endpoint and environment configuration                                                |
| `src/utils/web3forms.js`         | Complete multipart payload, Reply-To, API/error/timeout handling                               |
| `src/components/`                | Reusable UI, header, and inquiry form                                                          |
| `src/sections/`                  | Complete page sections                                                                         |
| `src/hooks/useTheme.js`          | Theme selection and persistence                                                                |
| `src/styles/index.css`           | Design tokens, styling, and responsive rules                                                   |
| `public/images/nirmik-ukani.png` | Exact uploaded portrait                                                                        |
| `public/images/projects/`        | Actual project screenshots                                                                     |
| `tests/inquiry.test.js`          | Form, data, URL, and image-integrity tests                                                     |
| `tests/web3forms.test.js`        | Mocked transport, payload, validation, error and timeout tests                                 |
| `tests/browser/form.html`        | Explicit mock-only UI fixture for loading, duplicate prevention, reset and retention checks    |

The resume button is hidden while `profile.resume` is `null`. No testimonials or client logos are fabricated. Availability, years of experience, and achievements are not invented.

## Photo preservation

Only the supplied `Professional Corporate Portrait.png` is used for the profile. It was copied without editing, cropping, filtering, resizing, or recompression. Its original **1122×1402** pixels and complete aspect ratio are preserved. CSS uses `width:100%; height:auto; object-fit:contain`. The image container fits the photo; no overlays obscure it.

SHA-256 of both supplied and shipped image:

`26CE277474B2B42443791D9D098D02964ACDE49D08B643347AC961AE4E59FDD9`

## Project accuracy

All seven projects use the actual supplied GitHub repositories. Completion statuses follow the owner's explicit confirmation:

- Completed: ERP-App, Tetris Game, Anita Jewellery, Neelmadhav Public School, Digital Marketing Agency.
- In Progress: Atal Kriya (`atakKriya-2.O`), Motiwala Perfumes Clone.

Scope disclosures explain ERP's pending modules, Anita's frontend-only storefront, school content placeholders, Atal Kriya's mock/localStorage prototype, and Motiwala's practice-clone nature. The agency project links its credited Figma source. No client relationship is inferred from a repository name.

Anita and school previews are screenshots from their real deployments. Other projects have explicitly labeled illustrated covers, not simulated screenshots. Prior unavailable Tetris/agency deployment links are omitted. ERP and Atal Kriya live demos open login screens; no real credentials are supplied by this portfolio. External deployments may change independently.

## Vercel deployment

Import [the public GitHub repository](https://github.com/ukaninirmik65-hash/nirmik-portfolio) into Vercel. Select the **Vite** preset, build command **`npm run build`**, and output directory **`dist`**. Use the folder containing `package.json` as the project root. The included public form identifier works by default; `VITE_WEB3FORMS_ACCESS_KEY` is an optional override.

After deployment, test form choices, navigation, theme switching, and email/WhatsApp links.

## Google Search Console sitemap

The public website URL is `https://nirmik-portfolio.vercel.app/`. Vite copies `public/sitemap.xml` and `public/robots.txt` to the production build root. The sitemap lists the homepage only because the navigation sections are anchors on that single page, not separate pages.

After deploying, open `https://nirmik-portfolio.vercel.app/sitemap.xml` and verify it returns XML. In Google Search Console, select the property for this website, open **Sitemaps**, enter `sitemap.xml`, and submit. `robots.txt` also advertises the sitemap. If the website domain changes, update both files before redeploying.

See [Vercel's official Vite documentation](https://vercel.com/docs/frameworks/frontend/vite).

## Accessibility and performance

Semantic headings and landmarks, labeled inputs, visible keyboard focus, a skip link, keyboard-friendly mobile navigation, reduced-motion support, responsive images, and lazy-loaded project screenshots are included. Motion is the only animation engine; native scrolling avoids extra scroll libraries. Fonts use Google Fonts with `display=swap` and system fallbacks. No analytics or tracking is installed.

See `VERIFICATION.md` for the checks actually performed. This is not a formal accessibility certification.

## Interaction refinements

The navbar includes a smoothly moving active-section indicator and a keyboard-friendly mobile menu with Escape dismissal, outside-click dismissal, and scroll locking. Text, section, skill, and project reveals use Motion and honor reduced-motion preferences.

Field-specific validation, submission errors, loading, and success use independent message areas. API errors persist through edits until dismissed or retried. The form resets only after an explicitly successful response; failed or unconfirmed responses preserve the complete inquiry. The browser-only mock fixture at `/tests/browser/form.html` is available in development and excluded from production. It never sends email.

GitHub excludes build output, dependencies, local environment files, and test artifacts. The owner-provided public form identifier is configured. Real website submission and Gmail Inbox receipt have been verified; see `QA-REPORT.md`.

## Contact redesign verification

The contact dialog has a native modal focus boundary, Escape and backdrop dismissal, scroll locking, and focus restoration. Optional page/timeline fields accept every existing choice but no longer block an initial message when left blank. Supplied optional values are validated and all fields are included in Web3Forms submissions. Email subjects identify the client and service, and Reply-To uses the submitted client email. The access key must be associated with the destination Gmail account. No Gmail password or server secret is needed in this frontend.

## End-to-end delivery verification

A real test was submitted through the deployed contact dialog on 4 November 2026. Web3Forms reported success, the form reset, and the owner confirmed arrival in the Gmail **Inbox**. See `QA-REPORT.md` for all QA results.

## Developer cursor

A small code glyph and pointer dot follow the mouse, with a softly delayed ring and restrained halo. Buttons/links expand the ring, cards use a rounded focus shape, and images use a focus-frame state without altering the image. Theme colors come from the existing CSS variables.

Use the code icon beside the theme toggle to switch back to the standard cursor; the preference is saved locally. The effect is enabled only for fine, hover-capable pointers at desktop widths with reduced motion off and forced colors off. Touch/mobile, editable controls, text selection, keyboard input, scrolling, and the native contact dialog keep the browser cursor. A body portal avoids transformed-header positioning issues; all decorative layers ignore pointer input and are hidden from accessibility APIs.

One requestAnimationFrame loop updates transforms directly and sleeps when settled. No per-frame React state changes, layout measurements, extra animation libraries, card tilting, image filters, or particles are used.

## Interactive Tech Stack

The Skills-only showcase lives in `src/sections/InteractiveSkills.jsx` with isolated styles in `src/styles/tech-stack.css`. It keeps the 11 confirmed technologies in four groups, with keyboard/tap selection, always-visible labels, beginner distinctions, existing theme variables, one viewport-paused floating logo, and reduced-motion guards. Ten technology marks are bundled from the installed icon package; REST API Integration uses a text badge because it has no official brand logo.

## NU Fold brand identity

The custom NU monogram and outlined full-name wordmark replace the former star/lowercase logo, letter monograms and favicon. All placements use `src/components/BrandLogo.jsx`; downloadable SVGs are in `public/brand/`. Favicon variants switch with the existing website theme. Typography is outlined from the existing Space Grotesk family, so the logo loads without font dependencies. No new runtime packages were added.
