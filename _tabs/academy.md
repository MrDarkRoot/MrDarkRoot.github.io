---
layout: page
title: Academy
icon: fas fa-graduation-cap
order: 2
permalink: /academy/
---

<style>
.academy-home{--a-bg:#f6f7fb;--a-card:#fff;--a-text:#343b58;--a-muted:#6c6e75;--a-border:#d8dbe8;--a-blue:#34548a;--a-purple:#5a4a78;max-width:1050px;margin:0 auto;padding:1.4rem;border:1px solid var(--a-border);border-radius:1rem;background:linear-gradient(180deg,#fbfbfd,var(--a-bg));color:var(--a-text)}
.academy-home h1,.academy-home h2,.academy-home h3{color:var(--a-text)}
.academy-lead{font-size:1.05rem;line-height:1.75;color:var(--a-muted)}
.academy-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:1.5rem}
.academy-card{border:1px solid var(--a-border);border-radius:.9rem;padding:1.25rem;background:var(--a-card);box-shadow:0 6px 20px rgba(52,84,138,.06);transition:transform .2s ease,box-shadow .2s ease}
.academy-card:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(52,84,138,.1)}
.academy-card h2{margin-top:0;color:var(--a-blue)}
.academy-card a{display:inline-block;margin-top:.75rem;font-weight:700;color:var(--a-blue);text-decoration:none}
.academy-card a:hover{color:var(--a-purple)}
.academy-note{margin-top:1.5rem;padding:1rem;border-left:4px solid var(--a-blue);background:rgba(52,84,138,.07);border-radius:.4rem}
@media(max-width:760px){.academy-home{padding:1rem}.academy-grid{grid-template-columns:1fr}}
</style>

<div class="academy-home">
  <h1>MrDarkRoot Academy</h1>
  <p class="academy-lead">A focused knowledge base for application security and secure software engineering. The content is limited to topics I have studied, validated, and can explain with confidence. Articles may be refined as my understanding and practical experience improve.</p>

  <div class="academy-grid">
    <article class="academy-card">
      <h2>Vulnerabilities</h2>
      <p>Understand how common vulnerability classes arise, which trust boundary fails, what attacker capabilities are required, how impact should be validated, and how to avoid common false positives.</p>
      <a href="/academy/vulnerabilities/">Browse vulnerability topics →</a>
    </article>

    <article class="academy-card">
      <h2>Secure Code</h2>
      <p>Study secure design and implementation patterns for the same vulnerability classes, with emphasis on authorization, fail-closed behavior, context-aware encoding, validation, and WordPress-specific controls.</p>
      <a href="/academy/secure-code/">Browse secure coding topics →</a>
    </article>
  </div>

  <div class="academy-note">
    <strong>Scope:</strong> Application security, PHP, APIs, and WordPress plugin security. Examples are educational and intended for authorized testing and defensive engineering.
  </div>
</div>
