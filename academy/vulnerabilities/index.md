---
layout: page
title: Vulnerabilities
permalink: /academy/vulnerabilities/
---

<style>
.academy-index{--a-bg:#f6f7fb;--a-card:#fff;--a-text:#343b58;--a-muted:#6c6e75;--a-border:#d8dbe8;--a-blue:#34548a;max-width:1050px;margin:0 auto;color:var(--a-text)}
.academy-index h1,.academy-index h2,.academy-index h3{color:var(--a-text)}
.academy-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem;margin-top:1.4rem}
.academy-topic{border:1px solid var(--a-border);border-radius:.8rem;padding:1rem;background:var(--a-card)}
.academy-topic strong{display:block;color:var(--a-blue);margin-bottom:.25rem}.academy-topic span{color:var(--a-muted);font-size:.93rem}
.academy-back{display:inline-block;margin-bottom:1rem;font-weight:700}
@media(max-width:760px){.academy-list{grid-template-columns:1fr}}
</style>

<div class="academy-index">
  <a class="academy-back" href="/academy/">← Academy</a>
  <h1>Vulnerabilities</h1>
  <p>This section explains how vulnerability classes form, which trust boundary fails, what attacker model is required, how impact should be demonstrated, and which patterns commonly produce false positives.</p>

  <h2>Planned article structure</h2>
  <p>Overview · Security Boundary · Vulnerable Pattern · Preconditions · Impact · WordPress Attack Surface · Testing Methodology · False Positives · Detection Checklist · References</p>

  <div class="academy-list">
    <div class="academy-topic"><strong>Introduction</strong><span>How to reason about sources, sinks, state, trust, reachability, and impact.</span></div>
    <div class="academy-topic"><strong>Arbitrary File Deletion</strong><span>Attacker-controlled deletion paths and destructive file operations.</span></div>
    <div class="academy-topic"><strong>Arbitrary File Read</strong><span>Unauthorized access to local files and sensitive application data.</span></div>
    <div class="academy-topic"><strong>Arbitrary File Upload</strong><span>Unsafe uploads, execution boundaries, extension checks, and storage location.</span></div>
    <div class="academy-topic"><strong>Broken Access Control</strong><span>Missing authorization, ownership validation, and role enforcement.</span></div>
    <div class="academy-topic"><strong>Content Injection</strong><span>Unauthorized modification or creation of application-controlled content.</span></div>
    <div class="academy-topic"><strong>Cross-Site Request Forgery (CSRF)</strong><span>State-changing requests performed through an authenticated victim.</span></div>
    <div class="academy-topic"><strong>Cross-Site Scripting (XSS)</strong><span>Stored, reflected, and DOM-based execution in browser contexts.</span></div>
    <div class="academy-topic"><strong>Local File Inclusion (LFI)</strong><span>Unsafe inclusion paths and local code or data exposure.</span></div>
    <div class="academy-topic"><strong>Open Redirect</strong><span>Untrusted destinations, phishing support, and redirect validation.</span></div>
    <div class="academy-topic"><strong>PHP Object Injection</strong><span>Unsafe deserialization and gadget-chain reachability.</span></div>
    <div class="academy-topic"><strong>Privilege Escalation</strong><span>Unauthorized role, capability, or account privilege changes.</span></div>
    <div class="academy-topic"><strong>Race Condition</strong><span>Security failures caused by unsafe timing and non-atomic state changes.</span></div>
    <div class="academy-topic"><strong>Remote Code Execution (RCE)</strong><span>Attacker-controlled execution through dangerous interpreters and sinks.</span></div>
    <div class="academy-topic"><strong>Sensitive Data Exposure</strong><span>Unauthorized disclosure of secrets, private records, and protected content.</span></div>
    <div class="academy-topic"><strong>Server-Side Request Forgery (SSRF)</strong><span>Server-initiated requests to attacker-selected destinations.</span></div>
    <div class="academy-topic"><strong>SQL Injection (SQLi)</strong><span>Untrusted data altering database query structure.</span></div>
    <div class="academy-topic"><strong>Type Juggling</strong><span>Loose comparison, coercion, and validation bypasses in PHP.</span></div>
  </div>
</div>
