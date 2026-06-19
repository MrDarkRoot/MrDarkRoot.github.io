---
title: "CVE-2026-11571: Unauthenticated Sensitive Information Exposure in Everest Forms"
date: 2026-06-19 21:30:00 +0700
categories: [Security Research, WordPress]
tags: [cve, wordpress, everest-forms, sensitive-data-disclosure, information-disclosure, csv, vulnerability-research]
description: "Technical analysis of CVE-2026-11571, an unauthenticated sensitive information exposure vulnerability in Everest Forms caused by residual public CSV artifacts."
permalink: /posts/cve-2026-11571-everest-forms-sensitive-information-exposure/
---

# CVE-2026-11571: Unauthenticated Sensitive Information Exposure in Everest Forms

## Overview

I discovered an unauthenticated sensitive information exposure vulnerability in the **Everest Forms** WordPress plugin.

The vulnerability affects Everest Forms versions earlier than **3.5.0** and has been assigned:

* **CVE:** CVE-2026-11571
* **Vulnerability type:** Sensitive Data Disclosure / Information Disclosure
* **CWE:** CWE-200
* **OWASP Top 10:** A3: Sensitive Data Exposure
* **CVSS:** 5.9 — Medium
* **Fixed version:** 3.5.0
* **WPVDB ID:** 4bd381e9-2f4e-4e61-99af-88f50aed71f5
* **Original Researcher:** Duy
* **Submitter:** Duy
* **Verification status:** Verified

## Summary

Everest Forms supports email notifications for form submissions. With the Pro add-on active, a notification can include a CSV attachment containing submitted entry data.

In affected versions, the plugin does not reliably delete temporary CSV files generated during email-notification processing.

Under a specific multi-notification configuration, a CSV artifact generated for one notification may remain in the WordPress uploads directory after the notification workflow completes.

Because the retained artifact is publicly accessible and its naming is derived from sequential form entry identifiers, unauthenticated attackers may be able to retrieve other users' form submission records.

## Expected Behavior

CSV files generated for email attachments should be temporary artifacts.

After email delivery finishes, the generated CSV file should be deleted and should not remain accessible from a public uploads directory.

Temporary files containing form submission records should never become long-lived public web artifacts.

## Actual Behavior

When a form has more than one email notification and the CSV attachment option is enabled on a notification that is not processed last, Everest Forms can leave the generated CSV artifact on disk.

The file remains in a publicly reachable uploads location and can expose submission data without authentication.

## Vulnerability Chain

The vulnerability results from a mismatch between the notification context that creates the CSV file and the notification context later used during cleanup.

A high-level chain is:

```text
Unauthenticated form submission
            |
            v
Everest Forms email notification workflow
            |
            v
CSV artifact generated for an earlier notification
            |
            v
A later notification is processed without CSV attachment enabled
            |
            v
Cleanup logic does not remove the earlier generated artifact
            |
            v
CSV artifact remains in the public uploads directory
            |
            v
Unauthenticated retrieval of submitted form data
```

The issue is a file lifecycle management failure: sensitive temporary data is generated for an email attachment but is not reliably removed after the workflow that required it has completed.

## Required Conditions

Exploitation requires the following conditions:

1. Everest Forms earlier than **3.5.0** is installed.
2. The Everest Forms Pro add-on is active.
3. A public form accepts submissions.
4. The form has more than one email notification.
5. CSV attachment is enabled on a notification that is not processed last.
6. The generated CSV artifact is not removed after email-notification processing.
7. An unauthenticated user can access the retained artifact from the public uploads area.

The Pro add-on condition matters because the CSV email-attachment option is provided by Pro.

## Trust-Boundary Analysis

The intended security boundary is the form submission workflow: submitted data should be processed by the plugin, sent to configured recipients, and stored only according to the site's configured data-retention behavior.

The vulnerable behavior moves submitted data into a CSV file under a public web-accessible location.

Once that file remains after the notification workflow, access to the data no longer depends on WordPress authentication, form ownership, entry ownership, or administrative permissions.

This turns private submission records into retrievable public artifacts.

## Impact

Successful exploitation allows an unauthenticated attacker to retrieve retained form submission records.

Depending on the affected form configuration, exposed data may include:

* Submitter name
* Email address
* Subject
* Message content
* Custom form fields
* Business lead data
* Support request content
* Other sensitive information collected by the form

