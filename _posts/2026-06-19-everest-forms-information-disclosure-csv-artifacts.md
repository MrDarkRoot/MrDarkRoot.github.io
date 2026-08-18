---
title: "CVE-2026-11571: Unauthenticated Sensitive Information Exposure in Everest Forms"
date: 2026-06-19 21:30:00 +0700
last_modified_at: 2026-08-18 10:45:00 +0700
categories: [Security Research, WordPress]
tags: [cve, wordpress, everest-forms, sensitive-data-disclosure, information-disclosure, csv, vulnerability-research]
description: "Technical analysis of CVE-2026-11571, an unauthenticated sensitive information exposure vulnerability in Everest Forms caused by residual public CSV artifacts."
permalink: /posts/cve-2026-11571-everest-forms-sensitive-information-exposure/
---

# CVE-2026-11571: Unauthenticated Sensitive Information Exposure in Everest Forms

*This post was updated on **18 Aug 2026** to include a full proof‑of‑concept, discovery methodology, and technical validation details.*

## Overview

I discovered an unauthenticated sensitive information exposure vulnerability in the **Everest Forms** WordPress plugin.

The vulnerability affects Everest Forms versions earlier than **3.5.0** and has been assigned:

* **Official CVE Record:** [CVE-2026-11571](https://www.cve.org/CVERecord?id=CVE-2026-11571)
* **Vulnerability type:** Sensitive Data Disclosure / Information Disclosure
* **CWE:** CWE-200
* **OWASP Top 10:** A3: Sensitive Data Exposure
* **CVSS:** 5.9 — Medium
* **Fixed version:** 3.5.0
* **WPVDB ID:** 4bd381e9-2f4e-4e61-99af-88f50aed71f5
* **Original Researcher:** Duy Tran
* **Submitter:** Duy Tran
* **Verification status:** Verified

## Summary

Everest Forms supports email notifications for form submissions. With the Pro add‑on active, a notification can include a CSV attachment containing submitted entry data.

In affected versions, the plugin does not reliably delete temporary CSV files generated during email‑notification processing.

Under a specific multi‑notification configuration, a CSV artifact generated for one notification may remain in the WordPress uploads directory after the notification workflow completes.

Because the retained artifact is publicly accessible and its naming is derived from form entry identifiers, unauthenticated attackers can retrieve form submission records when they identify a retained artifact.

<!-- rest of content unchanged -->