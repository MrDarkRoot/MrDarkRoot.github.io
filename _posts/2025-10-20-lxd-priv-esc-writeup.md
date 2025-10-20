---
title: "Write-up: LXD Privilege Escalation — Theory, Risks & Defenses (Safe)"
date: 2025-10-20 14:00:00 +0700
categories: [Security, Writeup]
tags: [lxd, privilege-escalation, hardening, linux, defense]
---

# Hello Jekyll 👋

**Author:** biusa_mrdarkroot

**Short summary:**
This write-up explains the theory behind a known LXD-based privilege escalation class, describes risks and indicators of abuse, and — most importantly — provides practical defensive controls and detection methods. It is intentionally **non-actionable** for offensive use. The content is suitable for system owners, defenders, and authorized testers who need to understand, detect, and mitigate this threat.

---

## 🪶 Theory (High-Level)

- **Attack Surface:** LXD exposes container management capabilities. Users in the **`lxd` group** (or with access to the LXD socket) can create and configure containers and attach host resources (devices, mounts).
- **Precondition:** The attacker must be a member of the **`lxd`** group (or otherwise able to control the LXD daemon).
- **Core Idea:** If a container is configured to **mount host paths** (e.g., the host root `/`) into the container, a privileged shell inside the container can modify files on the mounted host filesystem. This can be used to add backdoor accounts, change binaries, or set SUID bits to achieve **host root** access.
- **Why this is Dangerous:** LXD membership effectively grants near-root control over the host if host paths or devices are exposed to containers. This makes **`lxd` group membership** equivalent to an administrative role for the host.

> **Important:** This document does **not** provide step-by-step exploit commands. It focuses on theory, detection, mitigation, and safe testing practices.

---

## ⚠️ Real-World Impact

- Full host compromise (arbitrary code execution as root).
- Persistent backdoors and credential theft.
- Lateral movement and data exfiltration in multi-tenant or developer hosts.
- Cloud or CI/CD runners exposing LXD may allow tenants to escalate to host-level compromise.

---

## ✅ Detection & Indicators of Abuse

Monitor for suspicious LXD and filesystem activity:

### LXD Activity
- Unexpected container creation by non-admin users.
- Containers configured with **`disk`** devices that reference host paths such as `/` or `/etc`.
- New containers that run shells or privileged services.

### Filesystem and Permission Changes
- Unexpected modifications to `/etc/passwd`, `/etc/shadow`, systemd unit files, or binaries under `/bin` and `/usr/bin`.
- New **SUID/SGID** binaries added to the host.
- Unusual **`chmod`** or **`chown`** operations on system files.

### Process and Audit Signals
- Containers spawning processes that access host-mounted paths.
- **Auditd** logs showing mount operations, file modifications on sensitive paths, or permission changes.

### Suggested Alerts
- Alert when a container is created with a `disk` device whose **`source`** is a host path outside expected directories.
- Alert on creation of **SUID** files or modification of `/etc/shadow`.
- Alert if users are added to the `lxd` group.

---

## 🛡️ Mitigations & Hardening (Practical, Defensive)

Treat `lxd` membership as sensitive — apply defense-in-depth:

1.  **Restrict Who Can Manage LXD**
    - Limit **`lxd`** group membership; use centralized processes for granting access.
    - Avoid adding service accounts or developers directly to `lxd`.
2.  **Harden LXD Socket and API**
    - Restrict filesystem permissions on the LXD unix socket.
    - When exposing LXD remotely, require **TLS client certificates** and strong **ACLs**.
3.  **Use Strict LXD Profiles**
    - Create restricted profiles that **do not** allow arbitrary **`disk`** devices or **`raw.lxc`** overrides.
    - Only permit the minimal capabilities required by workloads.
4.  **Deny Host Path Mounts by Default**
    - Do not permit **`disk`** devices that mount arbitrary host paths such as `/`, `/etc`, or `/var`.
    - Use **readonly** mounts where a host path is necessary and audit approvals.
5.  **Capability and Seccomp Restrictions**
    - Restrict powerful capabilities like **`CAP_SYS_ADMIN`**.
    - Apply **seccomp** filters and **AppArmor/SELinux** confinement where possible.
6.  **Patch and Update**
    - Keep LXD and host kernels patched to reduce known escape vectors.
7.  **Operational Controls**
    - Use IaC / automation for container creation in production (prevent ad-hoc local container creation).
    - Enforce change control, logging, and approvals for adding new `disk` devices.
8.  **Monitoring & Response**
    - Use **auditd** rules and **File Integrity Monitoring (FIM)** to detect mounts and binary changes.
    - Maintain and monitor logs for LXD operations; centralize container event logging.
9.  **Isolation for Multi-Tenant Use**
    - Avoid running user-controlled containers on shared hosts. Prefer **per-tenant VMs** or strict isolation.
10. **Recovery & Cleanup**
    - Have rollback procedures: snapshots, automated rebuilds, and incident playbooks for suspected compromise.

---

## 🔧 Defensive Commands & Checks (Safe Examples)

Use these as defensive checks — **not** exploit steps:

### 1. Check Current `lxd` Group Membership
```bash
getent group lxd
