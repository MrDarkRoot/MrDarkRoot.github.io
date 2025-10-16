ChatGPT said:
title: "Write-up: Whats Your Name? (TryHackMe) — biusa_mrdarkroot"
date: 2025-10-16 20:00:00 +0700
categories: [CTF, Writeup]
tags: [tryhackme, ctf, xss, session-hijack, websec]
Write-up: Whats Your Name? — (tác giả: biusa_mrdarkroot)

Đây là write-up mình (biusa_mrdarkroot) thực hiện cho thử thách “Whats Your Name?” trên TryHackMe. Mục tiêu: thực hành khai thác client-side (XSS), chiếm đoạt session và thu thập dữ liệu nhạy cảm. Bài viết trình bày từng bước, lệnh dùng và lưu ý để bạn có thể lặp lại trên lab có phép.

🪶 Mục tiêu bài viết

Thử nghiệm XSS (stored) trên trường Name

Lấy cookie của nạn nhân bằng payload

Thực hiện session hijacking để trở thành Moderator

Dò thư mục & lấy credential admin → truy cập dashboard lấy admin flag

<p align="center"> <img src="https://github.com/user-attachments/assets/93ecc503-8257-4d5a-9c9c-49da50170fb4" alt="Screenshot-demo" width="80%"> </p>
✨ Môi trường & chuẩn bị

TryHackMe room: Whats Your Name? (subscription required)

Máy tấn công: Kali Linux

Công cụ: nmap, gobuster, trình duyệt (DevTools), python3 (http server)

🔍 Bước 1 — Quét port (recon)

Khởi động máy mục tiêu trong TryHackMe → nhận IP → quét nhanh:
