---
title: "CVE-2026-11571: Everest Forms Left Submission CSV Artifacts Publicly Reachable"
date: 2026-06-19 21:30:00 +0700
last_modified_at: 2026-08-25 10:13:00 +0700
categories: [Security Research, WordPress]
tags: [cve, wordpress, everest-forms, sensitive-data-disclosure, information-disclosure, csv, cwe-200]
description: "Everest Forms versions up to 3.4.8 could leave generated CSV submission artifacts in a public uploads directory after a multi-notification email workflow, exposing form data to unauthenticated requests."
permalink: /posts/cve-2026-11571-everest-forms-sensitive-information-exposure/
---

# CVE-2026-11571: Everest Forms Left Submission CSV Artifacts Publicly Reachable

## Overview

Everest Forms versions up to and including **3.4.8** contained an unauthenticated information disclosure issue in the CSV attachment workflow used for form email notifications.

The bug was not in the public form submission endpoint by itself. Public submissions are expected. The problem appeared later, after the plugin generated a per-entry CSV attachment for an email notification and failed to remove that file from the uploads directory.

In the validated scenario, the form had two email notifications. The first notification generated a CSV attachment. The second notification, processed afterward, did not. Cleanup ran after the notification loop, but it used the later notification context instead of the context that created the CSV file. The result was a leftover CSV artifact containing submitted form data.

Because the file lived under a public WordPress uploads path and used a predictable entry-based filename, an unauthenticated request could retrieve the retained artifact directly.

The issue is tracked as **CVE-2026-11571**. The validated affected range from the report was **Everest Forms <= 3.4.8**.

## Affected Versions

- **Product:** Everest Forms WordPress Plugin
- **Plugin slug:** `everest-forms`
- **Affected versions:** `<= 3.4.8`
- **Vulnerability type:** Information Disclosure
- **CWE:** CWE-200 — Exposure of Sensitive Information to an Unauthorized Actor
- **Required access:** Unauthenticated
- **Public artifact path pattern:** `wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry data-{entry_id}.csv`

## The Vulnerable Workflow

Everest Forms can send email notifications when a user submits a form. A notification may also include a CSV attachment containing the submitted entry data.

That feature creates a lifecycle requirement:

```text
create CSV for email attachment
        -> send email
        -> delete temporary CSV file
```

The vulnerable case appeared when multiple notifications were configured with different CSV attachment settings.

In the reproduced setup:

- Notification A had **CSV attachment enabled**.
- Notification B had **CSV attachment disabled**.
- Notification B was processed after Notification A.

Notification A caused the CSV artifact to be written to disk. But the cleanup logic later evaluated the final notification context. Since the final context came from Notification B, where CSV attachment was disabled, the cleanup path did not remove the file created earlier.

The small lifecycle mismatch looked like this:

```text
Notification A
    CSV enabled
    -> Entry data-4.csv created

Notification B
    CSV disabled
    -> final connection context says no CSV attachment

Cleanup
    uses Notification B context
    -> CSV created by Notification A remains on disk
```

That leftover file became the disclosure primitive.

## Where the Boundary Broke

The sensitive boundary was not authentication to the WordPress dashboard. It was the public web reachability of an internal email artifact.

A CSV file generated for an outbound email attachment should behave like temporary server-side data. It should not become a durable public object under the uploads directory after the email workflow completes.

In the affected workflow, the artifact remained reachable here:

```text
/wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry%20data-{entry_id}.csv
```

The filename was derived from the entry identifier. That made retained artifacts easier to locate once an attacker knew or guessed valid entry numbers.

The important distinction is that the form submission itself did not require authentication. The security failure happened because submission data that should have existed only as a transient email attachment became a public file.

## How I Validated It

The validation used a normal product workflow rather than custom code, direct database modification, WP-CLI artifact creation, shell access, or unsafe server configuration.

The setup was:

1. install and activate Everest Forms `<= 3.4.8`;
2. configure a public form with fields such as Name, Email, Subject, and Message;
3. create two email notifications;
4. enable CSV attachment on the first notification;
5. disable CSV attachment on the second notification;
6. submit the form from the frontend as an unauthenticated user;
7. request the expected CSV artifact path directly.

The frontend submission path was reachable through the normal public form workflow, including the unauthenticated AJAX action:

```text
wp_ajax_nopriv_everest_forms_ajax_form_submission
```

After submission, retained files were accessible under the uploads directory without authentication.

## Proof of Concept

A simplified retrieval request looked like this:

```http
GET /wp-content/uploads/Everes-Froms-Entries-CSV-file/Entry%20data-4.csv HTTP/1.1
Host: example.com
```

The observed response was:

```http
HTTP/1.1 200 OK
Content-Type: text/csv
```

Example returned CSV structure:

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

Depending on the form configuration, the exposed data can include submitted fields such as:

- name;
- email address;
- subject;
- message body;
- any other fields included in the generated CSV attachment.

This is a read-only vulnerability. It does not require the attacker to log in, and it does not require modifying form entries. The risk comes from the plugin leaving sensitive submission data behind in a public location after the notification workflow completes.

## Patch and Defensive Takeaways

The core fix is to make CSV artifact cleanup follow the artifact that was actually created, not the final notification connection that happened to be processed last.

A safe lifecycle should track the generated file explicitly:

```text
CSV generated for notification X
        -> remember exact generated path
        -> send notification
        -> delete generated path regardless of later notification context
```

Defensively, temporary files that contain form submissions should not be placed in publicly reachable directories unless access is explicitly controlled. If a plugin must write to uploads, the file should be removed immediately after use, and ideally placed behind randomized names, access controls, or a private storage path.

The broader lesson is that cleanup bugs are security bugs when temporary artifacts contain sensitive data and the storage location is web-accessible.

## Recognizing This Pattern Elsewhere

This pattern appears whenever a plugin creates temporary public files during a multi-step workflow:

```text
sensitive data
        +
temporary export / attachment / report file
        +
public uploads directory
        +
incomplete cleanup
        =
unauthenticated disclosure
```

During review, I look for features such as:

- CSV exports;
- PDF attachments;
- generated invoices;
- backup files;
- debug logs;
- email attachments;
- import/export previews.

The useful audit question is:

```text
What happens if the workflow creates the file in one branch, but cleanup runs under a different branch or later context?
```

For multi-recipient or multi-notification systems, this is especially important. The last item processed is not always the item that created the sensitive artifact.

A good runtime test is to configure two workflow branches with different settings:

```text
first branch: creates file
second branch: does not create file
cleanup: runs after both
```

If the cleanup decision depends on the second branch, the first branch's artifact may survive.

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