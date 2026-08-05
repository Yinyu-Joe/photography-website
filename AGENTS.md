# Project design-engineering boundaries

These rules apply whenever a design or animation Skill is used in this project:

- Keep the photography and editorial content as the visual focus.
- Use motion to explain hierarchy, state, feedback, and spatial continuity—not as decoration.
- Preserve the existing visual language, framework-free HTML/CSS/JavaScript stack, and dependency choices unless the user explicitly approves a change.
- Do not mechanically apply Linear, Vercel, SaaS, or generic Apple styling.
- Treat slower transitions that support photographic storytelling as intentional candidates; do not reject them solely for exceeding common UI timing conventions.
- Every animation must include an appropriate `prefers-reduced-motion` experience.
- Before changing any interface, first report the observed problem, proposed approach, and expected impact, then wait for explicit approval.
- `$prototype` and other implementation-capable Skills run only when explicitly requested. Review and opportunity-finding Skills remain read-only unless a separate implementation request is approved.
