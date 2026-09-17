# Shakhkulashvili Legal

Bilingual technology and digital law practice website founded by Luka Shakhkulashvili.

- Website: https://luka019.github.io/lukaswebsite/
- Repository: https://github.com/luka019/lukaswebsite
- Enquiries: legaladvocating@gmail.com

## Publishing and files

GitHub Pages publishes `main` from the repository root. Its built-in Jekyll build renders the resource hub and Markdown posts; the home page remains plain HTML. No custom workflow or client-side package dependency is required.

- `index.html`: native Georgian content, English text in `data-en` attributes, service disclosures and the enquiry form.
- `styles.css`: responsive layout and locally hosted fonts.
- `script.js`: language selection, accessible mobile navigation, topic selection, form validation and submission states.
- `assets/`: the founder's supplied portrait, architecture photograph, fonts and font licence.
- `_config.yml`, `_layouts/`, `_includes/`: GitHub Pages/Jekyll resource and article layouts.
- `_data/`: official-source catalogue and topic labels.
- `resources/`: resource hub, search and filters.
- `_drafts/article-template.md`: unpublished authoring template.
- `PUBLISHING.md`: Georgian publishing instructions.

Keep asset paths relative so the GitHub Pages project path works. Update CSS and script version markers when publishing changes.

The home page can be previewed with `python3 -m http.server 4173 --bind 127.0.0.1`. Render the resource hub with a GitHub Pages-compatible Jekyll build; serving its Liquid source directly does not render posts. Do not re-add `.nojekyll`.

The header now highlights product launch, business growth and international activity. Education and employer credentials remain in the founder's biography.

WhatsApp contact: https://wa.me/995598451132 (+995 598 45 11 32). These are plain outbound links, not an embedded tracking widget; no message is sent without the visitor's action.

Georgian is the default. Share English with `?lang=en`, or Georgian with `?lang=ka`. Language preference is the only item stored in the visitor's browser. Content, native service disclosures and the standard form action remain available without JavaScript.

## Contact form: one-time activation required

The form uses FormSubmit to deliver enquiries to **legaladvocating@gmail.com**. No secret credentials are included in the public website.

An authorised setup submission returned the following provider response on 17 September 2026: **This form needs Activation**. FormSubmit reported sending an email with an **Activate Form** link.

The mailbox owner must:

1. Open the FormSubmit email in legaladvocating@gmail.com; check Spam if necessary.
2. Click **Activate Form**.
3. Send a short test from the published website and confirm it arrives in the inbox.

Until activation is complete, the AJAX form displays an unavailable message and preserves the visitor's text. The direct email link remains available. Do not describe inbox delivery as verified until an actual message has been received.

JavaScript submits to `https://formsubmit.co/ajax/legaladvocating@gmail.com`. The standard HTML fallback submits to `https://formsubmit.co/legaladvocating@gmail.com`.

Features include required-field validation, an anti-spam honeypot, explicit enquiry-processing consent, a sending state, a timeout, retained input on errors, and a confirmation only after a positive provider response. Service links preselect the enquiry topic.

The visible privacy notice identifies Luka as the enquiry contact, describes FormSubmit and Gmail, FormSubmit's stated 30-day submission storage, purpose-based correspondence retention, possible overseas processing and data-rights requests. No advertising or analytics are installed. Do not request confidential documents through the initial enquiry form.

If the recipient changes, update both endpoints, the visible email links, the privacy notice and the script messages, then activate the new recipient.

Documentation:
- https://formsubmit.co/documentation
- https://formsubmit.co/ajax-documentation
- https://formsubmit.co/privacy.pdf

## Positioning and scope

Technology and digital law is the primary practice: technology contracts, AI and data protection, information security law, digital products and intellectual property, fintech and cryptoassets, and LegalTech/contract management.

Supporting services cover corporate and banking documentation, employment, investment funds and asset management, disputes, international business, residence, citizenship and foreign employment. Tax services have been removed.

The resource hub includes bilingual search, topic and format filters, honest empty states, shareable filter URLs and six official-source links. No authored articles have been fabricated. Markdown posts added to `_posts/` are rendered with their own article pages and added to the hub automatically. Full instructions: [PUBLISHING.md](PUBLISHING.md). Article body language is explicitly identified; it is not machine-translated when the interface language changes.

The founder's profile highlights London education, Chevening, BDO Legal, public-sector experience and the two years of LegalStepy involvement and CLO responsibilities described by the founder. Team support is described by expertise; Luka is the only individually featured professional.

**Shakhkulashvili Legal** is the website's working brand. This website update does not establish a registered company or confirm trade-name, trademark or domain availability. The footer identifies Luka Shakhkulashvili as the person with whom services are agreed.

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

Check the current rules and individual circumstances for each engagement.

## Verification

Browser checks cover Georgian and English, widths from 320 to 1440 pixels, menu and keyboard interactions, local asset loading, disclosures, topic selection, form validation and success/error states. Automated accessibility checks cover both languages at desktop and mobile widths.

Form-state tests use intercepted provider responses and do not prove inbox delivery. The real activation request is documented above.
