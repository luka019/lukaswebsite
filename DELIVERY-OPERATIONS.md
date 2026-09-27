# DLG delivery operations

This is the DLG service business only. No LegalStepy or LegalTech Georgia project is changed.

## Operator route

Open `/admin/inbox/` with an authorised Google account. Select a matter and create its delivery pack. The pack contains intake questions, a private checklist, shared tasks, proposal, engagement draft, analysis draft and delivery summary. Tailor the scope and complete all placeholders. Documents are private until explicitly published. Editing content creates a new version and unpublishes it. Client approval stores the reviewed version and full text; this is not a qualified e-signature service.

Use the Work tab for an issue, applicable requirement, recommended change, owner, priority, evidence, source and deadline. Internal items remain hidden. Use monitoring items for agreed periodic reviews. Due work appears in the administrator desk; this does not fetch or interpret changes in legal sources automatically. Use the Messages tab for communications visible to the client.

Files are stored in the private `dlg-matter-files` bucket with request-based access, 10 MB limit and a restricted set of file types. Downloads use authenticated access. Files are not sent to an AI provider. No malware-scanning service is connected. Do not describe uploads as malware-scanned or as a secure evidence archive.

## Pricing model

The calculator is internal and has no invented public prices. Estimate hours × agreed rate, add an explicit complexity allowance and external costs. Decide currency, tax treatment, payment schedule, included revisions, jurisdictions and proposal validity. Record these in the proposal. Monthly work needs agreed capacity, priorities, response expectations and exclusions; do not promise unlimited support.

## Before accepting work

Confirm client identity, representative authority, conflicts, competence, jurisdiction, scope, timelines and fees. Complete the supplier's legal identity and all engagement terms. Document templates are starting points for professional drafting, not automatic legal opinions. Check current official sources and record the version/date before sharing analysis.

## Sales launch workflow

Create an initial research queue of 30 prospects: 10 financial/FinTech businesses, 10 technology/SaaS/AI businesses and 10 established Georgian businesses launching digital services. For each record: public source URL, product observation, decision-maker role, plausible question (not a claimed breach), matching DLG solution, reason to contact, last contact and next action. Validate current facts before outreach. Do not send bulk messages. No emails or outreach were sent by this release.

Suggested individual approach: introduce a concrete product observation; ask whether a defined legal review would help; describe the deliverable; invite a short discussion. Avoid diagnosing regulatory noncompliance without evidence.

## Integration boundaries

- Implemented: rule-based scope explorer, structured intake, client workspace, document templates/versioning/approval, file exchange, work/risk tracking, in-app due-work list, consultation requests and structured export.
- Consultation requests are not confirmed calendar bookings. Confirm a time in the matter conversation.
- LegalStepy: JSON matter export and CSV matter list are available. A live synchronisation needs the supported API, field mapping, credentials and the client's instruction to transfer data. No undocumented endpoint is assumed.
- Regulatory monitoring: scheduled human review is available. Automated collection and recurring alerts about legal changes need an authorised source feed, scope and review process. No automated legal-change feed is claimed.
- AI-assisted legal assessment: deliberately not activated without a configured provider, data-processing decisions, reviewed source retrieval and an evaluation set. Do not route client files to a model merely because an Azure credit balance exists.
- Email/push alerts and external e-signatures are not connected. Matter messages and approvals are recorded inside the workspace.

## Verification and release

`node --test tests/*.test.mjs` verifies resource safety, admin content authentication, scope mapping, blueprints and pricing. `tests/delivery-rls.sql` runs transaction-rolled-back database integration fixtures to test cross-client isolation, draft visibility, status permissions, versioning, approvals and storage access. Apply SQL only to the dedicated DLG project. The SQL file is a test harness, not a migration.

Database change sources: `server/delivery-schema.sql` and the recorded Supabase migration `dlg_delivery_initialisation`. Never rerun bootstrap migrations blindly; inspect migration history first. The public site and portal are built by `node scripts/build.mjs` into `dist`.
