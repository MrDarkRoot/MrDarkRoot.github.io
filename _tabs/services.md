---
layout: page
title: Services
icon: fas fa-briefcase
order: 3
permalink: /services/
description: Application security consulting services by Duy Tran, including source-code review and authorized web/API security assessment.
---

## Application Security Services

I provide focused, authorized application security work for software teams that need a technical review of code, attack surfaces, or a specific security boundary.

My approach is evidence-driven: understand the threat model, trace the relevant code paths, validate behavior where appropriate, and report only what the evidence supports.

---

## Secure Source-Code Review

Review of security-sensitive implementation paths with emphasis on:

- authentication and authorization boundaries
- IDOR / BOLA and ownership failures
- business-logic vulnerabilities
- unsafe file operations
- sensitive data exposure
- webhook and trust-boundary failures
- persistence and rendering paths
- security-sensitive patch and regression review

The review can be scoped to a repository, module, feature, or specific security concern.

---

## Web & API Security Assessment

Targeted testing of authorized web applications and APIs, including:

- access-control and privilege-boundary testing
- authentication and session-management review
- API authorization and object-level access control
- input and state-transition testing
- file upload and file-operation review
- common OWASP application-security weaknesses
- business-logic and workflow abuse cases

Testing scope, accounts, environments, and prohibited actions should be agreed before active testing begins.

---

## Focused Security Review

For teams that do not need a full assessment, I can review a narrower question such as:

- whether a feature introduces a new trust boundary
- whether a patch fully addresses a vulnerability class
- whether an authorization model is enforced consistently
- whether a reported issue is technically reachable and security-relevant
- which attack surfaces deserve deeper testing

This format is useful for a feature launch, remediation check, or targeted technical second opinion.

---

## Deliverables

Depending on scope, deliverables may include:

- concise executive summary
- technical findings with evidence
- affected code paths or security boundaries
- reproduction guidance for the authorized environment
- impact analysis
- remediation recommendations
- retest notes for agreed fixes

I avoid unsupported severity claims and scanner-only findings without a defensible security consequence.

---

## Engagement Principles

- Authorized testing only
- Clear scope and rules of engagement
- Minimal collection of sensitive data
- Reproducible technical evidence
- Responsible handling of discovered vulnerabilities
- Practical remediation guidance for developers

---

## Start a Conversation

If you need a source-code review, application security assessment, or focused security consultation, send:

- product or repository context
- technology stack
- intended scope
- environment available for testing
- timeline
- the security questions you want answered

[Contact me]({{ '/contact/' | relative_url }}) or email `duyytrann22@gmail.com`.
