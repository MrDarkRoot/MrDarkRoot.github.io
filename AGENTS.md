# Blog Maintenance Rules for AI Agents

This repository powers the public GitHub Pages blog at `https://mrdarkroot.github.io/`.

These rules are mandatory for AI agents maintaining the blog.

## 1. Research page is the CVE index

All public CVE write-ups must be linked from:

```text
/research/
```

The source file is:

```text
_tabs/research.md
```

When adding a new CVE write-up, update `_tabs/research.md` in the same session with a short CVE card containing:

- CVE ID
- affected plugin name
- vulnerability title
- severity
- CVSS score
- CWE
- affected version range
- fixed version
- WPVDB ID if available
- researcher credit
- short public-safe summary
- link to the full write-up

Newest CVEs should appear first under `Published Vulnerabilities`.

## 2. CVE post permalink format

CVE posts should live in `_posts/` and use this permalink style:

```yaml
permalink: /posts/cve-YYYY-NNNNN-plugin-short-vulnerability-title/
```

Do not rely only on the filename-derived post URL for CVE write-ups. Always set an explicit `permalink` in front matter.

## 3. CVE write-up style

CVE write-ups should follow the existing CVE-style structure:

```text
Overview
Summary
Expected Behavior
Actual Behavior
Vulnerability Chain
Required Conditions / Attack Preconditions
Trust-Boundary Analysis
Impact
Technical Validation
Proof of Concept
Remediation
Secure Design Recommendations
Disclosure Timeline
Research Credit
References
Responsible Disclosure Notice
```

Use clear, professional English. Prefer concise technical explanations over hype.

## 4. Coordinated disclosure safety

If a PoC is scheduled for a later date, do not publish operational exploitation details before that date.

Before the scheduled PoC date, omit:

- direct exploit requests
- exact artifact paths useful for exploitation
- filename examples useful for enumeration
- raw response bodies containing sensitive data
- payloads
- step-by-step reproduction instructions that enable exploitation

Use a placeholder such as:

```text
The proof of concept is intentionally withheld until YYYY-MM-DD to give users time to update.
```

After the disclosure buffer ends, operational details may be added only if the vulnerability is already publicly disclosed and publication is consistent with the relevant platform or vendor disclosure policy.

## 5. Public-safe research summaries

The `/research/` page should summarize CVEs safely. It should not contain PoC payloads or direct exploitation instructions.

The research page is for credibility, indexing, and navigation. Detailed technical analysis belongs in individual posts.

## 6. Avoid duplicate output paths

Do not create a static page under `posts/<slug>/index.html` for a CVE post that already has the same permalink in `_posts/`.

Duplicate output paths can break Jekyll or GitHub Pages builds.

## 7. GitHub Pages build safety

Avoid adding links to files that do not exist in the repository. The workflow may run link checks and fail on missing internal assets.

Before referencing images or downloadable files, confirm that the files exist at the exact case-sensitive path.

## 8. Portfolio and Research separation

Use `/portfolio/` for profile, education, skills, awards, projects, and contact information.

Use `/research/` for public security research, CVEs, vulnerability disclosures, and write-up navigation.

Do not overload the portfolio page with long technical write-ups.

## 9. Academy separation

Use `/academy/` for educational material and reusable AppSec/Secure Code notes.

Academy content should not duplicate CVE reports. CVE reports belong under `_posts/` and should be indexed on `/research/`.

## 10. Commit discipline

When changing an existing file, fetch the latest file first and use the latest blob SHA.

Do not make parallel updates to the same path.

Use commit messages that describe the user-visible change clearly.
