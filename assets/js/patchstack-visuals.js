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
        grid-template-columns: repeat(2, minmax(0, 1fr));
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
      <p><strong>Scope & freshness note — September 2026.</strong> This article is a snapshot of the Patchstack Bug Bounty Guidelines and researcher compensation mechanics as they stood in <strong>September 2026</strong>. Patchstack can change the monthly pool, XP formula, multipliers, rejection penalties, eligibility rules, Zeroday criteria, reward structure, or other program details at any time. As a result, exact figures and mechanics in this article may become inaccurate in the future. Readers should verify the <a href="https://patchstack.com/articles/bug-bounty-guidelines-rules/" target="_blank" rel="noopener noreferrer">current Patchstack guidelines</a> before relying on any number or rule quoted here.</p>
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

      <p class="patchstack-critical-payout-risk__note"><a href="" class="patchstack-case-study-placeholder" data-pending="true" aria-disabled="true" title="Reserved for a future MrDarkRoot public write-up">Future MrDarkRoot write-up: CVSS 9.8 / 600K+ active installs — link intentionally left blank until public disclosure</a></p>
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
      <h2 id="patchstack-program-comparison-title">Other major bounty models offer cleaner price discovery</h2>

      <p>"Cleaner" here means <strong>easier for a researcher to estimate the value of one qualifying report before doing the work</strong>. It does not mean Google, Microsoft, Wordfence, or every program hosted on HackerOne is perfect. All of them can have scope exclusions, duplicate rules, discretionary triage, and eligibility requirements. The important structural difference is that many of these programs publish per-report reward tables, ranges, or estimators instead of making one report's payout depend on a community-wide monthly XP denominator.</p>

      <div class="patchstack-program-comparison__grid">
        <div class="patchstack-program-comparison__card">
          <strong>Google VRPs</strong>
          <p>Google publishes reward tables tied to project tier, vulnerability category, exploitation scenario, impact, and sometimes report quality. For example, its OSS VRP lists explicit per-report ranges for supply-chain and product vulnerabilities by project tier. The reward panel still has discretion and duplicates can be ineligible, but unrelated researchers producing more reports in the same month do not automatically dilute an accepted report through a shared XP pool. <a href="https://bughunters.google.com/about/rules/open-source/google-open-source-software-vulnerability-reward-program-rules" target="_blank" rel="noopener noreferrer">Google OSS VRP rules →</a></p>
        </div>

        <div class="patchstack-program-comparison__card">
          <strong>Microsoft bounty programs</strong>
          <p>Microsoft publishes program-specific award ranges and matrices based on impact, severity, report quality, and scope. Its standard award policy and individual program tables give researchers a visible per-report range before submission. Awards remain discretionary, but they are not calculated as a percentage of everybody else's monthly research output. <a href="https://www.microsoft.com/en-us/msrc/bounty-guidelines" target="_blank" rel="noopener noreferrer">Microsoft bounty guidelines →</a></p>
        </div>

        <div class="patchstack-program-comparison__card">
          <strong>Wordfence Bug Bounty Program</strong>
          <p>Wordfence publishes a dedicated bounty program, exposes a <strong>bounty estimator</strong>, and points researchers to a Hall of Fame with real awarded examples. Its current program page advertises rewards up to <strong>$31,200 for Standard Researchers</strong> and <strong>$32,760 for 1337 Researchers</strong>. Whatever one thinks of the exact multipliers, that is much more direct price discovery for a WordPress researcher than waiting for a monthly community denominator to settle. <a href="https://www.wordfence.com/threat-intel/bug-bounty-program/" target="_blank" rel="noopener noreferrer">Wordfence program →</a></p>
        </div>

        <div class="patchstack-program-comparison__card">
          <strong>Programs on HackerOne</strong>
          <p>HackerOne is a platform, not a single bounty program, so each customer sets its own policy. HackerOne nevertheless provides public bounty tables specifically so programs can publish fixed values or ranges by severity and scope, set researcher expectations, and improve reward consistency. <a href="https://docs.hackerone.com/en/articles/8496276-bounty-tables" target="_blank" rel="noopener noreferrer">HackerOne bounty tables →</a></p>
        </div>
      </div>

      <p><strong>That is the comparison.</strong> A per-report model can still be strict, discretionary, and unforgiving about duplicates. But the researcher can usually estimate a qualifying report's value from the report itself. Patchstack's September 2026 shared-pool model adds another pricing variable that the researcher does not control: <em>everyone else's output</em>. From a price-discovery standpoint, that is materially less transparent.</p>
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