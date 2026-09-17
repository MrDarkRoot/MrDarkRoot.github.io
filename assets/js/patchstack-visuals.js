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
        margin-bottom: .55rem;
        font-size: 1.05rem;
      }

      .patchstack-program-comparison__card p {
        margin: 0 0 .65rem;
        font-size: .92rem;
        line-height: 1.55;
      }

      .patchstack-program-comparison__card ul {
        margin: .6rem 0 0;
        padding-left: 1.15rem;
      }

      .patchstack-program-comparison__card li {
        margin: .35rem 0;
        font-size: .9rem;
        line-height: 1.5;
      }

      .patchstack-program-comparison__evidence {
        margin: 1rem 0 !important;
        padding: .9rem 1rem;
        border-left: .25rem solid #202633;
        background: #fff;
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
      <h2 id="patchstack-program-comparison-title">Patchstack vs. Wordfence: same WordPress market, very different pricing</h2>

      <p>Wordfence is the cleanest comparison because it buys essentially the same kind of asset: vulnerability research in WordPress plugins and themes. Both programs have scope rules, duplicate risk, triage discretion, and quality controls. The important difference is <strong>what gets priced</strong>.</p>

      <div class="patchstack-program-comparison__grid">
        <div class="patchstack-program-comparison__card">
          <strong>Patchstack — September 2026</strong>
          <ul>
            <li><strong>Pricing unit:</strong> monthly contribution share.</li>
            <li><strong>Core formula:</strong> your XP / total community XP × monthly pool, then rejection-rate adjustment.</li>
            <li><strong>Other researchers matter:</strong> more community XP increases the denominator and can reduce the implied cash value of your XP.</li>
            <li><strong>Critical findings:</strong> a report that does not receive a separate high-impact or Zeroday award can still remain inside the relative monthly pool.</li>
            <li><strong>Price discovery:</strong> the final value of a report cannot be known from that report alone because monthly total XP and rejection rate also matter.</li>
          </ul>
          <p><a href="https://patchstack.com/articles/bug-bounty-guidelines-rules/" target="_blank" rel="noopener noreferrer">Patchstack September 2026 rules →</a></p>
        </div>

        <div class="patchstack-program-comparison__card">
          <strong>Wordfence — per-vulnerability model</strong>
          <ul>
            <li><strong>Pricing unit:</strong> the individual vulnerability.</li>
            <li><strong>Estimator:</strong> Wordfence provides a bounty estimator so researchers can estimate a finding before submission.</li>
            <li><strong>Other researchers do not dilute the bounty:</strong> unrelated submissions do not create a community-wide denominator that reduces your accepted report's base payout.</li>
            <li><strong>Published upside:</strong> up to $31,200 for Standard Researchers and $32,760 for 1337 Researchers, plus documented bonuses.</li>
            <li><strong>Quality control:</strong> repeated false positives can lead to throttling or bans, but the published model does not apply a monthly rejection-percentage haircut to already accepted individual bounties.</li>
          </ul>
          <p><a href="https://www.wordfence.com/threat-intel/bug-bounty-program/" target="_blank" rel="noopener noreferrer">Wordfence Bug Bounty Program →</a></p>
        </div>
      </div>

      <p class="patchstack-program-comparison__evidence"><strong>A concrete 2026 example:</strong> Wordfence publicly documented an unauthenticated account-takeover vulnerability in TranslatePress, affecting more than <strong>400,000 active installations</strong>, with a disclosed bounty of <strong>$975</strong>. The exact amount is not presented here as a universal benchmark; it is useful because the reader can see a real vulnerability, its affected install base, and the individual bounty attached to it. <a href="https://www.wordfence.com/blog/2026/08/400000-wordpress-sites-affected-by-account-takeover-vulnerability-in-translatepress-wordpress-plugin/" target="_blank" rel="noopener noreferrer">See the Wordfence disclosure →</a></p>

      <p>Wordfence has even described its design choice explicitly: its security report says it chose <strong>cash bounties per vulnerability</strong> and criticized competition-based approaches for inadequately rewarding all researchers and encouraging bulk hunting. That is Wordfence's own characterization, not an independent neutral judgment — but it makes the contrast unusually clear. <a href="https://www.wordfence.com/wp-content/uploads/2025/04/2024-Annual-WordPress-Security-Report-by-Wordfence.pdf" target="_blank" rel="noopener noreferrer">Wordfence security report →</a></p>

      <p><strong>This is what I mean by fairer price discovery.</strong> Wordfence can still reject duplicates, enforce scope, and punish low-quality reporting. But an accepted vulnerability is fundamentally priced as <em>that vulnerability</em>. Its bounty is not automatically diluted because unrelated researchers happened to produce more valid reports during the same month. For a researcher deciding whether a difficult WordPress finding is worth days of work, that is a materially cleaner bargain.</p>
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