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

### CVE-2026-11855 — Simple Membership

**Unauthenticated Stored Cross-Site Scripting via Stripe Webhook API Version**

- Severity: **High**
- CVSS: **8.8**
- CWE: **CWE-79**
- Affected versions: **Before 4.7.5**
- Fixed version: **4.7.5**
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
- Business-logic vulnerabilities
- Security testing automation

---

## Disclosure Principles

All research documented on this site is performed against systems I own, isolated local labs, or targets covered by an authorized vulnerability-disclosure or bug-bounty program.

I follow coordinated disclosure practices and may temporarily withhold exploit payloads or detailed reproduction steps while affected users are being given time to update.
