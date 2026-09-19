# Activation checklist

This branch is prepared code, not an activated mail service or admin account.
Do not promote it until the following values are installed in Vercel and the live checks pass.

- `ADMIN_EMAIL`: the owner's approved login email.
- `ADMIN_PASSWORD_HASH`: `scrypt:<32-hex-salt>:<128-hex-key>`, generated using `passwordHash` in `security.mjs`. Never put the plaintext password into GitHub or a command-line argument. Password rotation uses a new hash and invalidates all existing sessions. Self-service password reset is not included.
- `ADMIN_SESSION_SECRET`: at least 40 random characters, generated privately.
- `ADMIN_GITHUB_TOKEN`: fine-grained token scoped only to `luka019/lukaswebsite`, Contents read/write; stored only server-side. Set an expiry and replace before expiry.
- `RESEND_API_KEY`: sending key restricted to the configured sender domain.
- `CONTACT_FROM_EMAIL`: a sender verified in that Resend account. The recipient is fixed in server code to `legaladvocating@gmail.com`.
- `SITE_ORIGIN`: exact allowed production origin. Add an explicit preview origin only when testing that deployment; remove it afterwards.

Configure a shared/edge rate limit on `/api/admin-session` and `/api/contact` before launch. The in-process limiter is a secondary guard only: serverless instances do not share counters.

Check that missing credentials fail closed; unauthenticated writes fail; another origin cannot log in or mutate content; correct login can read, save and upload; logout clears its cookie. Drafts remain public in the repository even though the site does not display them.

Send one clearly labelled delivery test through the production form and confirm it arrives in the recipient inbox. Provider acceptance alone is not proof of inbox delivery. Verify failures keep the visitor's text and never show success. Apply privacy notice changes together with the provider switch.

The old FormSubmit endpoint still requires activation for the current deployed site. A receipt from the former GitHub Pages site does not establish activation for this Vercel form. Do not bypass verification or spoof the former origin.
