---
title: "CVE-2026-11571: When an Email CSV Attachment Stayed Public in Everest Forms"
date: 2026-06-19 21:30:00 +0700
last_modified_at: 2026-08-25 10:26:00 +0700
categories: [Security Research, WordPress]
tags: [cve, wordpress, everest-forms, sensitive-data-disclosure, information-disclosure, csv, cwe-200]
description: "Everest Forms versions up to 3.4.8 could leave generated CSV submission artifacts in a public uploads directory after a multi-notification email workflow, exposing form data to unauthenticated requests."
permalink: /posts/cve-2026-11571-everest-forms-sensitive-information-exposure/
---

# CVE-2026-11571: When an Email CSV Attachment Stayed Public in Everest Forms

## Overview

Everest Forms versions up to and including **3.4.8** contained an unauthenticated information disclosure issue in the CSV attachment workflow used for form email notifications.

The vulnerable behavior was subtle because the public form submission itself was not the bug. Visitors are supposed to be able to submit public forms. The problem happened after submission, when Everest Forms generated a per-entry CSV file for an email notification and failed to remove that file from the public uploads directory.

In the reproduced configuration, one notification created the CSV attachment and a later notification did not. Cleanup ran after the notification loop, but the cleanup decision used the later notification's context. That final context did not say a CSV attachment had been generated, so the earlier CSV file remained on disk.

The result was a public artifact containing submitted form data, reachable without authentication through a predictable entry-based filename.

The issue is tracked as **CVE-2026-11571**. The affected product is the **Everest Forms** WordPress plugin, slug `everest-forms`, with affected versions reported as **<= 3.4.8**.

## The Vulnerable Workflow

Everest Forms supports email notifications for form submissions. A notification can also attach a CSV copy of the submitted entry.

That feature creates a simple temporary-file lifecycle:

```text
form submitted
    -> generate CSV attachment
    -> send email notification
    -> remove generated CSV file
```

The bug appeared when the form used multiple notification connections with different CSV settings.

The reproduced setup was:

```text
Notification A: CSV attachment enabled
Notification B: CSV attachment disabled
Processing order: A first, B second
```

Notification A created the CSV file. Notification B was processed afterward. Then cleanup ran with Notification B's connection context instead of the context that originally created the file.

That produced the lifecycle mismatch:

```text
Notification A creates Entry data-4.csv
        |
        v
Notification B runs with CSV disabled
        |
        v
Cleanup checks the final notification context
        |
        v
File created by Notification A is not removed
        |
        v
CSV remains in public uploads
```

The retained file was written under this public path pattern:

```text
/wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry%20data-{entry_id}.csv
```

Once the artifact remained there, the issue no longer required a WordPress account. A direct HTTP request to a valid retained CSV filename was enough to retrieve the submission data.

## Where the Boundary Broke

A CSV generated for an email attachment should be treated as temporary server-side data. It may contain form submission fields such as name, email address, subject, message body, or whatever the site owner collected through the form.

The boundary broke when that temporary artifact became durable public content.

This is an important distinction. The issue was not caused by custom code, shell access, WP-CLI artifact creation, direct database edits, or an unusual server configuration. It occurred through the normal Everest Forms notification workflow after configuring notifications through the supported interface.

The security expectation was:

```text
CSV attachment exists only long enough to support email delivery
```

The observed behavior was:

```text
CSV attachment can remain in uploads and be fetched directly by unauthenticated users
```

That turns a backend notification artifact into a public disclosure primitive.

## How I Validated It

The validation used a normal public form with fields such as Name, Email, Subject, and Message.

The frontend submission workflow was reachable through the public form path, including the unauthenticated AJAX action:

```text
wp_ajax_nopriv_everest_forms_ajax_form_submission
```

The test configuration used two email notifications:

- the first notification had **Send CSV File as Attachment** enabled;
- the second notification had CSV attachment disabled;
- the second notification was processed after the first.

After submitting the form from the frontend as an unauthenticated user, the generated CSV artifact was requested directly from the uploads directory.

No application state needed to be modified by the attacker after submission. The security result came from the leftover file.

## Proof of Concept

A retained CSV artifact could be retrieved directly:

```http
GET /wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry%20data-4.csv HTTP/1.1
Host: example.com
```

The observed response was:

```http
HTTP/1.1 200 OK
Content-Type: text/csv
```

Example returned structure:

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

Nearby nonexistent identifiers returned `404`, which showed that valid and invalid artifact identifiers were distinguishable.

## Impact

The demonstrated impact is unauthenticated access to retained CSV submission artifacts.

The contents depend on the form configuration. In a typical contact-style form, the exposed fields may include:

- name;
- email address;
- subject;
- message body;
- any other data included in the generated CSV attachment.

This is a read-only disclosure issue. It does not demonstrate account takeover, privilege escalation, or write access to form entries. The risk is that private submission data can survive as a publicly reachable file after the email workflow finishes.

## Patch and Defensive Takeaways

The root problem was lifecycle tracking. Cleanup depended on the final notification context, while the file was created earlier by a different notification.

A safer design is to track generated artifacts directly:

```text
CSV file created
    -> remember exact generated path
    -> send notification
    -> delete that exact path regardless of later notification state
```

For plugins that generate exports, attachments, invoices, reports, or temporary files, cleanup should follow the artifact, not the last branch of the workflow.

There is also a storage lesson here. Files containing form submissions should not be written to a publicly reachable uploads path unless the plugin can guarantee immediate deletion or enforce access control. Randomized filenames can reduce guessability, but they do not replace correct cleanup and authorization.

## Recognizing This Pattern Elsewhere

This pattern often appears in multi-step workflows that generate temporary files:

```text
sensitive data
        +
temporary export or attachment
        +
public storage path
        +
cleanup tied to the wrong context
        =
unauthenticated disclosure
```

Good places to audit include:

- CSV exports;
- PDF attachments;
- generated invoices;
- form entry exports;
- backup files;
- debug logs;
- email attachments;
- import/export previews.

The useful review question is:

```text
What happens if one branch creates the file, but a later branch controls cleanup?
```

For notification systems, this is especially important. The final notification processed is not necessarily the notification that created the sensitive artifact.

A compact runtime test is:

```text
first notification: creates file
second notification: does not create file
cleanup: runs after both
```

If the cleanup decision follows the second notification, the first notification's artifact may survive.

## References

- [CVE-2026-11571 — CVE.org](https://www.cve.org/CVERecord?id=CVE-2026-11571)
- [Everest Forms plugin page](https://wordpress.org/plugins/everest-forms/)
- [Everest Forms Email Settings documentation](https://docs.everestforms.net/docs/email-settings/)
- [Everest Forms multiple email notification documentation](https://docs.everestforms.net/docs/how-to-send-multiple-email-notifications/)
- [WPScan advisory](https://wpscan.com/vulnerability/4bd381e9-2f4e-4e61-99af-88f50aed71f5/)

## Research Credit

- **Researcher:** Duy Tran
- **Disclosure:** Responsible disclosure through the WordPress vulnerability ecosystem

## Responsible Disclosure Notice

This write-up documents a vulnerability assigned a CVE and publicly disclosed through the WordPress vulnerability ecosystem.

Testing should be limited to systems you own or are explicitly authorized to assess. The proof of concept is included to explain the artifact-lifecycle failure and support defensive validation, not to encourage testing against third-party WordPress sites.