The impact depends heavily on what the affected form collects.

Contact forms, support forms, internal request forms, lead-generation forms, and customer-facing intake forms may expose more sensitive information than simple low-risk forms.

## Identifier Predictability

The retained CSV artifacts are tied to form entry identifiers.

In the affected workflow, entry identifiers are sequential and may be returned to the submitter in the submission response.

This makes the retained artifacts easier to discover when the vulnerable configuration is present.

Operational retrieval examples are intentionally omitted until the scheduled PoC publication date.

## Technical Validation

The issue was validated in a controlled WordPress test environment using the affected Everest Forms version and the required Pro notification configuration.

Testing confirmed that:

1. A public form submission can trigger email-notification processing.
2. A CSV artifact can be generated for a notification with CSV attachment enabled.
3. A later notification without CSV attachment enabled can prevent reliable cleanup of the earlier artifact.
4. The generated CSV artifact can remain after the workflow completes.
5. The retained artifact can disclose submitted form data without authentication.

## Proof of Concept

The proof of concept is intentionally withheld until **July 02, 2026** to give users time to update.

This write-up does not include:

* direct retrieval requests,
* concrete artifact paths,
* filename examples,
* enumeration procedure,
* raw returned CSV output, or
* step-by-step reproduction payloads.

This section will be updated after the scheduled PoC publication date.

<!--

POC TO BE ADDED AFTER 2026-07-02

Suggested structure:

### Environment Setup

### Required Configuration

### Submission Trigger

### Artifact Retention Observation

### Unauthenticated Retrieval

### Evidence

### Cleanup Procedure

Do not publish operational retrieval details before the coordinated PoC publication date.

-->

## Remediation

Site owners should update Everest Forms to version **3.5.0 or later**.

Administrators should also review their uploads directory for retained CSV artifacts generated by Everest Forms and remove any files containing submission records that should not be publicly accessible.

Sites using Everest Forms Pro should review forms with multiple email notifications and confirm whether CSV attachment settings differ between notification contexts.

## Secure Design Recommendations

### Track generated artifacts directly

When a notification generates a temporary CSV attachment, the generated file path should be tracked explicitly.

Cleanup should operate on the generated artifact itself rather than infer cleanup behavior from the final notification context.

### Store sensitive temporary files outside public paths

Temporary files containing form submissions should not be stored in public web-accessible locations unless access control is enforced.

A safer design is to use a protected temporary directory outside the web root or a storage mechanism that does not expose files directly to unauthenticated HTTP requests.

### Delete temporary files reliably

Temporary artifacts should be deleted after email delivery, including when multiple notifications are processed and when notification settings differ.

Cleanup should be resilient to partial workflow failures.

### Add regression tests for multi-notification workflows

Regression tests should cover forms with multiple notifications where CSV attachment settings differ across notification contexts.

At minimum, tests should cover:

* CSV attachment enabled on the first notification and disabled on the last notification
* CSV attachment disabled on the first notification and enabled on the last notification
* mixed notification settings across more than two notifications
* mail delivery failure and partial workflow failure cases

## Disclosure Timeline

| Date | Event |
| --- | --- |
| 2026 | Vulnerability discovered and reproduced in a controlled environment |
| 2026 | Vulnerability submitted for coordinated disclosure |
| 2026 | Issue independently verified |
| 2026 | Everest Forms 3.5.0 released with a security fix |
| 2026 | CVE-2026-11571 publicly disclosed |
| 2026-07-02 | Scheduled publication date for the public proof of concept |

Additional dates may be added after the complete disclosure process concludes.

## Research Credit

This vulnerability was independently discovered and reported by:

**Duy**

* Original Researcher: Duy
* Submitter: Duy
* Research focus: WordPress plugin security, application security, and vulnerability lifecycle analysis

## References

* CVE-2026-11571
* WPScan Vulnerability Database entry: `4bd381e9-2f4e-4e61-99af-88f50aed71f5`
* Everest Forms WordPress plugin
* Everest Forms 3.5.0
* CWE-200: Exposure of Sensitive Information to an Unauthorized Actor

## Responsible Disclosure Notice

The operational proof of concept, concrete retrieval details, and raw evidence are withheld until the scheduled PoC publication date.

The information currently published is intended to document the vulnerability, credit the original research, explain the affected security boundary, and encourage administrators to update without unnecessarily accelerating exploitation of unpatched websites.
