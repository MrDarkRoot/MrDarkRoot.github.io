---
title: "Cloud, Virtualization, and Cloud Security Fundamentals"
date: 2026-07-09 09:20:00 +0700
categories: [Academy, Cloud Security]
tags: [cloud, virtualization, hypervisor, vm, docker, containers, iaas, paas, saas, cloud-security, appsec]
description: "Beginner-friendly notes on virtualization, hypervisors, VMs, containers, cloud computing models, shared responsibility, cloud monitoring, and common cloud security mistakes."
permalink: /academy/cloud-virtualization-security-fundamentals/
---

# Cloud, Virtualization, and Cloud Security Fundamentals

These are my beginner-friendly notes while learning the basics of **virtualization**, **cloud computing**, and **cloud security**.

The goal is not to memorize every cloud service name. The goal is to understand the mental model:

```text
Cloud = someone else's computers + virtualization + containers + automation + internet access.
```

If you understand where you are in the stack, cloud security becomes much less confusing.

---

## 1. Why Virtualization Exists

Before virtualization, companies often followed this pattern:

```text
One physical server = one application
```

For example:

```text
Website      -> Server 1
Database     -> Server 2
Email Server -> Server 3
Internal App -> Server 4
```

This caused several problems:

- Hardware was expensive.
- Electricity, cooling, and maintenance were expensive.
- Servers were often underused.
- Deploying a new server could take days or weeks.
- Scaling required buying more physical machines.

Many applications might use only 5-20% of a server's CPU or memory, while the rest stayed wasted.

Virtualization solved this by allowing one powerful physical server to behave like many smaller independent computers.

```text
Physical Server
      |
      v
Virtual Machine 1
Virtual Machine 2
Virtual Machine 3
```

The simple definition:

```text
Virtualization = turning one physical computer into many isolated virtual computers.
```

---

## 2. Hypervisor: The Building Manager

A **hypervisor** is the software that creates and manages virtual machines.

It is not the virtual machine itself. It is the manager that creates virtual machines.

```text
Physical Hardware
      |
      v
Hypervisor
      |
      v
VM 1   VM 2   VM 3
```

The hypervisor:

- Divides CPU, RAM, disk, and network resources.
- Creates virtual machines.
- Starts, stops, pauses, clones, and deletes VMs.
- Keeps VMs isolated from one another.

A simple analogy:

```text
Physical server = apartment building
Hypervisor      = building manager
VMs             = apartments
Applications    = tenants
```

The manager makes sure one apartment cannot freely break into another apartment.

---

## 3. Type 1 vs Type 2 Hypervisors

There are two common hypervisor types.

### Type 1 Hypervisor

A Type 1 hypervisor runs directly on physical hardware.

```text
Hardware
  |
  v
Type 1 Hypervisor
  |
  v
VMs
```

This is common in:

- Data centers
- Production servers
- Cloud platforms
- Enterprise virtualization

Examples include:

- VMware ESXi
- Microsoft Hyper-V in server deployments
- KVM-based virtualization

Type 1 is used heavily in enterprises because it is faster, more efficient, and more suitable for production workloads.

### Type 2 Hypervisor

A Type 2 hypervisor runs inside an existing operating system.

```text
Hardware
  |
  v
Windows / Linux / macOS
  |
  v
VirtualBox / VMware Workstation
  |
  v
VMs
```

This is common for:

- Students
- Pentest labs
- Kali Linux labs
- Malware analysis labs
- Software testing

Examples include:

- Oracle VirtualBox
- VMware Workstation
- Parallels Desktop

The easiest rule:

```text
Type 1 = production, cloud, data center
Type 2 = laptop, learning, labs, testing
```

A normal user usually does not interact with the hypervisor directly. They use a tool like VirtualBox or VMware Workstation. That tool is the Type 2 hypervisor.

---

## 4. What Is a VM?

A **VM**, or virtual machine, is a full virtual computer created by a hypervisor.

A VM has its own:

- Virtual CPU
- Virtual RAM
- Virtual disk
- Virtual network card
- Operating system
- Applications

Example:

```text
Laptop running Pop!_OS
      |
      v
VirtualBox
      |
      v
Windows VM / Ubuntu VM / Kali VM
```

From inside the VM, it feels like a real computer.

A VM is useful when you need strong isolation or a complete operating system.

Examples:

- Running Kali Linux on a Windows or Linux laptop.
- Testing suspicious files in an isolated environment.
- Running different operating systems for development.
- Simulating servers in a lab.

---

## 5. Containers and Docker

A container is not a full virtual machine.

A container is a lightweight isolated environment for running an application and its dependencies.

```text
Host OS Kernel
      |
      v
Docker
      |
      v
Container 1: Nginx
Container 2: Redis
Container 3: Backend App
```

