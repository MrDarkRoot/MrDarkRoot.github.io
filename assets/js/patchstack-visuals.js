document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.post-content, .content');
  if (!content) return;

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

      <p>Take a concrete illustration: a <strong>CVSS 9.8</strong> vulnerability affecting a plugin with roughly <strong>600,000 active installs</strong>. Under Patchstack's current XP table, 600K installs sits in the <strong>400K+ active-install band (x6)</strong>. That sounds substantial — but the XP still becomes a <em>relative share</em> of the month's total XP.</p>

      <div class="patchstack-critical-payout-risk__math" aria-label="Illustrative payout shares from a ten-thousand-dollar pool">
        <code>0.5% share → $50</code>
        <code>1% share → $100</code>
        <code>3% share → $300</code>
      </div>

      <p>Those figures are illustrations using the <strong>$10,000 minimum pool</strong>, not predictions of any specific report. The final pool can be larger, the contribution percentage can be higher, rejection adjustments can apply, and Patchstack can choose to award a separate high-impact bounty. The point is narrower: <strong>Critical severity plus hundreds of thousands of installs does not itself guarantee a Critical-sized cash payout when the report remains inside a relative monthly pool.</strong></p>

      <p class="patchstack-critical-payout-risk__note"><a href="" class="patchstack-case-study-placeholder" data-pending="true" aria-disabled="true">Future case study: CVSS 9.8 / 600K+ active installs — write-up pending after public disclosure</a></p>
      <p class="patchstack-critical-payout-risk__note">Rule basis: <a href="https://patchstack.com/articles/bug-bounty-guidelines-rules/" target="_blank" rel="noopener noreferrer">Patchstack Bug Bounty Guidelines & Rules</a> (monthly contribution model, active-install multiplier table, individual high-impact awards, and Zeroday lane).</p>
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
