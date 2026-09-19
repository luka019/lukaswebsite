# Digital Law & Advisory

Bilingual technology and digital law practice website founded by Luka Shakhkulashvili.

- Website: https://luka019.github.io/lukaswebsite/
- Repository: https://github.com/luka019/lukaswebsite
- Enquiries: legaladvocating@gmail.com

## Publishing and files

Primary website: https://lukaswebsite.vercel.app/

Vercel runs `node scripts/build.mjs` and publishes `dist/`. No npm dependencies are required. The build generates the resource library, bilingual detail pages, homepage previews and the existing AI service page. It validates the resource schema, excludes drafts/archived/future-dated content and creates a sitemap. Only the explicit output files are deployed; repository content and draft data are not copied into the deployed site.

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

The default interface is English; `?lang=ka` opens Georgian. Resources contain both full-language versions. Language preference is the only item stored in the visitor's browser.

## Direct contact form

Enquiries submit directly through `https://formsubmit.co/ajax/legaladvocating@gmail.com` without opening an email app. The user confirmed recipient activation on 19 September 2026. The native HTML fallback uses `https://formsubmit.co/legaladvocating@gmail.com`.

Validation runs before submission. The send button is disabled while waiting; duplicate submissions are prevented. Success is shown only when FormSubmit returns an explicit successful result. Provider errors, activation errors and timeouts preserve the visitor's text. If the visitor edits fields during submission, those edits are preserved even after success. Provider acceptance does not independently verify inbox delivery.

No private credentials are embedded. The privacy notice identifies FormSubmit and Gmail as the delivery services.

## Positioning and scope

Technology and digital law is the primary practice: technology contracts, AI and data protection, information security law, digital products and intellectual property, fintech and cryptoassets, and LegalTech/contract management.

The AI page covers systems and legal roles, governance and AI-agent permissions, data and intellectual property, vendor contracts, product launches, training and ongoing support. Its enquiry link carries the AI service selection to the home-page form.

The expanded scope includes day-to-day legal support for group companies and digital platforms, as well as legal documentation, governance, supervisory engagement and ongoing support for asset managers and investment funds. The supplied TNET and legal-counsel job descriptions inform service coverage only; neither is presented as an employer or credential of the founder.

Supporting services cover corporate and banking documentation, employment, investment funds and asset management, disputes, international business, residence, citizenship and foreign employment. Tax services have been removed.

The resource hub contains practical guides, cover images, internal pages, search, topic/format filters, print-to-PDF and related resources. The old raw official-source catalogue has been removed. Reference links appear only within relevant resources. Publishing and archival happen through the separate admin panel.

The founder's profile highlights London education, Chevening, BDO Legal, public-sector experience and the two years of LegalStepy involvement and CEO role described by the founder. Team support is described by expertise; Luka is the only individually featured professional.

**Digital Law & Advisory** is the website's working brand. This website update does not establish a registered company or confirm trade-name, trademark or domain availability. The footer identifies Luka Shakhkulashvili as the person with whom services are agreed.

University and employer references describe experience, not endorsements. The LLM is described as a programme/studies without an unconfirmed award date. There are no invented client logos, testimonials, headcounts, addresses, fees or response-time guarantees. Banking and regulatory outcomes are not guaranteed. Foreign-law and technical work are scoped with appropriately qualified specialists.

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
