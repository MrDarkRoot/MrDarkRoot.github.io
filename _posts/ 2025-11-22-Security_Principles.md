---
categories:
- CTF
- Writeup
- Security
date: "2025-10-16 20:00:00 +0700"
tags:
- tryhackme
- ctf
- xss
- session-hijack
- websec
- security-principles
title: "Write-up: Whats Your Name? / Security Principles (TryHackMe)"
---

# Hello Jekyll 👋

This is my write-up --- **biusa_mrdarkroot** --- combining the formatting template from the **"Whats Your Name?"** challenge with the content of the **"Security Principles"** room on TryHackMe, as requested.

------------------------------------------------------------------------

## 🪶 Objectives

* **Phần 1: CTF/XSS (Theo mẫu cũ)**
    * Discover and exploit a stored XSS in the **Name** field
    * Capture a victim's cookie via payload → perform session hijacking
    * Enumerate hidden directories to find admin credentials → access dashboard → obtain admin flag
* **Phần 2: Security Principles (Theo nội dung mới)**
    * Hiểu rõ Bộ ba Bảo mật (**CIA**) và Bộ ba Phản bảo mật (**DAD**).
    * Nắm vững các mô hình bảo mật cơ bản (**Bell-LaPadula, Biba, Clark-Wilson**).
    * Áp dụng các nguyên tắc bảo mật hiện đại (**Defence-in-Depth, Zero Trust**).

------------------------------------------------------------------------

## ✨ Environment & Tools

  * Platform: TryHackMe --- room: *Whats Your Name?* (subscription required) / *Security Principles* (Free/Subscription)
  * Attacker machine: Kali Linux (áp dụng cho phần CTF/XSS)
  * Tools: `nmap`, `gobuster`, browser (DevTools), `python3` (simple http server) (áp dụng cho phần CTF/XSS)

-----

# Write-up TryHackMe: Security Principles (Các Nguyên tắc Bảo mật)

Phòng học Security Principles của TryHackMe là nền tảng quan trọng, giới thiệu các khái niệm cốt lõi, mô hình và nguyên tắc phổ biến nhất trong lĩnh vực bảo mật thông tin.

## 💡 Tổng quan về Phòng học

Mục tiêu chính của phòng học là cung cấp kiến thức vững chắc về:

  * Bộ ba Bảo mật (**CIA**) và Bộ ba Phản bảo mật (**DAD**).
  * Các mô hình bảo mật cơ bản (**Bell-LaPadula, Biba, Clark-Wilson**).
  * Các nguyên tắc bảo mật hiện đại (**Defence-in-Depth, Zero Trust**).
  * Sự khác biệt giữa **Lỗ hổng, Mối đe dọa và Rủi ro** (Vulnerability, Threat, Risk).
  * Tiêu chuẩn quốc tế **ISO/IEC 19249**.

-----

## 1\. Bộ ba Bảo mật (CIA Triad)

Bộ ba **CIA** là mô hình ba yếu tố cốt lõi để đánh giá và xây dựng tính bảo mật của bất kỳ hệ thống nào.

| Khái niệm | Giải thích | Ví dụ minh họa |
| :--- | :--- | :--- |
| **Confidentiality** (Bí mật) | Đảm bảo rằng chỉ những người dùng/thực thể được phép mới có quyền truy cập dữ liệu. | Mã hóa dữ liệu, quản lý quyền truy cập. |
| **Integrity** (Toàn vẹn) | Đảm bảo dữ liệu không bị thay đổi trái phép. Mọi thay đổi phải được phát hiện và có thể phục hồi. | Sử dụng hàm băm (Hashing), chữ ký số để xác minh. |
| **Availability** (Sẵn có) | Đảm bảo hệ thống, dịch vụ và dữ liệu luôn có thể truy cập được khi cần. | Hệ thống dự phòng (Redundancy), cân bằng tải (Load balancing), bảo vệ DDoS. |

### Các Yếu tố Bảo mật Mở rộng

Ngoài CIA, còn có các khái niệm quan trọng khác:

  * **Authenticity** (Tính xác thực): Đảm bảo rằng dữ liệu hoặc thông tin đến từ **nguồn đã được tuyên bố** (không giả mạo).
  * **Nonrepudiation** (Tính không thể chối bỏ): Đảm bảo nguồn gốc ban đầu **không thể phủ nhận** hành động hoặc giao dịch của họ.

### Parkerian Hexad

Bộ sáu của Donn Parker, mở rộng từ CIA, bổ sung hai yếu tố:

  * **Utility** (Tính hữu dụng): Thông tin phải ở dạng có thể sử dụng được (ví dụ: dữ liệu bị mã hóa và mất khóa giải mã là không có tính hữu dụng).
  * **Possession** (Quyền sở hữu): Bảo vệ thông tin khỏi việc bị **chiếm đoạt, sao chép** hoặc kiểm soát trái phép (ví dụ: mất ổ đĩa sao chép).

-----

## 2\. Bộ ba Phản bảo mật (DAD Triad)

**DAD** là các hành vi tấn công hoặc sự kiện đối lập với **CIA**:

  * **Disclosure** (Tiết lộ): Tấn công **Confidentiality** (Ví dụ: Rò rỉ dữ liệu).
  * **Alteration** (Thay đổi): Tấn công **Integrity** (Ví dụ: Chỉnh sửa hồ sơ giao dịch).
  * **Destruction/Denial** (Phá hủy/Từ chối): Tấn công **Availability** (Ví dụ: Tấn công DDoS hoặc phá hủy thiết bị).

