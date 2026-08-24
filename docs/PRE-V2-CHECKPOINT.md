# PRE-V2 CHECKPOINT

Verified locally before the archive-v2 implementation on 2026-08-24 (Asia/Shanghai).

- Canonical Git root: `/Users/zyy/Desktop/website`
- Compatibility path: `/Users/zyy/Documents/摄影网站`
- Branch: `main`
- Starting HEAD: `7ca1a5d Avoid Cloudflare email protection crawl URL`
- Starting worktree: clean and equal to `origin/main`
- Stack: framework-free static HTML, CSS, and JavaScript
- Package/build system: none at baseline
- Runtime observed: Node.js `v22.23.1`, npm `10.9.8`, Wrangler `4.125.0`
- Deployment shape: Cloudflare Pages static assets
- Existing routes returning HTTP 200: `/`, `/work`, `/places`, `/story`, `/about`
- Existing unknown route behavior: HTTP 404
- Existing routes missing at baseline: `/rights`, `/series`, `/stories`, `/en/`, photo/place/series/story permalinks
- Content inventory: 81 unique photographs, 29 places, 5 series, 5 story entries
- Initial-HTML production defects: Places count `0`; `your_wechat_id` placeholder; duplicate Contact navigation

No source photograph was modified or deleted when this checkpoint was recorded.
