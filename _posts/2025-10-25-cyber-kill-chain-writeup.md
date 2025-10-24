---
title: "Write-up: Cyber Kill Chain (TryHackMe) — biusa_mrdarkroot"
date: 2025-10-25 00:00:00 +0700
categories: [CTF, Writeup, Cyber Kill Chain]
tags: [tryhackme, cyber-kill-chain, security, thm]
---

# Xin chào Jekyll 👋

Bài viết này tổng hợp toàn bộ nội dung từ phòng **TryHackMe: Cyber Kill Chain**, bao gồm giải thích chi tiết **7 giai đoạn** của mô hình **Lockheed Martin Cyber Kill Chain**, cùng các ví dụ và biện pháp phòng chống tương ứng.  
Tác giả: **biusa_mrdarkroot**

---

## 🪶 Room Summary

Phòng **Cyber Kill Chain** trên TryHackMe giúp người học hiểu rõ cách thức một cuộc tấn công mạng diễn ra theo từng giai đoạn — từ khâu trinh sát cho đến khi đạt được mục tiêu.  
Phòng học tại: 👉 `https://tryhackme.com/room/cyberkillchain`

---

## 🧩 Tổng quan về Cyber Kill Chain

Cyber Kill Chain gồm **7 giai đoạn** chính:

1. **Reconnaissance (Trinh sát)**  
2. **Weaponisation (Vũ khí hóa)**  
3. **Delivery (Phân phối)**  
4. **Exploitation (Khai thác)**  
5. **Installation (Cài đặt)**  
6. **Command & Control (C2 - Điều khiển & Kiểm soát)**  
7. **Actions on Objectives (Thực hiện mục tiêu)**  

Mỗi giai đoạn phản ánh một bước cụ thể trong chuỗi hoạt động của kẻ tấn công, từ việc thu thập thông tin cho tới khi đạt được quyền kiểm soát hệ thống hoặc đánh cắp dữ liệu.

---

## 🕵️‍♂️ 1 — Reconnaissance (Trinh sát)

Giai đoạn đầu tiên của Cyber Kill Chain, nơi kẻ tấn công thu thập thông tin về mục tiêu để chuẩn bị cho các bước tiếp theo.  
Thông tin có thể gồm: địa chỉ email, tên miền, hạ tầng mạng, dịch vụ đang chạy, và cả thông tin cá nhân nhân viên.

**Các kỹ thuật phổ biến:**
- **Google Dorking:** Tìm dữ liệu nhạy cảm thông qua truy vấn tìm kiếm nâng cao.  
- **Passive Reconnaissance:** Thu thập thông tin công khai từ mạng xã hội, website, diễn đàn…  
- **Active Reconnaissance:** Quét cổng, gửi gói tin để xác định dịch vụ và hệ điều hành.

**Biện pháp phòng chống:**
- Hạn chế thông tin công khai trên mạng.  
- Giám sát lưu lượng truy cập bất thường.  
- Cập nhật chính sách bảo mật truyền thông nội bộ.

---

## 💣 2 — Weaponisation (Vũ khí hóa)

Sau khi có thông tin cần thiết, kẻ tấn công **tạo ra vũ khí tấn công** – thường là **payload** độc hại được nhúng trong file hoặc phần mềm hợp pháp.

**Ví dụ kỹ thuật:**
- **Obfuscation:** Làm rối mã độc để tránh bị phát hiện.  
- **Macros độc hại:** Tận dụng tính năng macro trong tài liệu MS Office để thực thi mã khi mở file.

**Biện pháp phòng chống:**
- Sử dụng sandbox hoặc hệ thống phân tích mã độc.  
- Vô hiệu hóa macro mặc định.  
- Dò quét tập tin đính kèm trước khi mở.

---

## 📦 3 — Delivery (Phân phối)

Đây là giai đoạn **phát tán payload** đến nạn nhân.  
Các kênh phổ biến gồm email, website, quảng cáo độc hại, USB hoặc ứng dụng tải về.

**Ví dụ:**
- **Malvertising:** Quảng cáo độc hại trên website hợp pháp dẫn người dùng đến trang chứa mã độc.  
- **Smishing:** Gửi tin nhắn SMS có đường dẫn tải mã độc hoặc yêu cầu thực hiện hành động.

**Biện pháp phòng chống:**
- Bộ lọc email, anti-spam, và bảo mật endpoint.  
- Cảnh báo người dùng về phishing / smishing.  
- Hạn chế cài đặt phần mềm không rõ nguồn gốc.

---

## 🧠 4 — Exploitation (Khai thác)

Khi payload được phát tán thành công, kẻ tấn công sẽ **khai thác lỗ hổng** trong hệ thống hoặc ứng dụng để thực thi mã độc.

**Ví dụ kỹ thuật:**
- **Zero-day exploit:** Tấn công lỗ hổng chưa được nhà sản xuất vá.  
- **Privilege Escalation:** Leo thang đặc quyền để chiếm quyền quản trị.  

**Biện pháp phòng chống:**
- Cập nhật bản vá bảo mật thường xuyên.  
- Kích hoạt **MFA (Multi-Factor Authentication)** để giảm nguy cơ truy cập trái phép.  
- Giám sát hành vi người dùng để phát hiện xâm nhập.

---

## ⚙️ 5 — Installation (Cài đặt)

Kẻ tấn công **cài đặt phần mềm độc hại** nhằm duy trì quyền truy cập bền vững trong hệ thống bị xâm nhập.

**Ví dụ:**
- **Web Shell:** Tệp độc hại cho phép điều khiển hệ thống qua trình duyệt.  
- **Backdoor:** Cửa hậu được cài để kẻ tấn công có thể quay lại sau này.  

**Biện pháp phòng chống:**
- Dò quét file bất thường trong thư mục web.  
- Sử dụng **Application Allowlisting** chỉ cho phép ứng dụng được phê duyệt chạy.  
- Theo dõi hành vi ghi/đọc tệp hệ thống quan trọng.

---

## 🛰️ 6 — Command and Control (C2 - Điều khiển & Kiểm soát)

Sau khi cài đặt thành công, kẻ tấn công thiết lập **kênh liên lạc bí mật** giữa máy nạn nhân và hạ tầng của mình để điều khiển hệ thống hoặc đánh cắp dữ liệu.

**Ví dụ kỹ thuật:**
- Sử dụng **HTTP/HTTPS, DNS, SMTP** để ngụy trang lưu lượng như hợp pháp.  
- **DNS tunnelling:** Ẩn dữ liệu bên trong các truy vấn DNS.  
- **Fast Flux / DGA:** Liên tục thay đổi IP hoặc domain để tránh bị chặn.  
- **Sử dụng dịch vụ hợp pháp:** Dropbox, Google Docs, mạng xã hội…

**Biện pháp phòng chống:**
- Giám sát lưu lượng bất thường qua IDS/IPS.  
- Phân tích truy vấn DNS dài bất thường hoặc lưu lượng HTTPS lạ.  
- Dùng **honeypot** để phát hiện hành vi C2.  
- Thực hiện giải mã SSL (TLS inspection) để phát hiện lưu lượng mã hóa bất thường.

---

## 🎯 7 — Actions on Objectives (Thực hiện mục tiêu)

Đây là **mục tiêu cuối cùng** của cuộc tấn công — khi kẻ tấn công bắt đầu thực hiện hành động đã định sẵn, như **đánh cắp dữ liệu**, **phá hoại hệ thống**, hoặc **kiếm lợi tài chính**.

**Ví dụ hành động:**
- **Data Exfiltration:** Đánh cắp dữ liệu nhạy cảm.  
- **Ransomware:** Mã hóa dữ liệu và đòi tiền chuộc.  
- **Lateral Movement:** Mở rộng xâm nhập sang các hệ thống khác.  
- **ICS Manipulation:** Kiểm soát hệ thống công nghiệp.  

**Biện pháp phòng chống:**
- Sử dụng **DLP (Data Loss Prevention)** ngăn rò rỉ dữ liệu.  
- Có kế hoạch **sao lưu & khôi phục** hiệu quả.  
- **Network Segmentation** tách biệt vùng mạng quan trọng.  
- Áp dụng **Nguyên tắc tối thiểu quyền hạn (Least Privilege)**.  
- Sử dụng **EDR** để phát hiện hành vi bất thường như mã hóa tệp hàng loạt hoặc kết nối trái phép.

---

## ✅ Notes & Takeaways

- Cyber Kill Chain giúp **xác định vị trí tấn công trong chuỗi** để phản ứng nhanh chóng và chính xác.  
- Nắm vững từng giai đoạn giúp **xây dựng chiến lược phòng thủ nhiều lớp (defence-in-depth)**.  
- Các kỹ thuật như **MFA**, **Allowlisting**, **DLP**, và **EDR** là các biện pháp cốt lõi giúp giảm thiểu thiệt hại.

---

## 🔎 Questions & Answers

### 1 — How many phases comprise the Cyber Kill Chain?  
**Answer:** 7

### 2.1 — What is the term for using search engines to reveal sensitive information and confidential files?  
**Answer:** Google Dorking

### 2.2 — What type of reconnaissance is it where the attacker checks the social media pages?  
**Answer:** Passive Reconnaissance

### 3.1 — What technique is mentioned to evade detection by making it challenging to analyse the malicious code?  
**Answer:** Obfuscation

### 3.2 — What built-in feature makes creating a malicious MS Office document possible?  
**Answer:** Macro

### 4.1 — What method involves showing advertisements on legitimate websites to redirect users to malicious pages?  
**Answer:** Malvertising

### 4.2 — What phishing attack sends text messages with malicious links or instructions to download malware?  
**Answer:** Smishing

### 5.1 — What type of exploit is used before the vendor becomes aware of a vulnerability?  
**Answer:** Zero-day exploit

### 5.2 — What technology is mentioned to prevent an attacker from gaining access even with valid login credentials?  
**Answer:** MFA

### 6.1 — What tactic allows attackers to execute operating system commands on a target via a web browser interface?  
**Answer:** Web shell

### 6.2 — What technique is mentioned to prevent the execution of unauthorised or malicious software by only allowing approved applications to run?  
**Answer:** Allowlisting

### 7.1 — What is the name of the tactic where data is hidden within DNS queries?  
**Answer:** DNS tunnelling

### 7.2 — What protocol would the attacker use to smuggle his data as encrypted web traffic?  
**Answer:** HTTPS

### 8.1 — What is the term for stealing sensitive files from a target network?  
**Answer:** Data Exfiltration

### 8.2 — What principle limits who can access sensitive systems and data to minimise damage caused by an attacker?  
**Answer:** Principle of least privilege

### 8.3 — What type of attack involves encrypting files and demanding payment in exchange for the decryption key?  
**Answer:** Ransomware

### 9 — What is the flag after you complete the static site?  
**Answer:** `THM{CKC_NJHERDX327}`

---

