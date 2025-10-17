---
title: "Write-up: Net Sec Challenge — Network Security (TryHackMe) — biusa_mrdarkroot"
date: 2025-07-29 12:00:00 +0700
categories: [CTF, Writeup, Network Security]
tags: [tryhackme, networkscan, nmap, hydra, telnet,curl]
---

# Hello Jekyll 👋

This write-up documents my solution for the **Net Sec Challenge — Network Security** room on TryHackMe.  
Author: **biusa_mrdarkroot**

The goal of this challenge is to practice skills from the Network Security module using tools such as `nmap`, `telnet`, and `hydra`.

---

## 🪶 Objectives

- Scan ports across a broad range (1–9999) to find services not in top-1000
- Perform banner grabbing using `curl` / `telnet`
- Use brute-force against FTP with `hydra` when valid usernames are known

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/cdb3c028-387e-454f-9f3b-8433a731bc43" alt="Screenshot-thumnail" width="80%">
</p>

---

## ✨ Environment & Tools

- Platform: TryHackMe — *Net Sec Challenge*  
- Tools used: `nmap`, `telnet`, `curl`, `hydra`

---

## 🔎 Questions & Answers

**Q1 — What is the highest open port under 10,000?**  
**Goal:** Scan ports 1–9999 to identify the highest open port.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/a98ed1a7-17c4-487e-808a-e6bfaf5cb141" alt="Screenshot-nmap" width="80%">
</p>

**Answer:** `8080`

**Q2 — What is the highest open port (under 10,000)?**  
**Answer:** `10021`

**Q3 — How many TCP ports are open?**  
**Answer:** `6`

---

## 🔍 Hidden flags in service headers

**Q4 — Hidden flag in the HTTP Server header?**  
**Goal:** Inspect HTTP response headers using `curl`, `telnet`, or Burp Suite.  

<p align="center">
  <img src="https://github.com/user-attachments/assets/59cea5f7-c303-4421-a0d8-eda685bd1370" alt="Screenshot-header-respone-fromServer" width="80%">
</p>
**Answer:** `THM{web_server_25352}`

**Q5 — Hidden flag in the SSH server banner?**  
**Goal:** Since direct SSH might be blocked, use `telnet` to check the SSH banner.  

<p align="center">
  <img src="https://github.com/user-attachments/assets/4cc73c2d-0f0f-4ae1-9072-53c052fbc8d8" alt="Screenshot-nmap" width="80%">
</p>

**Answer:** `THM{946219583339}`

---

## 🧾 FTP & credentials

**Q6 — An FTP server is listening on a non-standard port. What is the FTP server version?**  
**Goal:** Scan port `10021` (found earlier) to identify the service on that port.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/f1ab6097-c680-483a-b1cb-fde7a92e4996" alt="Screenshot-nmap" width="80%">
</p>
**Answer:** `vsftpd 3.0.5`

**Q7 — We discovered two usernames via social engineering: Eddie and Quinn. Which flag is hidden in one of those account files accessible via FTP?**  
**Goal:** Find passwords and use brute-force or valid credentials to retrieve files via FTP.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/8e480bd2-b2b5-4888-9568-c3e874494ef2" alt="Hydra-bruteforce" width="80%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/555a1de8-d472-4a7b-888b-c180911ddae7" alt="Get-flag" width="80%">
</p>
**Answer:** `THM{321452667098}`

---

## 🧩 Web challenge on port 8080

**Q8 — Visiting http://<TARGET_IP>:8080 reveals a small challenge. After solving it you receive a flag. What is that flag?**  
**Goal:** Scan the server in a way that avoids simple IDS detection (hint: use a NULL scan when appropriate), then solve the web challenge.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/1f4d7403-e557-497b-8157-4f68114931ff" alt="Get-flag" width="80%">
</p>
**Answer:** `THM{f7443f99}`

---

## ✅ Results

- Obtained the **Moderator flag** via stored XSS + session hijacking.  
- Enumerated hidden files to find admin credentials → logged in as admin → obtained the **Admin flag**.

---
## 🧠 Quick commands reference

- Full port scan (example):  
  ```bash
  nmap -p1-9999 -sV <TARGET_IP>
  ```
- Banner grab via telnet (example):  
  ```bash
  telnet <TARGET_IP> <PORT>
  ```
- Simple HTTP header check:  
  ```bash
  curl -I http://<TARGET_IP>:8080
  ```
- FTP brute-force with hydra (example):  
  ```bash
  hydra -l Eddie -P /path/to/wordlist ftp://<TARGET_IP> -s 10021
  ```

---
