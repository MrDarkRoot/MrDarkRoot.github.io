---
layout: page
title: Services
icon: fas fa-briefcase
order: 3
permalink: /services/
description: Focused application security consulting by Duy Tran, including secure source-code review, web/API assessment, and targeted security review.
---

# Application Security Services

## Review security-sensitive code before it becomes a production problem

Modern applications can pass functional testing and still ship broken authorization, unsafe trust boundaries, insecure state transitions, or data-handling mistakes that ordinary testing does not meaningfully exercise.

I provide **focused application security and secure source-code review** for software teams that want a technical answer to a concrete security question.

My work is source-first and evidence-driven:

**understand the security model → trace the relevant code paths → validate realistic behavior → document the actual consequence → recommend a practical fix**

[Request a Security Review]({{ '/contact/' | relative_url }}) · [View Public Security Research]({{ '/research/' | relative_url }})

---

## When a Security Review Is Worth Doing

A focused review is especially useful when you are about to:

- launch a new authentication or authorization model
- introduce multi-user or multi-tenant functionality
- expose a new API or administrative endpoint
- ship payment, webhook, or third-party integration logic
- add file upload, export, import, or document workflows
- refactor security-sensitive backend code
- respond to a vulnerability report
- verify that a security patch actually closes the underlying bug class
- prepare a security-sensitive feature for production or enterprise customers

You do not always need a full pentest.

Sometimes the highest-value question is much narrower:

> **Is this security boundary implemented correctly?**

That is where a focused code review can be useful.

---

## What I Look For

### Authorization & Ownership Boundaries

I trace whether the application consistently proves that the current actor is allowed to perform the requested action on the specific target object.

Typical review areas include:

- IDOR / BOLA
- cross-user and cross-tenant access
- ownership validation
- privilege transitions
- missing object-level authorization
- authorization inconsistencies between interfaces

### Trust-Boundary Failures

I review where lower-trust input crosses into higher-trust application behavior, including:

- webhooks and callbacks
- background jobs and queues
- third-party integrations
- internal service assumptions
- signed or trusted request flows
- imported or externally derived data

### Security-Sensitive State Transitions

I prioritize operations that change persistent or privileged state, such as:

- account and identity changes
- role or permission changes
- ownership changes
- notification routing
- file or record deletion
- publishing and approval workflows
- billing or payment state
- administrative actions

### File & Data Lifecycle

I review not only how data enters the application, but also where it is stored, exposed, transformed, cached, exported, and deleted.

This includes:

- uploads
- generated files
- exports
- temporary artifacts
- sensitive storage paths
- cleanup logic
- partial-failure behavior

---

## Engagement Options

### Focused Source-Code Review

Best when you have a specific repository, module, feature, or security-sensitive workflow that needs deeper review.

Examples:

- authentication or authorization logic
- a new API
- file-handling code
- webhook processing
- payment or billing workflows
- tenant isolation
- security-sensitive patches

The goal is to answer a concrete question with code-path evidence rather than produce a generic scanner report.

### Web & API Security Assessment

For broader application surfaces where source review and controlled runtime validation should be combined.

Typical areas include:

- access-control and privilege boundaries
- authentication and session behavior
- API object-level authorization
- business-logic weaknesses
- state-transition abuse
- sensitive file operations
- application-specific trust assumptions

Testing is performed only within an agreed and authorized scope.

### Security Second Opinion

Useful when you already have a suspicious code path, vulnerability report, patch, or architectural decision and need a focused technical review.

Examples:

- Is this issue actually reachable?
- Does this patch fix the root cause?
- Is the authorization model enforced consistently?
- Is this behavior security-relevant?
- Which attack surface deserves deeper testing?

This is the lowest-friction option when you do not need a full assessment.

---

## What You Receive

**Not a scanner dump.**

Depending on the agreed scope, deliverables may include:

- concise executive summary
- prioritized technical findings
- affected code paths and security boundaries
- reproducible evidence
- impact analysis
- remediation guidance
- retest notes for agreed fixes

I avoid inflating reports with unsupported severity claims, theoretical issues without a defensible consequence, or automated findings that have not been technically validated.

---

## How I Work

### 1. Scope

Understand the application architecture, actors, trust assumptions, sensitive assets, and the exact question the review needs to answer.

### 2. Trace

Follow attacker-controlled data and security-sensitive state through entry points, guards, object relationships, and privileged operations.

### 3. Validate

Where appropriate, use controlled runtime testing and negative controls to confirm whether the suspected boundary actually fails.

### 4. Deliver

Document the security consequence, affected path, evidence, and practical remediation without overstating what the data supports.

---

## Public Security Research

My public vulnerability research and CVE write-ups are maintained separately on the [Research page]({{ '/research/' | relative_url }}).

That page is the source of truth for public disclosures, so this Services page stays focused on the consulting engagement itself rather than duplicating research records.

---

## Request a Security Review

If you have security-sensitive code you want reviewed, send:

- product or repository context
- technology stack
- intended scope
- available test environment
- target timeline
- the security question or risk you want answered

[Contact me]({{ '/contact/' | relative_url }}) or email **duyytrann22@gmail.com**.

> **Authorized engagements only.** Scope, target systems, test accounts, and active-testing boundaries should be agreed before assessment begins.
