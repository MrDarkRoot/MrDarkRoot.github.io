---
layout: page
title: About
icon: fas fa-user
order: 5
permalink: /about/
---

## About Me

I’m **Tran Khanh Duy**, an independent application security researcher focused on web applications, APIs, and WordPress plugin security.

My work combines source-code review, manual testing, patch-diff analysis, and controlled runtime validation. I am especially interested in vulnerabilities where trust is misplaced across authentication, authorization, persistence, and rendering boundaries.

Current focus areas include:

- Broken access control and IDOR
- Authentication and session-management flaws
- Privilege escalation
- Stored cross-site scripting
- Webhook authenticity and trust-boundary failures
- Unsafe file operations
- Business-logic vulnerabilities
- Security testing automation

I approach research with a simple rule: prove reachability, prove impact, and document only what the evidence supports.

---

## Vulnerability Research

### CVE-2026-11855

I discovered and reported **CVE-2026-11855**, an unauthenticated stored cross-site scripting vulnerability in the Simple Membership WordPress plugin before version 4.7.5.

The vulnerability involved an unauthenticated Stripe webhook path, attacker-controlled persistent data, and unsafe rendering inside an administrator-facing notice.

- **Severity:** High
- **CVSS:** 8.8
- **CWE:** CWE-79
- **Affected versions:** Before 4.7.5
- **Fixed version:** 4.7.5
- **Researcher:** Duy Tran

[Read the full technical write-up](/posts/cve-2026-11855-simple-membership-stored-xss/)

More research notes and disclosures are available on the [Research](/research/) page.

---

## Research Workflow

My usual workflow is:

1. Confirm the target is in scope and identify the latest relevant version.
2. Review source code, recent patches, and exposed attack surfaces.
3. Trace attacker-controlled data across trust boundaries.
4. Validate actor requirements, authorization checks, persistence, and impact.
5. Reproduce the issue in an isolated local lab.
6. Collect minimal, repeatable evidence.
7. Submit through coordinated disclosure or an authorized bug-bounty program.

I prioritize findings with clear security impact over code patterns that only appear dangerous in isolation.

---

## Skills and Tooling

- Web and API penetration testing
- WordPress plugin source-code review
- PHP and JavaScript analysis
- Burp Suite and manual HTTP testing
- Python and Bash automation
- Docker-based WordPress labs
- Git, SVN, and patch-diff analysis
- Linux security workflows
- Vulnerability reporting and coordinated disclosure

---

## Training

- [TryHackMe: Red Teaming](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-IHR8ZG35BG.pdf)
- [TryHackMe: Jr Penetration Tester](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-G6DMYVUIQD.pdf)
- [TryHackMe: Web Application Pentesting](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-AAUZBCLVPN.pdf)
- [TryHackMe: CompTIA Pentest+](https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-UOYIAPQBOV.pdf)

---

## Profiles and Contact

- [GitHub](https://github.com/MrDarkRoot)
- [TryHackMe](https://tryhackme.com/p/biusa)
- [LinkedIn](https://www.linkedin.com/in/duy-tr%E1%BA%A7n-7b0987357/)
- Email: `duyytrann22@gmail.com`

All research published on this site is conducted in authorized environments, local labs, or public vulnerability-disclosure programs.

> Validate carefully. Report honestly. Disclose responsibly.