> **Lưu ý:** Việc áp dụng nguyên tắc bảo mật đòi hỏi sự **cân bằng** giữa CIA. Tăng cường quá mức Confidentiality và Integrity có thể làm giảm Availability (ví dụ: khóa quá nhiều lần đăng nhập có thể khiến người dùng hợp pháp bị từ chối truy cập).

-----

## 3\. Khái niệm Cơ bản về Mô hình Bảo mật

Các mô hình này định nghĩa các quy tắc để thực thi các chức năng bảo mật cụ thể trong hệ thống.

| Mô hình | Mục tiêu Chính | Quy tắc cốt lõi | Tóm tắt |
| :--- | :--- | :--- | :--- |
| **Bell-LaPadula (BLP)** | **Confidentiality** | Simple Security Property (**"no read up"**) và Star Security Property (**"no write down"**). | **"Write up, Read down"** (Ghi lên, Đọc xuống) |
| **Biba** | **Integrity** | Simple Integrity Property (**"no read down"**) và Star Integrity Property (**"no write up"**). | **"Read up, Write down"** (Đọc lên, Ghi xuống) |
| **Clark-Wilson** | **Integrity** | Sử dụng các thành phần: CDI (Dữ liệu bị ràng buộc), UDI (Dữ liệu không bị ràng buộc), TPs (Quy trình biến đổi), và IVPs (Quy trình xác minh toàn vẹn). | Tập trung vào việc duy trì tính toàn vẹn của dữ liệu thông qua các quy trình được kiểm soát. |

-----

## 4\. Các Nguyên tắc Bảo mật Chính

### A. Defence-in-Depth (Phòng thủ Chiều sâu)

Nguyên tắc này đề xuất xây dựng một hệ thống bảo mật gồm **nhiều lớp bảo vệ xếp chồng lên nhau**. Nếu một lớp bị phá vỡ, các lớp khác vẫn còn.

### B. Trust but Verify (Tin nhưng Kiểm chứng)

Là một nguyên tắc cổ điển, nhắc nhở rằng ngay cả khi có lý do để tin tưởng một đối tượng (người dùng, hệ thống), chúng ta vẫn phải **kiểm tra định kỳ** để xác nhận hành vi của họ là đúng đắn và an toàn.

### C. Zero Trust (Không Tin tưởng)

Đây là khuôn khổ bảo mật hiện đại với nguyên tắc cốt lõi: **"Không bao giờ tin tưởng, luôn xác minh"** ("Never trust, always verify").

  * Mọi người dùng, thiết bị, và ứng dụng, dù nằm **trong hay ngoài** mạng nội bộ, đều bị coi là **không đáng tin cậy**.
  * Quyền truy cập chỉ được cấp sau khi **xác minh rõ ràng** danh tính và bối cảnh (context) của yêu cầu.

-----

## 5\. ISO/IEC 19249 và Phân biệt Rủi ro

### ISO/IEC 19249:2017

Tiêu chuẩn này liệt kê các nguyên tắc thiết kế và kiến trúc bảo mật:

**5 Nguyên tắc Kiến trúc:**

  * **Domain Separation** (Tách biệt Miền)
  * **Layering** (Phân lớp)
  * **Encapsulation** (Đóng gói)
  * **Redundancy** (Dư thừa)
  * **Virtualization** (Ảo hóa)

**2 Nguyên tắc Thiết kế quan trọng:**

  * **Least Privilege** (Đặc quyền tối thiểu): Cấp quyền truy cập dựa trên nhu cầu công việc (**"need-to-know basis"**).
  * **Attack Surface Minimisation** (Giảm thiểu Bề mặt Tấn công): Giảm thiểu các điểm có thể bị kẻ tấn công khai thác.

### Phân biệt V-T-R

| Khái niệm | Định nghĩa | Ví dụ |
| :--- | :--- | :--- |
| **Vulnerability** (Lỗ hổng) | **Điểm yếu** trong hệ thống. | Một dịch vụ mạng có cổng không cần thiết đang mở. |
| **Threat** (Mối đe dọa) | **Nguy cơ tiềm ẩn** khai thác lỗ hổng. | Kẻ tấn công cố gắng kết nối qua cổng đang mở đó. |
| **Risk** (Rủi ro) | **Khả năng** xảy ra mối đe dọa nhân với **Tác động** nếu nó xảy ra. | Khả năng dịch vụ bị xâm nhập (thấp/cao) và thiệt hại do mất dữ liệu (thấp/cao). |

-----

## 6\. Mô hình Trách nhiệm Chung (Shared Responsibility Model)

Quan trọng trong môi trường **Cloud**, mô hình này phân định rõ ràng trách nhiệm bảo mật giữa **Nhà cung cấp dịch vụ đám mây (Cloud Provider)** và **Khách hàng (Customer)**.

  * Nhà cung cấp chịu trách nhiệm bảo mật **"của đám mây"** (cơ sở hạ tầng vật lý, mạng, v.v.).
  * Khách hàng chịu trách nhiệm bảo mật **"trong đám mây"** (dữ liệu, cấu hình, ứng dụng, v.v.).

Chúc bạn thành công với các nguyên tắc bảo mật này!
```http://googleusercontent.com/image_generation_content/0
