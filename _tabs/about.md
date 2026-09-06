---
layout: page
title: About
icon: fas fa-user
order: 5
permalink: /about/
description: About Duy Tran (MrDarkRoot), an independent application security researcher and security consultant focused on source-code review, web/API security, and open-source vulnerability research.
---

# About Me

I’m **Duy Tran (MrDarkRoot)**, an independent application security researcher and application security consultant based in Vietnam.

My work focuses on **secure source-code review, web and API security, open-source vulnerability research, and coordinated vulnerability disclosure**.

I am most interested in vulnerabilities that appear when an application’s intended security model is not fully enforced in code: missing authorization decisions, broken trust boundaries, unsafe state transitions, inconsistent access rules, sensitive data lifecycle failures, and security assumptions that break across components.

My public research includes independently discovered vulnerabilities that have been assigned CVEs. The current disclosure record and technical write-ups are maintained on the [Research page]({{ '/research/' | relative_url }}).

---

## Current Work

My current work combines:

- manual source-code review
- attack-surface mapping
- authorization and trust-boundary analysis
- patch and regression review
- controlled runtime validation
- web and API security testing
- vulnerability triage and exploitability validation
- coordinated disclosure and technical security writing

I started with a strong focus on WordPress and PHP application security, particularly broken access control and object-ownership failures.

My research has since expanded into broader open-source security work across application frameworks, libraries, developer tooling, distributed systems, and security-sensitive infrastructure components.

The common thread is the same:

> **Find where the software assumes a security property, then verify whether the implementation actually enforces it.**

---

## What I Focus On

Areas I review most often include:

### Authorization & Access Control

- IDOR / BOLA
- missing object-level authorization
- cross-user and cross-tenant access
- ownership validation
- privilege and role transitions
- authorization inconsistencies across interfaces

### Trust Boundaries

- webhooks and callbacks
- externally supplied metadata
- background jobs and queues
- internal service assumptions
- signed or trusted request flows
- transitions between lower-trust and higher-trust contexts

### Security-Sensitive Application Logic

- authentication and session behavior
- sensitive state transitions
- business-logic vulnerabilities
- file operations and data lifecycle
- persistence and rendering paths
- security-sensitive patch regressions

### Open-Source Security Research

I also review security-relevant code in open-source libraries, frameworks, SDKs, parsers, developer tooling, and infrastructure components where trust boundaries or protocol assumptions can create security impact.

---

## Research Method

I prefer a source-first workflow built around evidence.

A typical review looks like:

1. **Scope** — identify the target, actors, assets, and relevant security boundaries.
2. **Map** — find reachable entry points and security-sensitive operations.
3. **Trace** — follow attacker-controlled data through guards, object relationships, and state transitions.
4. **Challenge** — ask what each security check actually proves and what assumption remains unverified.
5. **Validate** — reproduce the suspected behavior in an authorized environment or local lab.
6. **Control** — use negative controls to distinguish a real boundary failure from expected behavior.
7. **Document** — report only what the evidence supports, with reproducible technical reasoning.

The objective is not to maximize finding count.

A single well-supported trust-boundary failure is more useful than a long list of scanner findings or suspicious code patterns without demonstrated security consequences.

---

## Public Research

My public vulnerability disclosures, CVE write-ups, and technical research are maintained here:

[View Security Research →]({{ '/research/' | relative_url }})

I keep the detailed disclosure record there so the About page can remain stable as the research portfolio grows.

---

## Security Consulting

I also provide focused, authorized application security work for software teams that need a deeper review of a repository, feature, API, patch, or security-sensitive workflow.

Current engagement options are documented on the [Services page]({{ '/services/' | relative_url }}).

Typical work includes secure source-code review, web/API security assessment, and focused technical second opinions.

[View Services →]({{ '/services/' | relative_url }})  
[Contact Me →]({{ '/contact/' | relative_url }})

---

## Background

I am an Information Technology graduate from **Saigon Technology University (STU)**.

My security training has included hands-on web application security, penetration testing, red teaming, and practical lab work.

Selected training:

- [TryHackMe: Red Teaming](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-IHR8ZG35BG.pdf)
- [TryHackMe: Jr Penetration Tester](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-G6DMYVUIQD.pdf)
- [TryHackMe: Web Application Pentesting](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-AAUZBCLVPN.pdf)
- [TryHackMe: CompTIA Pentest+](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-UOYIAPQBOV.pdf)

---

## Profiles

- [GitHub](https://github.com/MrDarkRoot)
- [HackerOne](https://hackerone.com/duyytrann?type=user)
- [Google Bug Hunters](https://bughunters.google.com/profile/4b61790a-3556-49b1-807e-90ade6ab0109)
- [PT Security DBugs](https://dbugs.ptsecurity.com/researchers/Duy%20Tran)
- [TryHackMe](https://tryhackme.com/p/biusa)
- [LinkedIn](https://www.linkedin.com/in/duy-tr%E1%BA%A7n-7b0987357/)
- Email: **duyytrann22@gmail.com**

---

## Research Ethics

All security research and testing published on this site is conducted in **authorized environments, local labs, client-approved scopes, or public vulnerability-disclosure programs**.

I do not present unverified code patterns as confirmed vulnerabilities, and I avoid publishing operational exploitation details before coordinated disclosure permits them.

> **Validate carefully. Report honestly. Disclose responsibly.**
