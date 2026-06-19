---
title: "Everest Forms <= 3.4.8: Information Disclosure via Retained CSV Submission Artifacts"
date: 2026-06-19 21:30:00 +0700
categories: [Security Research, WordPress]
tags: [wordpress, everest-forms, information-disclosure, csv, vulnerability-research]
description: "Public-safe write-up for an unauthenticated information disclosure issue in Everest Forms <= 3.4.8 involving retained CSV submission artifacts."
permalink: /posts/everest-forms-information-disclosure-csv-artifacts/
---

# Everest Forms <= 3.4.8: Information Disclosure via Retained CSV Submission Artifacts

## Overview

I discovered an unauthenticated information disclosure issue affecting **Everest Forms**, a WordPress form builder plugin.

The issue affects Everest Forms versions **3.4.8 and earlier**.

Under a specific multi-notification configuration, Everest Forms can generate a CSV artifact containing form submission data and fail to remove that artifact after the email notification workflow completes.

Because the retained artifact is stored under the WordPress uploads area, form submission data may remain accessible outside the intended email delivery workflow.

> The operational proof of concept is intentionally withheld until **July 2, 2026** to give website owners additional time to update.

## Affected Software

| Field | Value |
| --- | --- |
| Software type | WordPress Plugin |
| Plugin | Everest Forms |
| Slug | `everest-forms` |
| Affected versions | `<= 3.4.8` |
| Vulnerability type | Information Disclosure |
| Minimum privileges required | Unauthenticated |

## Expected Behavior

CSV files generated for email attachments should be treated as temporary artifacts.

After the notification workflow completes, those files should be removed and should not remain in a web-accessible location.

## Actual Behavior

When a form is configured with multiple email notifications and the CSV attachment setting differs between notification contexts, a CSV artifact created by an earlier notification may not be removed after the workflow completes.

The retained file can contain submission data such as names, email addresses, subjects, messages, and other form fields depending on the affected form configuration.

## Root Cause

The issue is a file lifecycle management flaw in the notification attachment workflow.

A CSV artifact can be created in one notification context, while the cleanup decision later depends on a different notification context.

This creates a mismatch between:

- the notification that generated the CSV file, and
- the notification context used when deciding whether cleanup is required.

If the final notification context does not indicate that a CSV attachment was generated, the artifact created earlier may remain on disk.

## High-Level Flow

```text
Public form submission
        |
        v
Email notification workflow
        |
        v
CSV attachment generated for one notification
        |
        v
Later notification context differs
        |
        v
Cleanup does not remove earlier artifact
        |
        v
Submission data remains in a retained CSV file
```

## Impact

The issue may expose submitted form data to unauthenticated users when retained CSV artifacts remain available under the public uploads area.

The impact depends on the affected form and the sensitivity of its fields.

Potentially exposed data may include:

- Submitter name
- Email address
- Subject
- Message content
- Custom form fields
- Other data collected by the form

Forms used for support, contact, business leads, internal requests, or customer communication may have higher impact.

## Preconditions

The issue requires a specific notification configuration:

1. Everest Forms version **3.4.8 or earlier** is installed.
2. The form accepts public submissions.
3. Multiple email notifications are configured.
4. An earlier notification generates a CSV attachment.
5. A later notification is processed afterward with CSV attachment disabled.
6. The generated artifact is not removed after the workflow completes.

## Proof of Concept

The proof of concept is intentionally withheld until **July 2, 2026**.

This write-up does not include:

- direct retrieval requests,
- exact artifact paths,
- filename examples,
- enumeration details,
- returned CSV examples, or
- step-by-step reproduction payloads.

The goal is to document the vulnerability class and encourage timely updates without increasing risk for unpatched websites.

## Remediation

Site owners should update Everest Forms to a fixed version when available.

As defense in depth, administrators should review whether their forms use multiple notification workflows with different CSV attachment settings.

Administrators should also review their uploads area for unexpected retained CSV artifacts containing submission data and remove any files that are no longer needed.

## Secure Design Recommendations

### Track generated artifacts directly

Generated temporary files should be tracked at creation time and passed directly to cleanup logic.

Cleanup should not depend on a later mutable notification context.

### Keep sensitive temporary files outside public paths

Submission artifacts should not be stored in a public location unless access control is enforced.

A safer design is to store temporary attachment files outside the web root or use a protected temporary directory.

### Ensure cleanup runs reliably

Temporary files should be removed after the workflow completes, including cases where multiple notification contexts are processed.

Cleanup should also handle partial failures safely.

### Add regression coverage

Regression tests should include multi-notification forms where attachment settings differ across notifications.

This helps ensure that future changes do not reintroduce the same lifecycle mismatch.

## Disclosure Notes

This page intentionally omits operational details until **July 2, 2026**.

The purpose of this publication is to describe the issue at a safe level, credit the research, and encourage affected websites to update.

## References

- Everest Forms WordPress plugin
- Everest Forms email notification settings
- Everest Forms multiple notification workflow
- WordPress uploads behavior

## Research Credit

This vulnerability was independently discovered and validated by **Duy Tran**.

Research focus: WordPress plugin security, application security, and vulnerability lifecycle analysis.
