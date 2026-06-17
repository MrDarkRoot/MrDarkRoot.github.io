---
layout: page
title: Secure Code
permalink: /academy/secure-code/
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
  <h1>Secure Code</h1>
  <p>This section focuses on secure design and implementation for the same vulnerability classes. The goal is to explain the security objective, appropriate control boundary, WordPress-specific protections, and how to verify that a fix actually closes the issue.</p>

  <h2>Planned article structure</h2>
  <p>Security Objective · Unsafe Design · Secure Design · WordPress Controls · Secure Code Example · Validation and Encoding · Authorization · Fail-Closed Behavior · Testing the Fix · Checklist · References</p>

  <div class="academy-list">
    <div class="academy-topic"><strong>Introduction</strong><span>Security boundaries, defense in depth, least privilege, and fail-closed design.</span></div>
    <div class="academy-topic"><strong>Arbitrary File Deletion</strong><span>Constrain paths, authorize destructive actions, and allowlist valid targets.</span></div>
    <div class="academy-topic"><strong>Arbitrary File Read</strong><span>Canonicalize paths, isolate storage, and enforce object-level authorization.</span></div>
    <div class="academy-topic"><strong>Arbitrary File Upload</strong><span>Validate type, content, destination, permissions, and execution boundaries.</span></div>
    <div class="academy-topic"><strong>Broken Access Control</strong><span>Verify capabilities, ownership, tenant boundaries, and permitted state transitions.</span></div>
    <div class="academy-topic"><strong>Content Injection</strong><span>Authorize content mutation and encode output for its final context.</span></div>
    <div class="academy-topic"><strong>Cross-Site Request Forgery (CSRF)</strong><span>Use nonces correctly while preserving independent authorization checks.</span></div>
    <div class="academy-topic"><strong>Cross-Site Scripting (XSS)</strong><span>Apply context-aware output encoding and safe HTML handling.</span></div>
    <div class="academy-topic"><strong>Local File Inclusion (LFI)</strong><span>Remove dynamic include paths or map identifiers to trusted resources.</span></div>
    <div class="academy-topic"><strong>Open Redirect</strong><span>Restrict destinations to trusted hosts or validated local paths.</span></div>
    <div class="academy-topic"><strong>PHP Object Injection</strong><span>Avoid unsafe deserialization and reduce reachable gadget surfaces.</span></div>
    <div class="academy-topic"><strong>Privilege Escalation</strong><span>Protect role changes, capability assignment, and account-management workflows.</span></div>
    <div class="academy-topic"><strong>Race Condition</strong><span>Use atomic operations, locking, uniqueness constraints, and idempotency.</span></div>
    <div class="academy-topic"><strong>Remote Code Execution (RCE)</strong><span>Eliminate command and interpreter injection paths and unsafe dynamic execution.</span></div>
    <div class="academy-topic"><strong>Sensitive Data Exposure</strong><span>Classify data, minimize output, authorize access, and prevent cache leakage.</span></div>
    <div class="academy-topic"><strong>Server-Side Request Forgery (SSRF)</strong><span>Allowlist destinations, resolve safely, and block internal address ranges.</span></div>
    <div class="academy-topic"><strong>SQL Injection (SQLi)</strong><span>Use prepared statements and avoid dynamic query structure from user input.</span></div>
    <div class="academy-topic"><strong>Type Juggling</strong><span>Use strict comparisons, explicit parsing, and type-safe validation.</span></div>
  </div>
</div>
