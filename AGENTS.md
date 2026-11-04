# Project design-engineering boundaries

These rules apply whenever a design or animation Skill is used in this project:

- Keep the photography and editorial content as the visual focus.
- Use motion to explain hierarchy, state, feedback, and spatial continuity—not as decoration.
- Preserve the existing visual language, framework-free HTML/CSS/JavaScript stack, and dependency choices unless the user explicitly approves a change.
- Do not mechanically apply Linear, Vercel, SaaS, or generic Apple styling.
- Treat slower transitions that support photographic storytelling as intentional candidates; do not reject them solely for exceeding common UI timing conventions.
- Every animation must include an appropriate `prefers-reduced-motion` experience.
- When the user requests an interface change, implement and preview it within the existing visual direction and stack; no separate skill mention or repeated approval is required. Review-only requests remain read-only. Choose routine implementation details yourself and fix observed issues. Omit optional changes outside the requested scope rather than interrupting for their approval.
- Commit, push and deploy only within the user's explicit authorization; a local design change does not automatically authorize publication.
- On the Work page, keep categories minimal: no numeric prefixes, photo counts, bottom descriptive category copy or default image darkening unless requested.
