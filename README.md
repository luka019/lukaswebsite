# Digital Law Georgia

Bilingual website for Digital Law Georgia, an expert-led technology, commercial and digital law practice founded by Luka Shakhkulashvili.

- Website: https://luka019.github.io/lukaswebsite/
- Repository: https://github.com/luka019/lukaswebsite
- Enquiries: digitallawgeorgia@gmail.com

## Publishing and files

Primary website: https://lukaswebsite.vercel.app/

Vercel runs `node scripts/build.mjs` and publishes `dist/`. No npm dependencies are required. The build generates the resource library, bilingual detail pages, homepage previews, business pathways, founder profile and dedicated service landing pages. It validates the resource schema, excludes drafts/archived/future-dated content and creates a sitemap. Only the explicit output files are deployed; repository content and draft data are not copied into the deployed site.

- `index.html`, `styles.css`, `script.js`: the practice website.
- `_data/resources.json`: the authored resource catalogue.
- `scripts/build.mjs`: dependency-free static publishing.
- `resources/resource-model.mjs`: shared validation and escaped content rendering.
- `resources/resources.js`: filtering, bilingual content, print and link copying.
- `admin/`: separate GitHub-backed resource editor. A repository-scoped token with Contents write permission is required; credentials stay in memory for the current session.
- `assets/resources/`: locally hosted cover images generated for this project.
- `PUBLISHING.md`: Georgian authoring and access instructions.

Preview with `node scripts/build.mjs`, then `python3 -m http.server 4173 --directory dist`. The primary deployment is Vercel; the historical GitHub Pages/Jekyll source is no longer the publishing workflow.

The GitHub repository is public. Drafts are excluded from the deployed site but remain public in source control. The admin panel makes this visible before login and saving. Do not store confidential drafts. A private editorial workflow requires private storage or an authenticated CMS backend.

WhatsApp: https://wa.me/995598451132 (+995 598 45 11 32). Contact links send no message without the visitor's action.

The default interface is Georgian; `?lang=en` opens English and `?lang=ka` opens Georgian. An explicit query overrides the saved preference. Resources contain both full-language versions. Language preference is the only item stored in the visitor's browser.

## Direct contact form

Public enquiries use `digitallawgeorgia@gmail.com`, which has been activated with FormSubmit. JavaScript submits to FormSubmit's AJAX endpoint so visitors remain on the Digital Law Georgia website; the native POST remains as a no-JavaScript fallback.

Validation runs before submission. The send button is disabled while waiting; duplicate submissions are prevented. Success is shown only when FormSubmit returns an explicit successful result. Provider errors, activation errors and timeouts preserve the visitor's text. If the visitor edits fields during submission, those edits are preserved even after success. Provider acceptance does not independently verify inbox delivery.

No private credentials are embedded. The privacy notice identifies FormSubmit and Gmail as the delivery services.

## Positioning and scope

The public catalogue in `catalogue.mjs` is the source of truth for six primary offers: technology and commercial contracts; data protection; AI governance and legal advisory; digital products and e-commerce; legal operations and contract management; and ongoing counsel. Existing IP, cybersecurity, FinTech, virtual assets and Georgia-entry services remain accessible as related areas.

Three business pathways make the offers easier to navigate: doing business in Georgia, international client readiness and growing-business support. The AI service covers inventory, policies, supplier review, product governance, practical training and ongoing reviews, together with legal analysis. Technical assurance and implementation are scoped with appropriate specialists.

The founder biography uses confirmed qualifications: Queen Mary University of London LLM with Distinction in Technology, Media and Telecommunications Law, Chevening, IAPP AIGP and a contribution to Cloud Legal Project research on AI regulation. Public and private sector experience is described without invented job titles, dates, client outcomes, headcounts or numerical claims. University and certification references describe credentials, not endorsements.

Services are agreed with Luka Shakhkulashvili. The working brand does not establish a registered company or confirm trademark or domain availability. Foreign-law, tax, accounting, immigration and technical questions are allocated to qualified specialists as the engagement requires.

## Bilingual search visibility

The build creates full English documents under `/en/`, including resource articles. Language controls navigate to the equivalent route. English is readable without JavaScript. Each public route has a self-referencing canonical, reciprocal Georgian/English hreflang links, social metadata and structured data. The sitemap includes both languages. Admin routes remain excluded. No SEO ranking or regulatory outcomes are promised.

## Visual system and domain preparation

The 7 November 2026 design integrates the header, concise bilingual introduction and four illustrated service scenes. `firm.css` owns public typography, layout, components and responsive rules. The former premium/upgrade/reference patch stylesheets are retired. `styles.css` retains resource/base layouts; `digital.css` contains service-page layouts and loads before the shared public design.

Four original inline SVG scenes illustrate contracts, personal data, FinTech and AI. The illustrations make no client or compliance-status claims. The same control pauses the decorative animation and eight-second service rotation; reduced-motion preference, focus, hover, document visibility and manual interaction are respected.

The intended future domain is `digitallaw.ge`. It has not been purchased, attached or represented as live. After domain ownership and hosting verification, set the existing build variable `SITE_URL=https://digitallaw.ge`; the build uses it for canonical URLs, social metadata, structured data, robots and the sitemap. Keep the existing contact email until a new mailbox is configured and tested.

LTA (`https://www.lta.ge/ge`) was reviewed as a benchmark for visual coherence, navigation, proportion, motion and service discovery. Its branding, artwork, content, client claims and site structure are not reused.

## Design references and assets

The original design uses concise service summaries, expandable details, practical deliverables, engagement formats, FAQs and a short enquiry route. Specialist-practice references reviewed:

- https://www.legalnodes.com/
- https://kempitlaw.com/
- https://techlawboutique.com/
- https://kaurmaxwell.com/services/technology

No third-party branding, client claims, testimonials or proprietary site artwork is copied.

Founder portrait: supplied by Luka; included unchanged.

London photograph: “Glass Skyscrapers in London”, NegativeSpace, CC0.
https://negativespace.co/glass-skyscrapers-london/
The image illustrates London and is not represented as the practice's office.

Noto Sans Georgian, locally hosted Georgian and Latin subsets; SIL Open Font License 1.1. See `assets/OFL.txt`.
https://github.com/notofonts/georgian

## Legal reference checks

Descriptions avoid fixed thresholds, rates and application deadlines. Primary references reviewed in September 2026 include:

- Labour migration: https://matsne.gov.ge/en/document/view/2806732
- Labour activity rules: https://matsne.gov.ge/ka/document/view/6791218
- VASP framework: https://nbg.gov.ge/en/page/virtual-asset-service-providers-vasps
- Payment service providers: https://nbg.gov.ge/en/page/payment-service-providers
- Investment funds: https://nbg.gov.ge/en/page/investment-funds
- AI Act overview: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- AI literacy: https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers
- NIS2: https://digital-strategy.ec.europa.eu/en/policies/nis2-directive
- DORA: https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en
- Digital Services Act: https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package
- Georgian data protection: https://matsne.gov.ge/ka/document/view/5827307

Check the current rules and individual circumstances for each engagement.

## Verification

Browser checks cover Georgian and English, widths from 320 to 1440 pixels, menu and keyboard interactions, local asset loading, disclosures, topic selection, form validation and success/error states. Automated accessibility checks cover both languages at desktop and mobile widths.

Form-state tests use intercepted provider responses and do not prove inbox delivery. The real activation request is documented above.
