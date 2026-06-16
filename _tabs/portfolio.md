---
layout: page
title: Portfolio
icon: fas fa-terminal
order: 1
permalink: /portfolio/
---

<style>
.portfolio-shell {
  --pf-accent: #22c55e;
  --pf-accent-2: #38bdf8;
  --pf-border: rgba(148, 163, 184, 0.22);
  --pf-panel: rgba(15, 23, 42, 0.55);
  --pf-muted: #94a3b8;
  max-width: 1120px;
  margin: 0 auto;
}

.portfolio-shell * { box-sizing: border-box; }
.portfolio-shell section { scroll-margin-top: 5rem; margin: 0 0 4rem; }

.pf-nav {
  display: flex;
  flex-wrap: wrap;
  gap: .65rem;
  margin: 0 0 1.5rem;
}

.pf-nav a,
.pf-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  padding: .7rem 1rem;
  border: 1px solid var(--pf-border);
  border-radius: .75rem;
  text-decoration: none !important;
  font-weight: 650;
  transition: transform .18s ease, border-color .18s ease, background .18s ease;
}

.pf-nav a:hover,
.pf-button:hover {
  transform: translateY(-2px);
  border-color: var(--pf-accent);
  background: rgba(34, 197, 94, .08);
}

.pf-terminal {
  overflow: hidden;
  border: 1px solid var(--pf-border);
  border-radius: 1rem;
  background: #020617;
  box-shadow: 0 25px 80px rgba(2, 6, 23, .28);
}

.pf-terminal-bar {
  display: flex;
  gap: .45rem;
  padding: .85rem 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, .16);
  background: #0f172a;
}

