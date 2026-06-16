---
layout: page
title: Portfolio
icon: fas fa-briefcase
order: 1
permalink: /portfolio/
---

<style>
.portfolio-wrap {
  --tokyo-bg: #f6f7fb;
  --tokyo-surface: #ffffff;
  --tokyo-surface-soft: #eef1f8;
  --tokyo-text: #343b58;
  --tokyo-muted: #6c6e75;
  --tokyo-border: #d8dbe8;
  --tokyo-blue: #34548a;
  --tokyo-cyan: #0f4b6e;
  --tokyo-purple: #5a4a78;
  --tokyo-green: #385f0d;
  --tokyo-yellow: #8f5e15;
  --tokyo-shadow: 0 12px 30px rgba(52, 84, 138, .09);

  max-width: 1050px;
  margin: 0 auto;
  padding: 1.4rem;
  border: 1px solid var(--tokyo-border);
  border-radius: 1.2rem;
  background:
    radial-gradient(circle at top right, rgba(90, 74, 120, .08), transparent 28rem),
    linear-gradient(180deg, #fbfbfd 0%, var(--tokyo-bg) 100%);
  color: var(--tokyo-text);
  box-shadow: 0 18px 55px rgba(52, 84, 138, .08);
}

.portfolio-wrap h1,
.portfolio-wrap h2,
.portfolio-wrap h3,
.portfolio-wrap strong {
  color: var(--tokyo-text);
}

.portfolio-wrap h1 {
  margin-bottom: .35rem;
  letter-spacing: -.035em;
}

.portfolio-wrap h2 {
  position: relative;
  margin-top: 2.6rem;
  padding-bottom: .55rem;
  border-bottom: 1px solid var(--tokyo-border);
}

.portfolio-wrap h2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 4.5rem;
  height: 2px;
  background: linear-gradient(90deg, var(--tokyo-blue), var(--tokyo-purple));
}

.portfolio-wrap a {
  color: var(--tokyo-blue);
  text-underline-offset: .2rem;
}

.portfolio-wrap a:hover {
  color: var(--tokyo-purple);
}

.portfolio-wrap hr {
  margin: 2.7rem 0;
  border-color: var(--tokyo-border);
  opacity: .8;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.portfolio-grid.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.portfolio-card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--tokyo-border);
  border-radius: .9rem;
  padding: 1.2rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, .92);
  box-shadow: 0 5px 18px rgba(52, 84, 138, .055);
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}

.portfolio-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--tokyo-blue), var(--tokyo-purple));
  opacity: .75;
}

.portfolio-card:hover {
  transform: translateY(-4px);
  border-color: rgba(52, 84, 138, .42);
  box-shadow: var(--tokyo-shadow);
}

.portfolio-card h3 {
  margin-top: 0;
  color: var(--tokyo-blue);
}

.portfolio-meta {
  color: var(--tokyo-muted);
  font-size: .95rem;
}

.portfolio-links {
  display: flex;
  flex-wrap: wrap;
  gap: .7rem;
  margin: 1.15rem 0 0;
}

.portfolio-links a {
  display: inline-flex;
  align-items: center;
  padding: .55rem .8rem;
  border: 1px solid var(--tokyo-border);
  border-radius: .65rem;
  background: var(--tokyo-surface);
  color: var(--tokyo-blue);
  text-decoration: none;
  font-weight: 650;
  transition: transform .18s ease, background .18s ease, border-color .18s ease;
}

.portfolio-links a:hover {
  transform: translateY(-2px);
  border-color: rgba(52, 84, 138, .45);
  background: var(--tokyo-surface-soft);
}

.portfolio-placeholder {
  border: 1px dashed #a8aec3;
  border-radius: .8rem;
  padding: 1rem;
  color: var(--tokyo-muted);
  background: rgba(238, 241, 248, .72);
}

.portfolio-placeholder code {
  color: var(--tokyo-purple);
  background: rgba(90, 74, 120, .08);
}

.portfolio-stat {
  text-align: center;
}

.portfolio-stat strong {
  display: block;
  font-size: 1.4rem;
  color: var(--tokyo-blue);
}

.portfolio-wrap > h2,
.portfolio-wrap > .portfolio-card,
.portfolio-wrap > .portfolio-grid,
.portfolio-wrap > .portfolio-placeholder {
  animation: portfolio-rise .55s ease both;
}

.portfolio-wrap > :nth-child(2n) { animation-delay: .04s; }
.portfolio-wrap > :nth-child(3n) { animation-delay: .08s; }