A VM brings a full operating system.

A container shares the host operating system kernel.

That is why containers are lighter and faster.

```text
VM        = full apartment
Container = one isolated room inside the apartment
```

### VM vs Container

| Concept | VM | Container |
|---|---|---|
| Isolation | Stronger | Lighter |
| Operating system | Full OS | Shares host kernel |
| Startup speed | Slower | Faster |
| Resource usage | Heavier | Lighter |
| Common tool | VirtualBox, VMware, ESXi, KVM | Docker |
| Best for | Full systems, labs, strong separation | App deployment, scaling, development |

The relationship often looks like this:

```text
Physical Server
      |
      v
Hypervisor
      |
      v
Ubuntu VM
      |
      v
Docker
      |
      v
Nginx Container / Redis Container / Backend Container
```

The key distinction:

```text
Hypervisor creates VMs.
Docker creates containers.
```

---

## 6. What Is Cloud Computing?

Cloud computing means renting computing resources over the internet.

Instead of running an app on your own laptop:

```text
My laptop
  |
  v
My application
```

You run it on infrastructure provided by a cloud vendor:

```text
Cloud provider
  |
  v
Virtual machines, storage, databases, containers
  |
  v
My application
```

Cloud is built on technologies such as:

- Physical servers
- Virtualization
- Virtual machines
- Containers
- Networking
- Automation
- Global data centers

A simple definition:

```text
Cloud = computing resources delivered over the internet on demand.
```

---

## 7. Why Companies Use Cloud

Cloud helps solve problems that happen when an app runs on one machine or in one location.

Common benefits:

- **Scalability:** increase or decrease resources when demand changes.
- **On-demand self-service:** create servers or storage quickly.
- **Pay as you go:** pay for what you use instead of buying hardware upfront.
- **High availability:** keep services online even when some parts fail.
- **Global access:** serve users from different regions.
- **Faster deployment:** launch environments quickly.
- **Centralized management:** manage resources from one platform.

Cloud does not automatically make an application secure. It makes infrastructure easier to create, scale, and manage.

---

## 8. Public, Private, and Hybrid Cloud

### Public Cloud

Public cloud means using a provider's shared cloud infrastructure.

Examples:

- AWS
- Microsoft Azure
- Google Cloud Platform
- Alibaba Cloud
- Oracle Cloud

This is common for startups, websites, SaaS companies, and global applications.

### Private Cloud

Private cloud is cloud infrastructure used by one organization only.

It is common in:

- Banking
- Healthcare
- Government
- Highly regulated environments

It gives more control but is more expensive and harder to operate.

### Hybrid Cloud

Hybrid cloud combines public and private cloud.

Example:

```text
Sensitive data -> Private cloud
Public web app -> Public cloud
```

This is useful when a company wants both control and scalability.

---

## 9. IaaS, PaaS, and SaaS

These are cloud service models. They describe how much responsibility the customer keeps and how much the provider manages.

### IaaS: Infrastructure as a Service

IaaS means renting basic infrastructure such as virtual machines, storage, and networking.

Example:

```text
AWS EC2 = rented virtual machine
```

The provider manages:

- Physical server
- Data center
- Hardware
- Virtualization layer

The customer manages:

- Operating system
- Patches
- Web server
- Application
- Database configuration
- Firewall/security groups
- Credentials

IaaS is flexible but requires more operational knowledge.

### PaaS: Platform as a Service

PaaS means renting a platform to run code.

Example:

```text
git push -> platform builds and deploys the app
```

The provider manages more of the server and operating system layer.

Examples:

- Vercel
- Heroku
- Render
- Google App Engine

PaaS is good for developers who want to focus on code instead of server administration.

### SaaS: Software as a Service

SaaS means using a complete application through a browser or app.

Examples:

- Gmail
- Google Docs
- Slack
- Zoom
- Notion

The provider manages almost everything.

The customer mainly manages:

- Users
- Passwords
- MFA
- Sharing settings
- Data access
- Integrations

Simple analogy:

```text
IaaS = rent a kitchen and cook yourself
PaaS = give your recipe and let someone run the kitchen
SaaS = buy the finished meal
```

---

## 10. Security of the Cloud vs Security in the Cloud

This is one of the most important ideas in cloud security.

### Security of the Cloud

This means the provider protects the cloud infrastructure itself.

The provider is responsible for:

- Data centers
- Physical servers
- Physical disks
- Power
- Cooling
- Physical network
- Hypervisor security

If the provider's hypervisor or internal infrastructure is compromised, that is a **security of the cloud** issue.

### Security in the Cloud

This means the customer protects what they build or store inside the cloud.

The customer is responsible for:

- Cloud accounts
- Passwords
- MFA
- IAM permissions
- Storage permissions
- VM patching
- Application security
- Database access
- Secrets
- Logging configuration

