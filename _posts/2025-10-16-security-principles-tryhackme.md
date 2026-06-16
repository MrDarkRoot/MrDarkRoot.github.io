---
title: "Security Principles: CIA, DAD, Security Models, and Zero Trust"
date: 2025-10-16 20:00:00 +0700
categories: [Security Fundamentals, TryHackMe]
tags: [security-principles, cia-triad, dad-triad, zero-trust, security-models, tryhackme]
description: "A practical summary of core security principles, including the CIA and DAD triads, Bell-LaPadula, Biba, Clark-Wilson, defence in depth, and Zero Trust."
---

## Overview

This article summarizes the core concepts covered in TryHackMe's **Security Principles** room. These concepts provide a foundation for application security, penetration testing, threat modeling, and secure system design.

The main topics are:

- The **CIA triad** and the opposing **DAD triad**
- Authenticity and nonrepudiation
- Bell-LaPadula, Biba, and Clark-Wilson security models
- Defence in depth and Zero Trust
- Vulnerability, threat, and risk
- Least privilege and attack-surface minimization
- The shared-responsibility model

---

## CIA Triad

The CIA triad describes three fundamental security objectives.

| Principle | Meaning | Example controls |
| --- | --- | --- |
| **Confidentiality** | Prevent unauthorized disclosure of information | Encryption, access control, secret management |
| **Integrity** | Prevent or detect unauthorized modification | Hashing, digital signatures, audit logging |
| **Availability** | Keep systems and data accessible when required | Redundancy, backups, load balancing, DDoS protection |

Security engineering usually requires balancing all three. A control that improves confidentiality may reduce availability if it creates excessive friction or lockouts.

### Additional properties

- **Authenticity:** confidence that data, users, or systems are genuinely what they claim to be.
- **Nonrepudiation:** evidence that prevents a party from credibly denying an action or transaction.

---

## Parkerian Hexad

The Parkerian Hexad extends the CIA triad with additional information-security properties:

- **Possession or control:** protecting information from unauthorized physical or logical control.
- **Authenticity:** ensuring information and identities are genuine.
- **Utility:** ensuring information remains usable for its intended purpose.

For example, encrypted data without the decryption key may remain confidential but lose utility.

---

## DAD Triad

The DAD triad describes outcomes that oppose the CIA triad.

| Outcome | Security property affected | Example |
| --- | --- | --- |
| **Disclosure** | Confidentiality | Sensitive customer data is exposed |
| **Alteration** | Integrity | Transaction records are modified |
| **Destruction or Denial** | Availability | A service is deleted or made unreachable |

This mapping is useful during threat modeling because it connects attacker actions to security impact.

---

## Security Models

### Bell-LaPadula

Bell-LaPadula focuses on **confidentiality**.

- **No read up:** a subject cannot read data at a higher classification level.
- **No write down:** a subject cannot write data to a lower classification level.

A common memory aid is: **read down, write up**.

### Biba

Biba focuses on **integrity**.

- **No read down:** a high-integrity subject should not consume lower-integrity data.
- **No write up:** a lower-integrity subject should not modify higher-integrity data.

A common memory aid is: **read up, write down**.

### Clark-Wilson

Clark-Wilson protects integrity through controlled transactions and separation of duties.

Its main components include:

- **Constrained Data Items (CDIs)**
- **Unconstrained Data Items (UDIs)**
- **Transformation Procedures (TPs)**
- **Integrity Verification Procedures (IVPs)**

Instead of allowing arbitrary data modification, the model requires users to operate through approved procedures.

---

## Defence in Depth

Defence in depth uses multiple independent security layers so that one control failure does not immediately compromise the system.

For a web application, these layers might include:

1. Authentication and multi-factor authentication
2. Authorization checks at every sensitive action
3. Input validation and context-aware output encoding
4. Network segmentation
5. Audit logging and anomaly detection
6. Backups and incident-response procedures

The objective is not to duplicate controls blindly, but to prevent a single failure from becoming a complete compromise.

---

## Zero Trust

Zero Trust is based on the principle:

> Never trust implicitly; verify explicitly.

Users, devices, workloads, and requests should be evaluated based on identity, context, device state, risk, and least privilege rather than network location alone.

For application security, this means that being authenticated is not sufficient. Every sensitive operation must still verify:

- Who is making the request
- Whether they own or may access the target object
- Whether the requested state transition is allowed
- Whether the request context is trustworthy

This is directly relevant to vulnerabilities such as IDOR, broken access control, privilege escalation, and insecure workflow transitions.

---

## Vulnerability, Threat, and Risk

| Concept | Meaning | Example |
| --- | --- | --- |
| **Vulnerability** | A weakness in design, implementation, or configuration | Missing ownership validation in an API endpoint |
| **Threat** | An actor or event capable of exploiting a weakness | An authenticated attacker enumerating object identifiers |
| **Risk** | The likelihood and impact of exploitation | Exposure or modification of another user's sensitive data |

A vulnerability is not automatically high risk. Risk depends on reachability, attacker capability, affected assets, exploit reliability, and business impact.

---

## Secure Architecture Principles

Important design principles include:

- **Domain separation:** isolate systems and data with different trust requirements.
- **Layering:** place controls at multiple architectural boundaries.
- **Encapsulation:** expose only the interfaces required for legitimate use.
- **Redundancy:** avoid single points of failure.
- **Least privilege:** grant only the permissions required for a task.
- **Attack-surface minimization:** remove unnecessary endpoints, services, features, and privileges.

These principles are especially valuable during architecture review and source-code audit because they help identify misplaced trust and excessive authority.

---

## Shared-Responsibility Model

In cloud environments, security responsibilities are divided between the cloud provider and the customer.

The provider typically secures the underlying infrastructure, while the customer remains responsible for areas such as:

- Identity and access management
- Application security
- Data classification and protection
- Cloud configuration
- Secrets management
- Logging and monitoring

The exact boundary depends on whether the service is IaaS, PaaS, or SaaS.

---

## Application-Security Takeaways

For AppSec work, the most useful lessons are:

1. Treat every external input as untrusted, even when it comes from an integrated service or webhook.
2. Authentication does not replace object-level authorization.
3. Enforce least privilege at the action and data-object level.
4. Design workflows to fail closed when verification is unavailable.
5. Apply output encoding at the final rendering boundary.
6. Evaluate findings based on proven impact rather than dangerous-looking code alone.

These principles provide the conceptual basis for reviewing authentication, authorization, trust boundaries, and data flows in real applications.
