---
layout: page
title: About
icon: fas fa-user
order: 5
permalink: /about/
---

## About Me

I’m **Tran Khanh Duy**, an application security learner and independent security researcher focused on finding, validating, and responsibly disclosing vulnerabilities in web applications and WordPress plugins.

My current work centers on:

- **Application Security:** authentication, authorization, access control, input handling, and business-logic flaws
- **WordPress Security Research:** source-code review, patch-diff analysis, runtime validation, and coordinated disclosure
- **API Security:** IDOR, broken authorization, insecure state transitions, rate-limit weaknesses, and OWASP API Security risks
- **Security Automation:** building Python, Bash, and CLI workflows for repeatable reconnaissance, testing, and evidence collection

I prefer evidence-driven research: trace the data flow, identify the trust boundary, reproduce the behavior in a controlled lab, measure the real impact, and document the result clearly.

---

## Vulnerability Research

### CVE-2026-11855

I discovered and reported **CVE-2026-11855**, an unauthenticated stored cross-site scripting vulnerability affecting the Simple Membership WordPress plugin before version 4.7.5.

The issue involved a forged Stripe webhook path, persistent attacker-controlled data, and unsafe rendering inside an administrator-facing notice.

- **Type:** Unauthenticated Stored XSS
- **CWE:** CWE-79
- **CVSS:** 8.8 — High
- **Affected software:** Simple Membership for WordPress
- **Fixed version:** 4.7.5
- **Researcher:** Duy Tran

[Read the technical write-up](/posts/cve-2026-11855-simple-membership-stored-xss/)

---

## Research Methodology

My typical workflow is:

1. Select an in-scope target and verify the latest affected version.
2. Review source code and recent patches for high-value trust-boundary changes.
3. Trace attacker-controlled input to security-sensitive sinks.
4. Validate reachability, authorization requirements, persistence, and impact.
5. Reproduce the issue in an isolated local environment.
6. Prepare a minimal, verifiable report for coordinated disclosure.

My main research interests include broken access control, privilege escalation, stored XSS, webhook security, unsafe file operations, authentication flaws, and business-logic vulnerabilities.

---

## Skills and Tools

- Web and API penetration testing
- WordPress plugin security review
- PHP and JavaScript source-code analysis
- Burp Suite and manual HTTP testing
- Python and Bash automation
- Docker-based security labs
- Git and patch-diff analysis
- Linux and Windows security fundamentals

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

> Research carefully. Validate honestly. Disclose responsibly.
