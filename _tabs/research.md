---
layout: page
title: Research
icon: fas fa-shield-alt
order: 4
permalink: /research/
---

## Security Research Portfolio

This page tracks my application-security research, public disclosures, and technical write-ups.

## Published Vulnerabilities

### CVE-2026-11571 — Everest Forms

**Unauthenticated Sensitive Information Exposure via Residual CSV Artifacts**

- Severity: **Medium**
- CVSS: **5.9**
- CWE: **CWE-200**
- OWASP Top 10: **A3: Sensitive Data Exposure**
- Affected versions: **Before 3.5.0**
- Fixed version: **3.5.0**
- WPVDB ID: **4bd381e9-2f4e-4e61-99af-88f50aed71f5**
- CVE Record: [Official CVE entry](https://www.cve.org/CVERecord?id=CVE-2026-11571)
- Researcher: **Duy**

The vulnerability involved retained CSV submission artifacts generated during the Everest Forms email-notification workflow. Under the affected configuration, temporary CSV files containing form submission records were not reliably deleted and could remain accessible from the public uploads area.

The operational proof of concept is intentionally withheld until **July 02, 2026** to give users time to update.

[Read the full technical write-up](/posts/cve-2026-11571-everest-forms-sensitive-information-exposure/)

---

### CVE-2026-11855 — Simple Membership

**Unauthenticated Stored Cross-Site Scripting via Stripe Webhook API Version**

- Severity: **High**
- CVSS: **8.8**
- CWE: **CWE-79**
- Affected versions: **Before 4.7.5**
- Fixed version: **4.7.5**
- WPVDB ID: **217cb606-a0f2-4427-9262-cfe1cc90474e**
- Researcher: **Duy Tran**

The vulnerability allowed an unauthenticated attacker to submit a forged Stripe webhook containing attacker-controlled metadata. The supplied value was stored and later rendered in an administrator-facing notice without sufficient output encoding, resulting in JavaScript execution in an authenticated administrator's browser context.

[Read the full technical write-up](/posts/cve-2026-11855-simple-membership-stored-xss/)

---

## Current Research Areas

- WordPress plugin security
- Web and API authorization
- Authentication and session workflows
- IDOR and broken access control
- Stored cross-site scripting
- Webhook authenticity and trust boundaries
- Privilege escalation
- Unsafe file operations
- Sensitive data exposure
- Business-logic vulnerabilities
- Security testing automation

---

## Disclosure Principles

All research documented on this site is performed against systems I own, isolated local labs, or targets covered by an authorized vulnerability-disclosure or bug-bounty program.

I follow coordinated disclosure practices and may temporarily withhold exploit payloads or detailed reproduction steps while affected users are being given time to update.
