document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.post-content, .content');
  if (!content) return;

  if (!document.getElementById('patchstack-economics-extra-styles')) {
    const styles = document.createElement('style');
    styles.id = 'patchstack-economics-extra-styles';
    styles.textContent = `
      .patchstack-guideline-snapshot,
      .patchstack-program-comparison {
        margin: 1.7rem 0 2.2rem;
        padding: 1.15rem 1.25rem;
        border: 1px solid #d9dee7;
        border-radius: .9rem;
        background: #f8fafc;
      }

      .patchstack-guideline-snapshot {
        border-left: .3rem solid #202633;
      }

      .patchstack-guideline-snapshot p,
      .patchstack-program-comparison p:last-child {
        margin-bottom: 0;
      }

      .patchstack-program-comparison h2 {
        margin-top: 0 !important;
      }

      .patchstack-program-comparison__grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: .8rem;
        margin: 1rem 0;
      }

      .patchstack-program-comparison__card {
        padding: 1rem;
        border: 1px solid #dde2ea;
        border-radius: .75rem;
        background: #fff;
      }

      .patchstack-program-comparison__card strong {
        display: block;
        margin-bottom: .35rem;
      }

      .patchstack-program-comparison__card p {
        margin: 0;
        font-size: .92rem;
        line-height: 1.55;
      }

      .patchstack-case-study-placeholder[aria-disabled="true"] {
        cursor: default;
        text-decoration-style: dashed;
      }

      @media (max-width: 800px) {
        .patchstack-program-comparison__grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  if (!document.querySelector('.patchstack-guideline-snapshot')) {
    const firstQuote = content.querySelector('blockquote');
    const note = document.createElement('aside');
    note.className = 'patchstack-guideline-snapshot';
    note.setAttribute('aria-label', 'Scope and freshness note');
    note.innerHTML = `
      <p><strong>Scope & freshness note — September 2026.</strong> This article analyzes the Patchstack Bug Bounty Guidelines and researcher compensation mechanics as they stood in <strong>September 2026</strong>. Patchstack may change the monthly pool, XP formula, multipliers, rejection penalties, eligibility rules, Zeroday criteria, or other program details in the future. Exact figures and mechanics in this article may therefore become outdated; future readers should verify the <a href="https://patchstack.com/articles/bug-bounty-guidelines-rules/" target="_blank" rel="noopener noreferrer">current Patchstack guidelines</a> before relying on them.</p>
    `;

    if (firstQuote) {
      firstQuote.insertAdjacentElement('afterend', note);
    } else {
      content.prepend(note);
    }
  }

  const logo = [...content.querySelectorAll('img')].find((img) =>
    /patchstack-logo\.webp$/i.test(img.getAttribute('src') || '') ||
    /patchstack logo/i.test(img.getAttribute('alt') || '')
  );

  if (logo) {
    const originalSrc = logo.getAttribute('src');
    logo.src = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/PatchStack_logo.png';
    logo.classList.add('patchstack-brand-logo');
    logo.alt = 'Patchstack logo';
    logo.loading = 'eager';
    logo.addEventListener('error', () => {
      if (originalSrc && logo.src !== originalSrc) logo.src = originalSrc;
    }, { once: true });

    const caption = logo.parentElement?.nextElementSibling;
    if (caption && caption.tagName === 'P' && /Patchstack/i.test(caption.textContent || '')) {
      caption.classList.add('patchstack-visual-caption');
      caption.innerHTML = 'Patchstack logo. Source: <a href="https://commons.wikimedia.org/wiki/File:PatchStack_logo.png" target="_blank" rel="noopener noreferrer">PatchStack / Wikimedia Commons</a>.';
    }
  }

  const leaderboard = [...content.querySelectorAll('img')].find((img) =>
    /patchstack-leaderboard/i.test(img.getAttribute('src') || '') ||
    /leaderboard/i.test(img.getAttribute('alt') || '')
  );
  if (leaderboard) {
    leaderboard.classList.add('patchstack-wide-visual');
    const caption = leaderboard.parentElement?.nextElementSibling;
    if (caption && caption.tagName === 'P') caption.classList.add('patchstack-visual-caption');
  }

  const headings = [...content.querySelectorAll('h1, h2, h3')];

  const criticalHeading = headings.find((h) =>
    /A Critical vulnerability no longer guarantees Critical money/i.test(h.textContent || '')
  );

  if (criticalHeading && !document.querySelector('.patchstack-critical-payout-risk')) {
    const callout = document.createElement('section');
    callout.className = 'patchstack-critical-payout-risk';
    callout.setAttribute('aria-labelledby', 'critical-monthly-pool-risk-title');
    callout.innerHTML = `
      <p class="patchstack-critical-payout-risk__eyebrow">The uncomfortable monthly-pool edge case</p>
      <h2 id="critical-monthly-pool-risk-title">A Critical report can still collapse to a double- or triple-digit payout</h2>

      <p>Patchstack's standard monthly bounty is distributed by <strong>percentage of contribution</strong>, not by a guaranteed per-vulnerability Critical payout. Its rules separately say that high-impact vulnerabilities <em>may</em> receive an individual reward, while Zeroday bounties are a distinct case-by-case lane with their own eligibility requirements.</p>

      <p>That leaves an important risk: a Critical finding that does <strong>not</strong> receive a Zeroday or separate individual bounty can still be priced through the monthly pool. Even a high-severity vulnerability in a widely installed plugin therefore has no fixed Critical-dollar floor.</p>

      <p>Take a concrete illustration: a <strong>CVSS 9.8</strong> vulnerability affecting a plugin with roughly <strong>600,000 active installs</strong>. Under Patchstack's September 2026 XP table, 600K installs sits in the <strong>400K+ active-install band (x6)</strong>. That sounds substantial — but the XP still becomes a <em>relative share</em> of the month's total XP.</p>

      <div class="patchstack-critical-payout-risk__math" aria-label="Illustrative payout shares from a ten-thousand-dollar pool">
        <code>0.5% share → $50</code>
        <code>1% share → $100</code>
        <code>3% share → $300</code>
      </div>

      <p>Those figures are illustrations using the <strong>$10,000 minimum pool</strong>, not predictions of any specific report. The final pool can be larger, the contribution percentage can be higher, rejection adjustments can apply, and Patchstack can choose to award a separate high-impact bounty. The point is narrower: <strong>Critical severity plus hundreds of thousands of installs does not itself guarantee a Critical-sized cash payout when the report remains inside a relative monthly pool.</strong></p>

      <p class="patchstack-critical-payout-risk__note"><a href="" class="patchstack-case-study-placeholder" data-pending="true" aria-disabled="true" title="Reserved for a future MrDarkRoot public write-up">Future MrDarkRoot case study: CVSS 9.8 / 600K+ active installs — write-up link reserved pending public disclosure</a></p>
      <p class="patchstack-critical-payout-risk__note">Rule basis: <a href="https://patchstack.com/articles/bug-bounty-guidelines-rules/" target="_blank" rel="noopener noreferrer">Patchstack Bug Bounty Guidelines & Rules</a> (September 2026 snapshot: monthly contribution model, active-install multiplier table, individual high-impact awards, and Zeroday lane).</p>
    `;

    const pendingLink = callout.querySelector('.patchstack-case-study-placeholder[data-pending="true"]');
    pendingLink?.addEventListener('click', (event) => event.preventDefault());

    let nextSection = criticalHeading.nextElementSibling;
    while (nextSection && !/^H[12]$/.test(nextSection.tagName)) {
      nextSection = nextSection.nextElementSibling;
    }

    if (nextSection) {
      nextSection.insertAdjacentElement('beforebegin', callout);
    } else {
      content.appendChild(callout);
    }
  }

  const pricingHeading = headings.find((h) =>
    /The pricing system is becoming a mini CTF of its own/i.test(h.textContent || '')
  );

  if (pricingHeading && !document.querySelector('.patchstack-program-comparison')) {
    let insertionPoint = pricingHeading;
    let node = pricingHeading.nextElementSibling;
    while (node && !/^H[12]$/.test(node.tagName)) {
      insertionPoint = node;
      node = node.nextElementSibling;
    }

    const comparison = document.createElement('section');
    comparison.className = 'patchstack-program-comparison';
    comparison.setAttribute('aria-labelledby', 'patchstack-program-comparison-title');
    comparison.innerHTML = `
      <h2 id="patchstack-program-comparison-title">Other major bounty models make the price easier to understand</h2>

      <p>This comparison is not a claim that Google, Microsoft, or programs hosted on HackerOne are perfect. They still have scope rules, duplicate rules, triage discretion, and eligibility requirements. The narrower point is <strong>price discovery</strong>: many major programs publish per-report reward tables or ranges, so one accepted report is not automatically diluted because unrelated researchers generated more XP during the same month.</p>

      <div class="patchstack-program-comparison__grid">
        <div class="patchstack-program-comparison__card">
          <strong>Google VRPs</strong>
          <p>Google publishes reward tables keyed to product or project tier, vulnerability category, exploitation scenario, and sometimes report quality. The panel still has discretion and duplicates can be ineligible, but the reward framework is attached to the individual report rather than a community-wide monthly denominator. <a href="https://bughunters.google.com/about/rules/android-friends/google-mobile-vulnerability-reward-program-rules" target="_blank" rel="noopener noreferrer">Official example →</a></p>
        </div>

        <div class="patchstack-program-comparison__card">
          <strong>Microsoft bounty programs</strong>
          <p>Microsoft publishes award ranges and matrices based on security impact, severity, report quality, and program scope. Qualified reports map to stated award bands; they are not priced as a percentage of all researchers' monthly output. <a href="https://www.microsoft.com/en-us/msrc/bounty-guidelines" target="_blank" rel="noopener noreferrer">Official guidelines →</a></p>
        </div>

        <div class="patchstack-program-comparison__card">
          <strong>Programs on HackerOne</strong>
          <p>HackerOne is a platform, not one bounty program, so policies vary by customer. But HackerOne explicitly supports public bounty tables with fixed values or ranges by severity and scope to set expectations and improve consistency. <a href="https://docs.hackerone.com/en/articles/8496276-bounty-tables" target="_blank" rel="noopener noreferrer">HackerOne bounty tables →</a></p>
        </div>
      </div>

      <p><strong>That is the contrast.</strong> A per-report table can still be strict, discretionary, or unforgiving about duplicates, but the researcher can usually estimate the price of a qualifying finding from the finding itself. Patchstack's September 2026 shared-pool model adds another variable: <em>everyone else's output</em>. That makes the researcher's expected return harder to price before the work is done.</p>
    `;

    insertionPoint.insertAdjacentElement('afterend', comparison);
  }

  const commercialHeading = headings.find((h) =>
    /Patchstack does not just receive bugs/i.test(h.textContent || '')
  );

  if (commercialHeading && !document.querySelector('.patchstack-dashboard-figure')) {
    const figure = document.createElement('figure');
    figure.className = 'patchstack-dashboard-figure';
    figure.innerHTML = `
      <a href="https://docs.patchstack.com/patchstack-app/dashboard/" target="_blank" rel="noopener noreferrer">
        <img
          src="https://docs.patchstack.com/_astro/patchstack-dashboard-view-populated.AMsGFwHg_Qq3Du.webp"
          alt="Patchstack application dashboard showing vulnerability and security data"
          loading="lazy"
        >
      </a>
      <figcaption>Official Patchstack dashboard screenshot from Patchstack Docs — a useful reminder that vulnerability research ultimately feeds a broader commercial security intelligence product.</figcaption>
    `;

    const dashboardImg = figure.querySelector('img');
    dashboardImg.addEventListener('error', () => figure.remove(), { once: true });

    let insertionPoint = commercialHeading;
    let paragraphsSeen = 0;
    let node = commercialHeading.nextElementSibling;
    while (node && paragraphsSeen < 2) {
      if (node.tagName === 'P') paragraphsSeen += 1;
      insertionPoint = node;
      node = node.nextElementSibling;
    }
    insertionPoint.insertAdjacentElement('afterend', figure);
  }
});