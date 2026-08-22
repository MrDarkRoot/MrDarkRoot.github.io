---
layout: page
title: Research
icon: fas fa-shield-alt
order: 4
permalink: /research/
---

## Security Research Portfolio

This page tracks my public vulnerability disclosures and technical write-ups.

## Published Vulnerabilities

| CVE | Project | Summary | Links |
| --- | --- | --- | --- |
| CVE-2026-15248 | Meta Box | **Contributor+ Arbitrary Attachment Deletion via Missing Authorization**. Severity: Medium. CVSS: 5.5. CWE: CWE-862. Affected: `<= 5.12.1`. Fixed: 5.13.1. WPVDB: `a101136d-606f-4529-ae78-a4fff7724e2c`. Researcher: Duy Tran. Authenticated users with access to a Meta Box file-field workflow could delete media records referenced by other users' content because the deletion handler did not authorize the supplied object and attachment identifiers. | [Write-up](/posts/cve-2026-15248-meta-box-arbitrary-attachment-deletion/) · [CVE](https://www.cve.org/CVERecord?id=CVE-2026-15248) · [WPVDB](https://wpscan.com/vulnerability/a101136d-606f-4529-ae78-a4fff7724e2c/) |
| CVE-2026-14224 | Easy Appointments | Subscriber+ IDOR Allows Cross-User Appointment Notification Redirection | [Write-up](/posts/cve-2026-14224-easy-appointments-idor-notification-redirection/) · [CVE](https://www.cve.org/CVERecord?id=CVE-2026-14224) |
| CVE-2026-11571 | Everest Forms | Unauthenticated Sensitive Information Exposure via Residual CSV Artifacts | [Write-up](/posts/cve-2026-11571-everest-forms-sensitive-information-exposure/) · [CVE](https://www.cve.org/CVERecord?id=CVE-2026-11571) · [WPVDB](https://wpscan.com/vulnerability/4bd381e9-2f4e-4e61-99af-88f50aed71f5/) |
| CVE-2026-11855 | Simple Membership | **Forged Stripe Webhook Metadata to Admin-Context XSS**. CWE: CWE-79. Validated: Simple Membership 4.7.4. Researcher: Duy Tran. In the tested default state, an unauthenticated forged Stripe webhook could store attacker-controlled `api_version` metadata that was later rendered in a WordPress administrator notice without safe output encoding. | [Write-up](/posts/cve-2026-11855-simple-membership-stored-xss/) · [CVE](https://www.cve.org/CVERecord?id=CVE-2026-11855) · [WPVDB](https://wpscan.com/vulnerability/217cb606-a0f2-4427-9262-cfe1cc90474e/) |

---

## Current Research Areas

WordPress plugin security, web/API authorization, IDOR, broken access control, stored XSS, webhook trust boundaries, unsafe file operations, sensitive data exposure, and security testing automation.

---

## Disclosure Principles

All research documented on this site is performed against systems I own, isolated local labs, or targets covered by an authorized vulnerability-disclosure or bug-bounty program.

I follow coordinated disclosure practices and may temporarily withhold exploit payloads or detailed reproduction steps while affected users are being given time to update.