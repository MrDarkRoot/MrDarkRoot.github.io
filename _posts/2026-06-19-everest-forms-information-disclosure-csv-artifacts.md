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

* **Official CVE Record:** [CVE-2026-11571](https://www.cve.org/CVERecord?id=CVE-2026-11571)
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

Because the retained artifact is publicly accessible and its naming is derived from form entry identifiers, unauthenticated attackers can retrieve form submission records when they identify a retained artifact.

## Affected Versions

* **Everest Forms:** versions earlier than 3.5.0
* **Validated vulnerable build:** 3.4.8
* **Fixed version:** 3.5.0

The tested workflow used the Everest Forms Pro CSV email-attachment functionality.

## Expected Behavior

CSV files generated for email attachments should be temporary artifacts.

After email delivery finishes, the generated CSV file should be deleted and should not remain accessible from a public uploads directory.

Temporary files containing form submission records should never become long-lived public web artifacts.

## Actual Behavior

When a form has more than one email notification and the CSV attachment option is enabled on a notification that is not processed last, Everest Forms can leave the generated CSV artifact on disk.

In the validated scenario:

1. Notification A had CSV attachment enabled.
2. Notification A generated the CSV artifact.
3. Notification B was processed afterward with CSV attachment disabled.
4. Cleanup ran after the notification loop using Notification B's connection context.
5. Because that final context did not indicate that a CSV attachment had been generated, the artifact created for Notification A was not removed.
6. The retained file remained directly accessible over HTTP without authentication.

## Vulnerability Chain

```text
Unauthenticated form submission
            |
            v
Everest Forms email notification workflow
            |
            v
Notification A: CSV attachment enabled
            |
            v
CSV artifact generated for the form entry
            |
            v
Notification B: CSV attachment disabled and processed later
            |
            v
Cleanup receives the final notification context
            |
            v
Earlier CSV artifact is not deleted
            |
            v
Artifact remains under the public uploads directory
            |
            v
Unauthenticated HTTP retrieval of submitted form data
```

The core issue is a **lifecycle/context mismatch**: the notification context responsible for generating a sensitive temporary artifact is not reliably preserved for the cleanup operation that must delete it.

## Required Conditions / Attack Preconditions

The reproduced scenario requires:

1. A vulnerable Everest Forms version earlier than **3.5.0**.
2. The CSV email-attachment functionality to be available and enabled.
3. A public form that accepts submissions.
4. At least two email notifications.
5. An earlier notification with **Send CSV File as Attachment** enabled.
6. A later notification processed after it with CSV attachment disabled.
7. The retained uploads directory to remain web accessible under the normal WordPress deployment model.

No WordPress account is required to retrieve a retained artifact.

## Trust-Boundary Analysis

The intended security boundary is the form-submission and notification workflow. Submitted data may be processed internally and attached to configured email notifications, but a temporary attachment should not become a persistent public object.

The vulnerable workflow crosses that boundary by leaving the CSV artifact under a public uploads path after its legitimate lifecycle has ended.

Once retained, access to the submission data no longer depends on:

* WordPress authentication,
* entry ownership,
* form-management capabilities, or
* administrative permissions.

The protected object has effectively moved from application-controlled submission data to an unauthenticated static file.

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
* Other information collected by the form

The confidentiality impact therefore depends on the purpose and fields of the affected form.

## How I Found This Vulnerability

I found this issue by reviewing the lifecycle of sensitive artifacts created during normal application workflows rather than looking only for direct authorization checks.

The investigation focused on a simple question:

> If the plugin creates a file containing user-submitted data, what guarantees that the file is deleted after its intended use ends?

### 1. Identify the sensitive artifact

The email-notification functionality can generate a per-entry CSV file containing form submission data. That immediately makes the generated file a security-sensitive object because it can contain information that is normally accessible only through the application's submission-management workflow.

### 2. Trace creation and cleanup as separate operations

Instead of stopping at the code that generates the attachment, I followed the file through its complete lifecycle:

```text
create -> attach -> send -> cleanup
```

The important question was whether cleanup was tied to the exact artifact that had been created.

### 3. Compare state across multiple notifications

Everest Forms can process more than one notification for a single form submission. That creates a state-management edge case: each notification may have different settings, but cleanup happens after notification processing.

I therefore tested mixed notification states rather than only the simple single-notification case:

```text
Notification A: CSV enabled
Notification B: CSV disabled
```

The key observation was that Notification A created the CSV, while the later Notification B changed the connection context used by the workflow.

### 4. Test the lifecycle invariant

The invariant I expected was:

```text
If a CSV artifact is generated for a submission,
it must be removed after notification processing completes.
```

That invariant failed. When the earlier notification created the file and the later notification had CSV disabled, the generated artifact remained after the workflow completed.

### 5. Check whether the residual file crossed an access-control boundary

A leftover temporary file is not automatically a security vulnerability. The next validation step was to determine whether the file was reachable outside the privileged application workflow.

The retained artifact was stored below the WordPress uploads directory and could be requested directly without authentication. Its filename was also based on the entry identifier, making valid artifacts distinguishable from nonexistent ones.

At that point the bug changed from a cleanup defect into an unauthenticated information-disclosure issue.

### Research takeaway

This bug is a useful example of why file-lifecycle review matters in application security. For temporary sensitive artifacts, I now treat the following as separate security questions:

```text
Who can cause the artifact to be created?
What data does it contain?
Where is it stored?
What state controls its cleanup?
Is cleanup bound to the artifact that was actually created?
Can another workflow iteration overwrite that state?
What happens if cleanup does not occur?
Is the residual object reachable without the application's normal authorization layer?
```

## Technical Validation

The issue was validated in a controlled WordPress test environment using Everest Forms 3.4.8 and the required multi-notification configuration.

Testing confirmed that:

1. Public frontend submission reaches the normal Everest Forms submission workflow.
2. Notification A generates a CSV artifact when its CSV attachment setting is enabled.
3. Notification B is processed afterward with CSV attachment disabled.
4. The cleanup operation does not remove the artifact generated by Notification A.
5. The artifact remains under the WordPress uploads directory after the workflow completes.
6. An unauthenticated HTTP request can retrieve the retained CSV.
7. Nearby nonexistent entry identifiers return 404, allowing existing and nonexistent artifacts to be distinguished.

The frontend submission path is reachable through normal public form submission, including the plugin's unauthenticated AJAX submission handler.

## Proof of Concept

The coordinated disclosure buffer has ended and the vulnerability is publicly disclosed and fixed. The following PoC documents the controlled validation performed against a local test installation.

### Environment

* Everest Forms: 3.4.8
* Public form with fields such as Name, Email, Subject, and Message
* Two email notifications
* Notification A: CSV attachment enabled
* Notification B: CSV attachment disabled and processed after Notification A

### Reproduction

1. Install and activate a vulnerable Everest Forms version.
2. Create or use a public form with standard submission fields.
3. Configure two email notifications.
4. Enable **Send CSV File as Attachment** for Notification A.
5. Disable CSV attachment for Notification B.
6. Ensure Notification B is processed after Notification A.
7. Publish the form.
8. Submit the form from the frontend without authenticating.
9. After submission processing completes, request the retained CSV artifact using the corresponding entry identifier.

The generated artifact is stored using the following pattern:

```text
/wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry data-{entry_id}.csv
```

Spaces can be URL encoded when requesting the file:

```http
GET /wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry%20data-4.csv HTTP/1.1
Host: example.local
Connection: close
```

### Observed Result

The vulnerable installation returned the retained CSV without requiring authentication:

```http
HTTP/1.1 200 OK
Content-Type: text/csv
```

A sanitized example of the returned structure is:

```csv
ID,Name,Email,Subject,Message
"4","Scenario B Native Tester","scenario-b-native@example.local","Scenario B native CSV lifecycle","connection_1 on, connection_2 off last"
```

In the validated lab scenario, multiple retained artifacts were reachable:

```text
Entry data-4.csv -> 200 OK
Entry data-5.csv -> 200 OK
Entry data-6.csv -> 200 OK
```

Nearby nonexistent identifiers returned **404 Not Found**.

This demonstrates both the persistence of the generated sensitive artifact and the unauthenticated boundary crossing caused by storing it under a public uploads path.

### Minimal Verification with curl

For an authorized test environment, the residual artifact can be checked directly:

```bash
curl -i 'http://example.local/wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry%20data-4.csv'
```

A vulnerable retained artifact returns the CSV response. A nonexistent artifact returns 404.

The PoC should only be used against systems you own or are explicitly authorized to test.

## Remediation

Site owners should update Everest Forms to version **3.5.0 or later**.

Administrators should also review their uploads directory for retained CSV artifacts generated by Everest Forms and remove any files containing submission records that should not be publicly accessible.

Sites using the CSV email-attachment functionality should review forms with multiple email notifications and confirm whether CSV attachment settings differ between notification contexts.

## Secure Design Recommendations

### Track generated artifacts directly

When a notification generates a temporary CSV attachment, the generated file path should be tracked explicitly.

Cleanup should operate on the generated artifact itself rather than infer cleanup behavior from the final notification context.

### Bind cleanup state to artifact creation

The state used to decide whether cleanup is necessary should be bound to the notification or artifact that actually created the file.

A later notification must not overwrite the state required to delete an earlier notification's sensitive temporary artifact.

### Store sensitive temporary files outside public paths

Temporary files containing form submissions should not be stored in public web-accessible locations unless access control is enforced.

A safer design is to use a protected temporary directory outside the web root or another storage mechanism that does not expose files directly to unauthenticated HTTP requests.

### Delete temporary files reliably

Temporary artifacts should be deleted after email delivery, including when multiple notifications are processed and when notification settings differ.

Cleanup should also be resilient to partial workflow failures.

### Add regression tests for multi-notification workflows

Regression tests should cover:

* CSV attachment enabled on the first notification and disabled on the last notification
* CSV attachment disabled on the first notification and enabled on the last notification
* mixed notification settings across more than two notifications
* mail delivery failure and partial workflow failure cases
* verification that no generated CSV remains web accessible after the workflow completes

## Disclosure Timeline

| Date | Event |
| --- | --- |
| 2026 | Vulnerability discovered and reproduced in a controlled environment |
| 2026 | Vulnerability submitted for coordinated disclosure |
| 2026 | Issue independently verified |
| 2026 | Everest Forms 3.5.0 released with a security fix |
| 2026-06-18 | WPScan public vulnerability entry published |
| 2026-07-02 | Coordinated PoC publication buffer ended |
| 2026-07-09 | CVE-2026-11571 published in the CVE/NVD ecosystem |
| 2026-08-18 | Public write-up updated with PoC and discovery methodology |

## Research Credit

This vulnerability was independently discovered and reported by:

**Duy Tran / MrDarkRoot**

* Original Researcher: Duy
* Submitter: Duy
* Research focus: WordPress plugin security, application security, and vulnerability lifecycle analysis

## References

* Official CVE Record: [CVE-2026-11571](https://www.cve.org/CVERecord?id=CVE-2026-11571)
* WPScan Vulnerability Database: [4bd381e9-2f4e-4e61-99af-88f50aed71f5](https://wpscan.com/vulnerability/4bd381e9-2f4e-4e61-99af-88f50aed71f5/)
* Everest Forms WordPress plugin
* Everest Forms Email Settings documentation
* Everest Forms multiple email notification documentation
* CWE-200: Exposure of Sensitive Information to an Unauthorized Actor

## Responsible Disclosure Notice

This write-up documents a vulnerability that has already been publicly disclosed and fixed in Everest Forms 3.5.0.

The proof of concept is provided for defensive validation, vulnerability research, and authorized security testing. Do not use it against systems without explicit authorization.