Most real-world cloud incidents happen because of mistakes **in** the cloud, not because the cloud provider itself was fully compromised.

---

## 11. Shared Responsibility Model

The shared responsibility model explains who is responsible for what.

Example for IaaS:

```text
Provider responsibility:
- Data center
- Physical hardware
- Physical network
- Hypervisor

Customer responsibility:
- Operating system
- Applications
- IAM
- S3/storage permissions
- Database configuration
- Secrets
- Logging
- MFA
```

The key lesson:

```text
Moving to cloud does not automatically make old systems secure.
```

If an old unpatched server is moved to a VM in the cloud, it is still an old unpatched server.

---

## 12. What SOC Teams Monitor in the Cloud

In cloud environments, SOC teams usually monitor three areas.

### 1. Workloads

Workloads are the systems running applications.

Examples:

- VMs
- Containers
- Kubernetes pods
- Web servers
- API servers

Monitor for:

- Suspicious logins
- Malware behavior
- Unexpected processes
- Unusual network connections
- Web server errors

### 2. Cloud Services

Cloud services are provider-managed services such as storage, databases, and serverless functions.

Examples:

- S3
- RDS
- Lambda
- DynamoDB
- Secrets Manager

Monitor for:

- Public storage access
- Large downloads
- Unusual database access
- Secret retrieval
- Unexpected deletion

### 3. Control Plane

The control plane is the cloud administration layer.

Examples:

- AWS Console login
- IAM policy changes
- Creating access keys
- Creating or deleting VMs
- Changing security groups
- Disabling logs

Control plane activity is extremely important because an attacker who controls the control plane may control the cloud environment.

Simple model:

```text
Cloud monitoring = workloads + cloud services + control plane
```

---

## 13. Logging Challenges in Cloud

On-premises environments may allow deep visibility into systems:

- Disk artifacts
- Memory artifacts
- Endpoint logs
- Process lists
- Network logs

In cloud, visibility depends on the service model.

```text
On-prem visibility > IaaS visibility > SaaS visibility
```

In SaaS, customers usually cannot access provider internal logs. They only receive the audit logs the provider exposes.

Cloud logs may also have issues:

- Logs may require paid plans.
- Logs may be incomplete.
- Logs may not integrate easily with SIEM.
- Logs may have short retention periods.
- Some SaaS platforms may not provide useful security logs.

This is why logging must be planned before an incident happens.

---

## 14. Important Cloud Security Tools

### CASB

A **Cloud Access Security Broker** helps monitor and enforce security policies between users and cloud/SaaS apps.

Useful for:

- Shadow IT detection
- SaaS access control
- Data loss prevention
- Risky file sharing detection

### CSPM

**Cloud Security Posture Management** checks cloud configuration for risky settings.

It can detect issues such as:

- Public buckets
- Overly permissive IAM
- Exposed databases
- Missing MFA
- Logging disabled

### CWPP

**Cloud Workload Protection Platform** protects cloud workloads such as VMs, containers, and Kubernetes environments.

It is closer to EDR/anti-malware for cloud workloads.

---

## 15. Common Cloud Security Bugs and Mistakes

Most cloud bugs are not caused by breaking the cloud provider. They are caused by customer-side misconfiguration or weak application security.

### 1. Public Storage

Examples:

- Public S3 bucket
- Public Azure Blob container
- Public Google Cloud Storage bucket

Impact:

- Sensitive files exposed
- Backups leaked
- Documents downloaded without authentication

### 2. Overly Permissive IAM

Dangerous pattern:

```json
{
  "Action": "*",
  "Resource": "*"
}
```

This means broad administrative power.

IAM should follow least privilege:

```text
Give only the permissions required for the task.
```

### 3. Leaked Cloud Secrets

Common leak locations:

- GitHub repositories
- `.env` files
- CI/CD logs
- Docker images
- Mobile apps
- Frontend JavaScript
- Backup files

Examples:

```text
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DATABASE_URL
API_TOKEN
```

### 4. Public Databases

Examples:

- MySQL exposed to the internet
- MongoDB exposed without authentication
- Redis exposed publicly
- Elasticsearch exposed publicly

Databases should usually not be directly reachable from the public internet.

### 5. Open Security Groups or Firewall Rules

Risky examples:

```text
SSH 22     -> 0.0.0.0/0
RDP 3389   -> 0.0.0.0/0
MySQL 3306 -> 0.0.0.0/0
```

Public admin ports increase brute-force and exploitation risk.

### 6. SSRF to Cloud Metadata

Server-Side Request Forgery can become more dangerous in cloud environments because cloud VMs often have metadata services.

High-level chain:

```text
SSRF in web app
      |
      v
Cloud metadata service
      |
      v
Temporary credentials
      |
      v
Cloud resource access
```

