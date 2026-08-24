# Photography Archive v2 — local validation

Date: 2026-08-24 (Asia/Shanghai)

Scope: local implementation and validation only. No commit, push, Cloudflare deployment, DNS change, or production mutation was performed.

## Build output

- 256 indexable routes plus one custom 404 page
- 81 photos, 29 places, 5 series, and 5 stories from the unified content model
- Chinese and English route equivalents with canonical, hreflang, Open Graph, Twitter, and structured data
- 826 generated AVIF/WebP derivatives at 480, 768, 960, 1280, 1600, and 2048 widths where the source dimensions allow
- Generated photo derivatives: 128 MB
- Complete local `_site` artifact: 442 MB (ignored by Git)

## Static audit

Command: `npm run audit:site`

Result: PASS

- HTML pages: 257
- Indexable pages: 256
- Internal links checked: 3470
- Image references checked: 8988
- Failures: 0

The audit covers duplicate IDs/slugs, missing content references and assets, placeholder text, Places count, H1 count, metadata, canonical/hreflang, internal links, image alt/dimensions/srcset, redirects, and sitemap entries.

## Route smoke test

- `/`, `/work`, `/work/archive`, `/work/city-09`, `/series/fragments`, `/places`, `/places/tokyo`, `/stories/20260130-7c200963`, and `/en/work/archive`: direct 200
- `/story`: 301 to `/stories`
- Unknown route: custom 404

## Browser regression

- Checked 320–1920 px layouts across the key Chinese and English pages; no horizontal overflow remained.
- Final 390 px pass covered home, selected work, work archive, photo detail, Places, story detail, About, and English archive.
- No placeholder WeChat ID or incorrect `0 地点` text appeared.
- Responsive sources loaded successfully; the empty lightbox image is intentionally source-less until opened.
- Lightbox click changed the URL to the photo permalink, opened a native dialog, loaded the full image, and moved focus to Close.
- Browser Back closed the dialog, returned to `/work`, and restored focus to the originating photo tile.

## Lighthouse

Local, uncached Lighthouse lab runs against `http://127.0.0.1:4174`:

| Page | Mobile Perf | A11y | Best Practices | SEO | Mobile LCP | Mobile CLS | Desktop Perf |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 | 1.14 s | 0 | 100 |
| Work | 99 | 100 | 100 | 100 | 2.27 s | 0 | 100 |
| Photo | 100 | 100 | 100 | 100 | 1.89 s | 0 | 100 |
| Places | 100 | 100 | 100 | 100 | 1.37 s | 0 | 100 |
| Place | 99 | 100 | 100 | 100 | 2.04 s | 0 | 100 |
| Story | 100 | 100 | 100 | 100 | 1.44 s | 0 | 100 |
| About | 100 | 100 | 100 | 100 | 0.99 s | 0 | 100 |

All recorded TBT values were 0 ms. These are local lab results, not production field data.

## Remaining production checks

- Verify Cloudflare Pages output and redirects in a preview deployment before production publication.
- Re-run route smoke tests and Lighthouse against the preview URL because CDN behavior and real network conditions can differ from Wrangler local preview.
- Confirm Search Console indexing after publication; local metadata validation cannot prove indexing.
