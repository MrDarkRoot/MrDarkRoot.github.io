---
title: "Write-up:Hacking with powershell (TryHackMe) — biusa_mrdarkroot"
date: 2025-10-17 20:00:00 +0700
categories: [CTF, Writeup, Windows, PowerShell]
tags: [powershell, windows, enumeration, scripting, tryhackme]
---

# Hello Jekyll 👋

This write-up summarizes the PowerShell room exercises and solutions.  
Author: **biusa_mrdarkroot**

We explore PowerShell basics, Windows enumeration using PowerShell, and scripting challenges that help automate enumeration tasks.

---

## 🪶 Objectives

In this room we'll cover:

- What PowerShell is and how it works  
- Basic PowerShell cmdlets and patterns  
- Windows enumeration using PowerShell  
- Writing and running PowerShell scripts for practical tasks

---

## ✨ What is PowerShell?

PowerShell is the Windows shell and scripting language built on the .NET framework. Cmdlets (PowerShell commands) are typically written in .NET and return **objects** rather than plain text — which lets you manipulate results more easily by piping objects between cmdlets. Cmdlets follow a `Verb-Noun` naming convention (for example `Get-Command`).

Common verbs include:

- `Get`
- `Start`
- `Stop`
- `Read`
- `Write`
- `New`
- `Out`

To get help for a cmdlet (without parameters), use:

```powershell
Get-Help <Cmdlet-Name>
```

---

## 🔎 Basic PowerShell commands & object manipulation

<p align="center">
  <img src="https://github.com/user-attachments/assets/160b5012-949f-40be-9657-bd4b2cc52d62" alt="Screenshot-thumnail" width="80%">
</p>
- `Get-Help <Cmdlet>`: shows help and usage. Add `-Examples` to view examples.
- `Get-Command`: lists installed cmdlets. Use pattern matching like `Get-Command New-*` or `Get-Command *-Service`.
- Pipeline: use `|` to pass objects from one cmdlet to another (not plain text).
- `Get-Member`: inspect object properties and methods:

```powershell
Get-Command | Get-Member -MemberType Method
```
<p align="center">
  <img src="https://github.com/user-attachments/assets/6e19dee6-ffc6-4879-9ac0-74fa51978ef3" alt="Screenshot-thumnail" width="80%">
</p>
- `Select-Object`: pick properties or create new objects from output. Flags: `-First`, `-Last`, `-Unique`, `-Skip`.
- `Where-Object`: filter objects. Two common forms:

```powershell
Verb-Noun | Where-Object -Property PropertyName -EQ -Value
# or
Verb-Noun | Where-Object { $_.PropertyName -eq 'Value' }
```

Remember PowerShell comparison operators: `-Contains`, `-EQ`, `-GT`, etc.

- `Sort-Object`: sort output objects:

```powershell
Verb-Noun | Sort-Object -Property Name
```

---

## 🧪 Quick practice & answers

**Q:** What is the location of the file `interesting-file.txt`?  
**A:** `C:\Program Files`  
**Command:**
```powershell
Get-ChildItem -Path C:\ -Filter interesting-file.* -Recurse
```

**Q:** What are the contents of this file?  
**A:** `notsointerestingcontent`  
**Command:**
```powershell
Get-Content "C:\Program Files\interesting-file.txt"
```

**Q:** How many cmdlets are installed on the system (only cmdlets)?  
**A:** `6638`  
**Command:**
```powershell
Get-Command * | Where-Object CommandType -eq Cmdlet | Measure
```

**Q:** MD5 hash of `interesting-file.txt`?  
**A:** `49A586A2A9456226F8A1B4CEC6FAB329`  
**Command:**
```powershell
Get-FileHash "C:\Program Files\interesting-file.txt" -Algorithm MD5
```

**Q:** Command to get current working directory?  
**A:** `Get-Location`

**Q:** Does the path `C:\Users\Administrator\Documents\Passwords` exist?  
**Command:**
```powershell
Test-Path "C:\Users\Administrator\Documents\Passwords"
```

**Q:** Command to make a web request?  
**A:** `Invoke-WebRequest`

**Q:** Base64-decode `b64.txt` on Windows (example):
```powershell
$file = "C:\Users\Administrator\Desktop\b64.txt"
$data = Get-Content $file
[System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String($data)) | Out-File -Encoding "ASCII" out.html
```

---

## 🧭 Enumeration with PowerShell

Common enumeration targets:

- Local users and groups
- Networking info
- File and registry permissions
- Scheduled and running tasks
- Insecure files (backups, creds)

**Q:** How many users are there on the machine?  
**A:** `5`  
**Command:**
```powershell
Get-LocalUser | Select * | Measure
```

**Q:** Which local user has SID `S-1-5-21-1394777289-3961777894-1791813945-501`?  
**A:** `Guest`

**Q:** How many users have `PasswordRequired` set to False?  
**A:** `4`

**Q:** How many local groups exist?  
**Command:**
```powershell
Get-LocalGroup | Select * | Measure
```

**Q:** Command used to get IP address info?  
**A:** `Get-NetIPAddress`

**Q:** How many ports are listed as listening?  
**A:** `20`  
**Command:**
```powershell
Get-NetTCPConnection -State Listen | Measure
```

**Q:** Remote address of local port listening on port 445?  
**A:** `::`  
**Command:**
```powershell
Get-NetTCPConnection -LocalPort 445
```

**Q:** How many patches (hotfixes) have been applied?  
**Command:**
```powershell
Get-HotFix | Measure
```

**Q:** When was patch `KB4023834` installed?**  
**A:** `6/15/2017 12:00:00 AM`

**Q:** Find contents of a backup file (example):**  
**Command:**
```powershell
Get-ChildItem -Path C:\ -Filter *.bak* -Recurse
Get-Content "C:\Program Files (x86)\Internet Explorer\password.bak.txt"
# Found flag: backpassflag
```

**Q:** Search for all files containing `API_KEY fakekey123`:**  
**Command:**
```powershell
Get-ChildItem -Path C:\ | Select-String "API_KEY"
```

**Q:** List all running processes?**  
**A:** `Get-Process`

**Q:** Path of scheduled task `new-sched-task`?**  
**Command:**
```powershell
Get-ScheduledTask -TaskName new-sched-task
```
**A:** `/` (root)

**Q:** Who is the owner of `C:\`?**  
**A:** `NT SERVICE\TrustedInstaller`  
**Command:**
```powershell
Get-Acl C:\
```

---

## 🛠 Basic scripting challenge

Example script `listening-ports.ps1` (checks ports from a ports.txt file against listening ports):

```powershell
$system_ports = Get-NetTCPConnection -State Listen
$text_port = Get-Content -Path C:\Users\Administrator\Desktop\ports.txt

foreach($port in $text_port){
    if($port -in $system_ports.LocalPort){
        echo $port
    }
}
```

---

## ✉ Email scripting task (answers)

- **Which file contains the password?** `Doc3M`  
- **What is the password?** `johnisalegend99`  
- **Which files contain an HTTPS link?** `Doc2Mary`

(Hint: use `Get-ChildItem` + `Select-String` to scan email files programmatically.)

---

## ⚙ Intermediate scripting — simple port scanner

Example simple TCP connect scan:

```powershell
for($i=130; $i -le 140; $i++){
    Test-NetConnection localhost -Port $i
}
```

**Q:** How many open ports did you find between 130 and 140 (inclusive)?  
**A:** `11`

---

## ✅ Final notes & lessons

- PowerShell's object-based pipeline is extremely useful for enumeration and automation.  
- Learn to read object properties with `Get-Member` and chain cmdlets using the pipeline.  

---