.pf-dot { width: .75rem; height: .75rem; border-radius: 50%; background: #ef4444; }
.pf-dot:nth-child(2) { background: #f59e0b; }
.pf-dot:nth-child(3) { background: #22c55e; }

.pf-terminal-body {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  color: #e2e8f0;
}

.pf-prompt { color: var(--pf-accent); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.pf-command { color: #f8fafc; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.pf-terminal h1 { color: #f8fafc; margin: .35rem 0 1rem; font-size: clamp(2rem, 5vw, 3.6rem); }
.pf-role { color: var(--pf-accent-2); font-size: 1.15rem; font-weight: 700; }
.pf-location { color: #cbd5e1; }
.pf-lead { color: #cbd5e1; max-width: 760px; line-height: 1.75; }

.pf-avatar {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 1.25rem;
  border: 2px solid rgba(34, 197, 94, .65);
  box-shadow: 0 0 50px rgba(34, 197, 94, .16);
}

.pf-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.4rem; }
.pf-button.primary { background: var(--pf-accent); color: #052e16 !important; border-color: var(--pf-accent); }

.pf-section-title {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin-bottom: 1.2rem;
}

.pf-section-title::before {
  content: "";
  width: 2.5rem;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--pf-accent), var(--pf-accent-2));
}

.pf-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.pf-grid.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }

.pf-card {
  border: 1px solid var(--pf-border);
  border-radius: 1rem;
  padding: 1.25rem;
  background: var(--pf-panel);
}

.pf-card h3 { margin-top: 0; }
.pf-card p:last-child { margin-bottom: 0; }

.pf-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .9rem; }
.pf-tag {
  display: inline-flex;
  padding: .32rem .65rem;
  border-radius: 999px;
  border: 1px solid var(--pf-border);
  font-size: .82rem;
  font-weight: 650;
}

.pf-metrics { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: .75rem; margin-top: 1rem; }
.pf-metric { padding: .9rem; border-radius: .8rem; border: 1px solid var(--pf-border); text-align: center; }
.pf-metric strong { display: block; font-size: 1.35rem; color: var(--pf-accent); }
.pf-muted { color: var(--pf-muted); }

.pf-timeline { border-left: 2px solid var(--pf-border); padding-left: 1.25rem; }
.pf-timeline-item { position: relative; margin: 0 0 1.4rem; }
.pf-timeline-item::before {
  content: "";
  position: absolute;
  left: -1.72rem;
  top: .45rem;
  width: .8rem;
  height: .8rem;
  border-radius: 50%;
  background: var(--pf-accent);
  box-shadow: 0 0 0 5px rgba(34, 197, 94, .12);
}

.pf-contact { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: .8rem; }
.pf-contact a { text-decoration: none !important; }

@media (max-width: 850px) {
  .pf-terminal-body { grid-template-columns: 1fr; }
  .pf-avatar { width: 150px; height: 150px; }
  .pf-grid, .pf-grid.three, .pf-contact { grid-template-columns: 1fr; }
  .pf-metrics { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
</style>

<div class="portfolio-shell">

<nav class="pf-nav" aria-label="Portfolio sections">
  <a href="#about">About</a>
  <a href="#skills">Skills</a>
  <a href="#research">Research</a>
  <a href="#projects">Projects</a>
  <a href="#training">Training</a>
  <a href="#achievements">Achievements</a>
  <a href="#contact">Contact</a>
</nav>

<section class="pf-terminal" id="top">
  <div class="pf-terminal-bar"><span class="pf-dot"></span><span class="pf-dot"></span><span class="pf-dot"></span></div>
  <div class="pf-terminal-body">
    <div>
      <div><span class="pf-prompt">duy@appsec:~$</span> <span class="pf-command">whoami</span></div>
      <h1>Tran Khanh Duy</h1>
      <div><span class="pf-prompt">duy@appsec:~$</span> <span class="pf-command">cat role.txt</span></div>
      <p class="pf-role">Application Security Researcher</p>
      <div><span class="pf-prompt">duy@appsec:~$</span> <span class="pf-command">cat location.txt</span></div>
      <p class="pf-location">Ho Chi Minh City, Vietnam</p>
      <p class="pf-lead">Final-year Information Technology student at Saigon Technology University, focused on web application security, API security, WordPress plugin research, vulnerability validation, and responsible disclosure.</p>
      <div class="pf-actions">
        <a class="pf-button primary" href="/research/">View Security Research</a>
        <a class="pf-button" href="/posts/cve-2026-11855-simple-membership-stored-xss/">Read CVE Write-up</a>
        <a class="pf-button" href="https://github.com/MrDarkRoot">GitHub</a>
      </div>
    </div>
    <div>
      <img class="pf-avatar" src="/assets/img/avatar.png" alt="Tran Khanh Duy avatar">
    </div>
  </div>
</section>

<section id="about">
  <h2 class="pf-section-title">About Me</h2>
  <div class="pf-card">
    <p>I am an independent application security researcher focused on understanding how trust breaks across authentication, authorization, persistence, and rendering boundaries.</p>
    <p>My work combines source-code review, manual HTTP testing, patch-diff analysis, WordPress runtime labs, and security automation. I prioritize findings that are reachable, reproducible, and supported by clear impact evidence.</p>
    <div class="pf-tags">
      <span class="pf-tag">AppSec Researcher</span>
      <span class="pf-tag">WordPress Security</span>
      <span class="pf-tag">API Security</span>
      <span class="pf-tag">CVE Research</span>
    </div>
  </div>
</section>

<section id="skills">
  <h2 class="pf-section-title">Skills</h2>
  <div class="pf-grid">
    <article class="pf-card">
      <h3>Application Security</h3>
      <ul>
        <li>Authentication and session testing</li>
        <li>Authorization, IDOR, and ownership validation</li>
        <li>Business-logic and workflow testing</li>
        <li>Stored XSS and output-context analysis</li>
        <li>Webhook authenticity and trust boundaries</li>
      </ul>
    </article>
    <article class="pf-card">
      <h3>Source-Code Review</h3>
      <ul>
        <li>PHP and JavaScript review</li>
        <li>WordPress hooks, AJAX, REST, and capability models</li>
        <li>Patch-diff and changelog analysis</li>
        <li>Data-flow tracing from source to sink</li>
        <li>State mutation and authorization review</li>
      </ul>
    </article>
    <article class="pf-card">
      <h3>Automation</h3>
      <ul>
        <li>Python security tooling</li>
        <li>Bash and CLI workflows</li>
        <li>HTTP request mutation and validation</li>
        <li>Evidence collection and reproducible testing</li>
        <li>Docker-based lab orchestration</li>
      </ul>
    </article>
    <article class="pf-card">
      <h3>Tools</h3>
      <ul>
        <li>Burp Suite and browser DevTools</li>
        <li>WP-CLI and Docker Compose</li>
        <li>Git, SVN, and patch diffing</li>
        <li>Linux security workflows</li>
        <li>Nmap and manual HTTP tooling</li>
      </ul>
    </article>
  </div>
</section>

<section id="research">
  <h2 class="pf-section-title">Featured Security Research</h2>
  <article class="pf-card">
    <p class="pf-muted">CVE Research · 2026</p>
    <h3>CVE-2026-11855 — Unauthenticated Stored XSS in Simple Membership</h3>
    <p>I discovered and reported an unauthenticated stored cross-site scripting vulnerability affecting the Simple Membership WordPress plugin before version 4.7.5.</p>
    <p>The issue chained an unsigned Stripe webhook path with persistent attacker-controlled metadata and unsafe rendering in an administrator-facing notice.</p>
    <div class="pf-tags">
      <span class="pf-tag">WordPress</span>
      <span class="pf-tag">Stored XSS</span>
      <span class="pf-tag">Webhook Security</span>
      <span class="pf-tag">CWE-79</span>
    </div>
    <div class="pf-metrics">
      <div class="pf-metric"><strong>8.8</strong><span>CVSS</span></div>
      <div class="pf-metric"><strong>High</strong><span>Severity</span></div>
      <div class="pf-metric"><strong>Unauth</strong><span>Attacker</span></div>
      <div class="pf-metric"><strong>4.7.5</strong><span>Fixed</span></div>
    </div>
    <div class="pf-actions">
      <a class="pf-button primary" href="/posts/cve-2026-11855-simple-membership-stored-xss/">Full Technical Write-up</a>
      <a class="pf-button" href="/research/">Research Portfolio</a>
    </div>
  </article>
</section>

<section id="projects">
  <h2 class="pf-section-title">Projects</h2>
  <div class="pf-grid">
    <article class="pf-card">
      <p class="pf-muted">Security Research Workflow</p>
      <h3>Omni Workstation</h3>
      <p>A research workflow for triaging and validating WordPress plugin vulnerabilities through source review, patch analysis, trust-boundary tracing, authorization modeling, runtime validation, and report-readiness checks.</p>
      <div class="pf-tags">
        <span class="pf-tag">Python</span>
        <span class="pf-tag">WordPress</span>
        <span class="pf-tag">Docker</span>
        <span class="pf-tag">Patch Diffing</span>
      </div>
    </article>
    <article class="pf-card">
      <p class="pf-muted">Research Project · In Development</p>
      <h3>AI-assisted Threat Detection for University Systems</h3>
      <p>A multi-source log analytics framework designed for universities without a full SOC. The project explores log ingestion, feature engineering, anomaly detection, risk scoring, and a lightweight Grafana-based monitoring dashboard.</p>
      <div class="pf-tags">
        <span class="pf-tag">Python</span>
        <span class="pf-tag">FastAPI</span>
        <span class="pf-tag">Loki</span>
        <span class="pf-tag">Grafana</span>
        <span class="pf-tag">Machine Learning</span>
      </div>
    </article>
  </div>
</section>

<section id="training">
  <h2 class="pf-section-title">Training and Certifications</h2>
  <div class="pf-grid">
    <article class="pf-card"><h3>TryHackMe: Red Teaming</h3><p>Adversary simulation, operational tradecraft, and red-team fundamentals.</p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-IHR8ZG35BG.pdf">View Certificate</a></article>
    <article class="pf-card"><h3>TryHackMe: Jr Penetration Tester</h3><p>Practical penetration-testing workflow, enumeration, exploitation, and reporting.</p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-G6DMYVUIQD.pdf">View Certificate</a></article>
    <article class="pf-card"><h3>TryHackMe: Web Application Pentesting</h3><p>Web attack surfaces, OWASP-style vulnerabilities, and hands-on testing.</p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-AAUZBCLVPN.pdf">View Certificate</a></article>
    <article class="pf-card"><h3>TryHackMe: CompTIA Pentest+</h3><p>Penetration-testing methodology, tooling, analysis, and communication.</p><a href="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-UOYIAPQBOV.pdf">View Certificate</a></article>
  </div>
</section>

<section id="achievements">
  <h2 class="pf-section-title">Achievements</h2>
  <div class="pf-timeline">
    <div class="pf-timeline-item"><h3>Original Researcher — CVE-2026-11855</h3><p>Discovered and reported a high-severity unauthenticated stored XSS vulnerability in a WordPress plugin.</p></div>
    <div class="pf-timeline-item"><h3>100+ Hands-on Security Labs</h3><p>Completed practical labs covering web security, red teaming, Windows, Linux, networking, detection engineering, and adversary tradecraft.</p></div>
    <div class="pf-timeline-item"><h3>Dedicated WordPress Research Lab</h3><p>Built reproducible Docker-based environments for plugin source review, runtime validation, role testing, and evidence collection.</p></div>
  </div>
</section>

<section id="contact">
  <h2 class="pf-section-title">Contact</h2>
  <p>I am open to conversations about application security, vulnerability research, internships, and responsible disclosure.</p>
  <div class="pf-contact">
    <a class="pf-card" href="mailto:duyytrann22@gmail.com"><strong>Email</strong><br><span class="pf-muted">duyytrann22@gmail.com</span></a>
    <a class="pf-card" href="https://github.com/MrDarkRoot"><strong>GitHub</strong><br><span class="pf-muted">@MrDarkRoot</span></a>
    <a class="pf-card" href="https://www.linkedin.com/in/duy-tr%E1%BA%A7n-7b0987357/"><strong>LinkedIn</strong><br><span class="pf-muted">Tran Khanh Duy</span></a>
    <a class="pf-card" href="https://tryhackme.com/p/biusa"><strong>TryHackMe</strong><br><span class="pf-muted">@biusa</span></a>
  </div>
</section>

<footer class="pf-card" style="text-align:center; margin-bottom:1rem;">
  <strong>&lt;Duy Tran /&gt;</strong><br>
  <span class="pf-muted">Application Security Researcher · WordPress · Web · API Security</span>
</footer>

</div>