Modern environments should use hardened metadata configurations and strict egress controls.

### 7. Secrets Inside Docker Images

Bad practice:

```text
Build Docker image with secrets inside configuration files.
```

Anyone who can pull the image may be able to inspect layers and recover secrets.

### 8. Kubernetes Misconfiguration

Common problems:

- Public dashboard
- Weak RBAC
- Overprivileged service accounts
- Secrets exposed to too many pods
- Containers running as root

### 9. Logging Disabled or Not Collected

If logs are disabled or not forwarded to a SIEM, incident response becomes much harder.

Important events to monitor:

- New IAM user
- New access key
- Policy change
- MFA disabled
- Logging disabled
- Bucket policy changed
- Large data download

### 10. Shadow IT

Shadow IT happens when employees use unapproved SaaS tools.

Example:

```text
Employee uploads customer data to an untrusted AI or file-sharing service.
```

The company may not know the data left the controlled environment.

---

## 16. AppSec and Bug Bounty View

For application security and bug bounty, cloud security often connects with web vulnerabilities.

Examples:

```text
LFI -> read config -> cloud secret leak -> cloud access
```

```text
SSRF -> metadata service -> temporary credentials -> cloud access
```

```text
IDOR -> unauthorized file access -> sensitive object in cloud storage
```

```text
Weak upload validation -> object storage abuse -> stored XSS or content spoofing
```

The most practical cloud-related areas for AppSec researchers are:

- Secrets exposure
- Storage access control
- IAM authorization mistakes
- SSRF impact in cloud environments
- CI/CD misconfiguration
- Docker and Kubernetes configuration mistakes

---

## 17. Source Code Review Checklist

When reviewing a repository for cloud risk, check these locations:

```text
.env
config/
settings/
secrets/
Dockerfile
docker-compose.yml
terraform/
cloudformation/
kubernetes/
helm/
.github/workflows/
.gitlab-ci.yml
package scripts
CI/CD deployment scripts
```

Look for:

- Hardcoded secrets
- Overbroad IAM policies
- Public storage configuration
- Public database configuration
- Missing authentication around file access
- Dangerous CI/CD permissions
- Containers running as root
- Credentials printed in logs
- Insecure default configuration

---

## 18. Defensive Cloud Security Checklist

A basic defensive checklist:

1. List all cloud providers and SaaS platforms in use.
2. Enable MFA for cloud administrator accounts.
3. Apply least privilege to IAM users, roles, and service accounts.
4. Remove hardcoded secrets from code and images.
5. Store secrets in a secret manager.
6. Keep storage buckets private by default.
7. Avoid public databases and public admin ports.
8. Enable audit logs such as CloudTrail or equivalent.
9. Forward important logs to a SIEM.
10. Monitor control plane changes.
11. Patch cloud VMs like normal servers.
12. Scan infrastructure-as-code for risky configuration.
13. Review CI/CD permissions and secret exposure.
14. Use network segmentation.
15. Prepare an incident response plan for cloud vendor and SaaS compromise.

---

## 19. Mental Model Cheat Sheet

```text
Virtualization
= one physical machine acts like many computers

Hypervisor
= software that creates and manages VMs

VM
= full virtual computer with its own OS

Docker
= platform that creates containers

Container
= lightweight isolated app environment sharing the host kernel

Cloud
= rented computing resources over the internet

IaaS
= rent virtual servers, storage, and networking

PaaS
= rent a platform to deploy code

SaaS
= use a complete application online

Security of the Cloud
= provider protects cloud infrastructure

Security in the Cloud
= customer protects accounts, data, apps, IAM, VMs, and configuration

Cloud monitoring
= workloads + cloud services + control plane
```

---

## 20. Learning Path

A practical learning path for AppSec and cloud security:

```text
Web/AppSec fundamentals
      |
      v
Cloud basics
      |
      v
Virtualization and containers
      |
      v
Linux basics
      |
      v
Docker basics
      |
      v
AWS EC2, S3, IAM, CloudTrail
      |
      v
Cloud misconfiguration
      |
      v
CI/CD security
      |
      v
Kubernetes basics
      |
      v
Cloud pentesting and cloud bug bounty
```

The important lesson is that cloud security is not a completely separate universe.

It is application security, identity, authorization, storage, networking, logging, and operations applied to cloud environments.

---

## Final Takeaway

If I only remember one idea, it should be this:

```text
Cloud is not automatically secure.
Cloud only changes who manages each layer.
```

The provider manages the lower layers. The customer still has to secure accounts, permissions, applications, data, secrets, logs, and configurations.

For AppSec and bug bounty, most cloud findings come from **security in the cloud**, especially secrets exposure, IAM mistakes, public storage, SSRF impact, CI/CD issues, and misconfigured containers or Kubernetes resources.