@keyframes portfolio-rise {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 800px) {
  .portfolio-wrap { padding: 1rem; border-radius: .9rem; }
  .portfolio-grid,
  .portfolio-grid.three { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-wrap *,
  .portfolio-wrap *::before,
  .portfolio-wrap *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
</style>

<div class="portfolio-wrap">

# Tran Khanh Duy

**Application Security Researcher**  
Final-year Information Technology Student · Saigon Technology University  
Ho Chi Minh City, Vietnam

I focus on web application security, API security, WordPress plugin research, vulnerability validation, and responsible disclosure.

<div class="portfolio-links">
  <a href="mailto:duyytrann22@gmail.com">Email</a>
  <a href="https://github.com/MrDarkRoot">GitHub</a>
  <a href="https://www.linkedin.com/in/duy-tr%E1%BA%A7n-7b0987357/">LinkedIn</a>
  <a href="https://tryhackme.com/p/biusa">TryHackMe</a>
  <a href="/research/">Security Research</a>
</div>

---

## About Me

I am an independent application security researcher interested in how trust breaks across authentication, authorization, persistence, and rendering boundaries.

My work combines source-code review, patch-diff analysis, manual HTTP testing, controlled WordPress labs, security automation, and coordinated disclosure.

<div class="portfolio-grid three">
  <div class="portfolio-card portfolio-stat"><strong>AppSec</strong><span>Primary Focus</span></div>
  <div class="portfolio-card portfolio-stat"><strong>WordPress</strong><span>Research Area</span></div>
  <div class="portfolio-card portfolio-stat"><strong>100+</strong><span>Hands-on Labs</span></div>
</div>

---

## Academic Profile

<div class="portfolio-grid">
  <div class="portfolio-card">
    <h3>Education</h3>
    <p><strong>Saigon Technology University</strong></p>
    <p class="portfolio-meta">Information Technology · Final-year Student</p>
    <p><strong>GPA:</strong> 3.06 / 4.00</p>
  </div>
  <div class="portfolio-card">
    <h3>Graduation Status</h3>
    <p><strong>Status:</strong> In Progress</p>
    <p><strong>Graduation Thesis:</strong> 5 credits</p>
    <p class="portfolio-meta">Expected graduation details can be added later.</p>
  </div>
</div>

---

## Graduation Thesis

<div class="portfolio-card">
  <h3>AI-assisted Threat Detection using Multi-Source Log Analytics for University Systems</h3>
  <p><strong>Status:</strong> In Development</p>
  <p>A research-oriented security analytics framework for small and medium university environments that may not operate a full Security Operations Center.</p>
  <p><strong>Planned stack:</strong> Python, FastAPI, Fluent Bit, Loki, PostgreSQL, Grafana, Docker, Isolation Forest, Local Outlier Factor, and One-Class SVM.</p>
  <p><strong>Planned work:</strong> feature engineering, anomaly detection, risk scoring, synthetic attack generation, evaluation, dashboard design, and thesis writing.</p>
</div>

<div class="portfolio-placeholder">
  Add thesis poster, architecture diagram, abstract, supervisor, final score, source code, and PDF here later.
</div>

---

## Security Research

<div class="portfolio-card">
  <p class="portfolio-meta">CVE Research · 2026</p>
  <h3>CVE-2026-11855 — Unauthenticated Stored XSS in Simple Membership</h3>
  <p>I discovered and reported an unauthenticated stored cross-site scripting vulnerability affecting the Simple Membership WordPress plugin before version 4.7.5.</p>
  <ul>
    <li><strong>Severity:</strong> High</li>
    <li><strong>CVSS:</strong> 8.8</li>
    <li><strong>CWE:</strong> CWE-79</li>
    <li><strong>Fixed version:</strong> 4.7.5</li>
  </ul>
  <p><a href="/posts/cve-2026-11855-simple-membership-stored-xss/">Read the technical write-up</a></p>
</div>

<div class="portfolio-placeholder">
  Add future CVEs, vendor acknowledgements, bounty awards, advisory links, and coordinated-disclosure timelines here.
</div>

---

## Projects

<div class="portfolio-grid">
  <div class="portfolio-card">
    <h3>Omni Workstation</h3>
    <p class="portfolio-meta">Security Research Workflow · In Development</p>
    <p>A repeatable workflow for WordPress vulnerability research, source review, patch-diff triage, trust-boundary analysis, runtime validation, and evidence collection.</p>
  </div>
  <div class="portfolio-card">
    <h3>AI-assisted Threat Detection</h3>
    <p class="portfolio-meta">Academic Research · In Development</p>
    <p>A multi-source log analytics and anomaly-detection framework designed for university environments.</p>
  </div>
</div>

<div class="portfolio-placeholder">
  Add screenshots, source-code links, demo videos, architecture diagrams, and technical results here later.
</div>

---

## Skills

<div class="portfolio-grid">
  <div class="portfolio-card">
    <h3>Application Security</h3>
    <ul>
      <li>Authentication and session testing</li>
      <li>Authorization, IDOR, and ownership validation</li>
      <li>Business-logic testing</li>
      <li>Stored XSS analysis</li>
      <li>Webhook security</li>
      <li>API security testing</li>
    </ul>
  </div>
  <div class="portfolio-card">
    <h3>Source-Code Review</h3>
    <ul>
      <li>PHP and JavaScript</li>
      <li>WordPress hooks, AJAX, REST, and capabilities</li>
      <li>Data-flow tracing</li>
      <li>Patch-diff and changelog analysis</li>
      <li>Authorization and state-mutation review</li>
    </ul>
  </div>
  <div class="portfolio-card">
    <h3>Automation and Labs</h3>
    <ul>
      <li>Python</li>
      <li>Bash</li>
      <li>Docker and Docker Compose</li>
      <li>WP-CLI</li>
      <li>Git and SVN</li>
    </ul>
  </div>
  <div class="portfolio-card">
    <h3>Security Tools</h3>
    <ul>
      <li>Burp Suite</li>
      <li>Browser DevTools</li>
      <li>Nmap</li>
      <li>cURL</li>
      <li>Postman</li>
    </ul>
  </div>
</div>

---

## Certifications

<div class="portfolio-grid">
  <div class="portfolio-card"><h3>TryHackMe: Red Teaming</h3><p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-IHR8ZG35BG.pdf">View certificate</a></p></div>
  <div class="portfolio-card"><h3>TryHackMe: Jr Penetration Tester</h3><p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-G6DMYVUIQD.pdf">View certificate</a></p></div>
  <div class="portfolio-card"><h3>TryHackMe: Web Application Pentesting</h3><p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-AAUZBCLVPN.pdf">View certificate</a></p></div>
  <div class="portfolio-card"><h3>TryHackMe: CompTIA Pentest+</h3><p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-UOYIAPQBOV.pdf">View certificate</a></p></div>
</div>

<div class="portfolio-placeholder">
  Upload certificate images to <code>assets/img/certificates/</code> and certificate PDFs to <code>assets/files/certificates/</code>.
</div>

---

## Awards and Academic Recognition

<div class="portfolio-grid three">
  <div class="portfolio-card">
    <h3>Scientific Research Award</h3>
    <p class="portfolio-meta">Saigon Technology University</p>
    <p>Add award title, year, placement, project name, and evidence image.</p>
  </div>
  <div class="portfolio-card">
    <h3>Graduation Thesis Recognition</h3>
    <p class="portfolio-meta">To be updated</p>
    <p>Add thesis score, distinction, presentation result, or faculty recognition later.</p>
  </div>
  <div class="portfolio-card">
    <h3>Academic Certificate of Merit</h3>
    <p class="portfolio-meta">To be updated</p>
    <p>Add formal commendations, scholarships, or university recognition here.</p>
  </div>
</div>

<div class="portfolio-placeholder">
  Upload award and commendation images to <code>assets/img/awards/</code> and related PDFs to <code>assets/files/awards/</code>.
</div>

---

## Clubs and Activities

<div class="portfolio-grid">
  <div class="portfolio-card">
    <h3>Security / CTF Activities</h3>
    <p>Add team name, role, competition history, responsibilities, and results.</p>
  </div>
  <div class="portfolio-card">
    <h3>University Clubs</h3>
    <p>Add club name, membership period, leadership role, activities, and certificates of participation.</p>
  </div>
</div>

<div class="portfolio-placeholder">
  Upload club photos, activity certificates, and event evidence to <code>assets/img/clubs/</code>.
</div>

---

## Achievements

- Original researcher of CVE-2026-11855
- High-severity WordPress vulnerability disclosure
- Completed more than 100 hands-on security labs
- Built Docker-based WordPress research environments
- Developed a repeatable vulnerability-triage and validation workflow

<div class="portfolio-placeholder">
  Add bounty payouts, acknowledgements, CVEs, publications, competition placements, scholarships, and academic awards later.
</div>

---

## Contact

I am open to conversations about application security, vulnerability research, internships, and responsible disclosure.

- **Email:** `duyytrann22@gmail.com`
- **GitHub:** [MrDarkRoot](https://github.com/MrDarkRoot)
- **LinkedIn:** [Tran Khanh Duy](https://www.linkedin.com/in/duy-tr%E1%BA%A7n-7b0987357/)
- **TryHackMe:** [biusa](https://tryhackme.com/p/biusa)

---

**Tran Khanh Duy**  
Application Security Researcher  
WordPress · Web · API Security

</div>
