document.addEventListener('DOMContentLoaded', () => {
  const targetPath = '/academy/patchstack-vulnerability-research-economics/';
  if (window.location.pathname !== targetPath) return;

  const article = document.querySelector('.post-content');
  if (!article) return;

  const firstSection =
    document.getElementById('the-old-bargain-was-simple-find-a-bug-get-paid-for-the-bug') ||
    document.getElementById('the-problem-in-one-sentence');

  if (firstSection && !document.querySelector('.patchstack-article-map')) {
    const map = document.createElement('section');
    map.className = 'patchstack-article-map';
    map.setAttribute('aria-label', 'Article summary');
    map.innerHTML = `
      <p class="patchstack-article-map__eyebrow">The critique in four parts</p>
      <h2 class="patchstack-article-map__title">What Patchstack's model does to researcher economics</h2>
      <p class="patchstack-article-map__lead">The core argument is not about one bad payout. It is about where cost, risk, and pricing power sit.</p>

      <div class="patchstack-article-map__grid">
        <a class="patchstack-article-map__card" href="#before-the-pool-even-matters-duplicate-risk-can-zero-out-the-entire-project">
          <span class="patchstack-article-map__number">01</span>
          <strong>Researchers absorb the downside</strong>
          <span>Correct research can still return $0 because duplicate risk sits almost entirely with the researcher.</span>
        </a>

        <a class="patchstack-article-map__card" href="#patchstack-turned-standard-bounty-hunting-into-a-shared-pool-economy">
          <span class="patchstack-article-map__number">02</span>
          <strong>Even Critical bugs can be economically diluted</strong>
          <span>A Critical finding in a widely installed plugin can still fall into double- or low-triple-digit territory when its monthly XP share is small.</span>
        </a>

        <a class="patchstack-article-map__card" href="#the-pricing-system-is-becoming-a-mini-ctf-of-its-own">
          <span class="patchstack-article-map__number">03</span>
          <strong>Marketing is simple; pricing is not</strong>
          <span>$10K pool, $33K Zeroday, XP and badges are easy to advertise. Expected value takes a rule maze to calculate.</span>
        </a>

        <a class="patchstack-article-map__card" href="#conclusion">
          <span class="patchstack-article-map__number">04</span>
          <strong>The buyer keeps the leverage</strong>
          <span>Researchers fund discovery and QA; Patchstack controls scoring, penalties, eligibility, the denominator, and downstream reuse.</span>
        </a>
      </div>
    `;

    firstSection.before(map);
  }

  if (document.querySelector('.patchstack-critical-payout-risk')) return;

  const criticalHeading = document.getElementById('a-critical-vulnerability-no-longer-guarantees-critical-money');
  if (!criticalHeading) return;

  let nextSection = criticalHeading.nextElementSibling;
  while (nextSection && !/^H[12]$/.test(nextSection.tagName)) {
    nextSection = nextSection.nextElementSibling;
  }

  const risk = document.createElement('aside');
  risk.className = 'patchstack-critical-payout-risk';
  risk.setAttribute('aria-label', 'Critical vulnerability payout risk');
  risk.innerHTML = `
    <p class="patchstack-critical-payout-risk__eyebrow">The uncomfortable consequence</p>
    <h2>A Critical bug can still be priced like a low-end bounty</h2>
    <p>
      Under the contribution-based monthly-pool model described above, severity and install count increase XP, but they do not create a guaranteed cash floor for each vulnerability.
      A Critical report affecting a plugin with hundreds of thousands of active installs can still end up worth only tens or a few hundred dollars if its share of total monthly XP is small.
    </p>
    <div class="patchstack-critical-payout-risk__math">
      <code>0.4% of a $10,000 pool = $40</code>
      <code>1% of a $10,000 pool = $100</code>
      <code>2% of a $10,000 pool = $200</code>
    </div>
    <p>
      The install multiplier helps the report earn more XP, but a large denominator can still compress the payout.
      In other words, a Critical vulnerability affecting 100K, 200K, or 400K+ installations does not automatically receive a "Critical-sized" bounty when it remains in the standard shared-pool path.
    </p>
    <p class="patchstack-critical-payout-risk__note">
      Patchstack also states that high-impact vulnerabilities may be considered for individual bounty rewards, and qualifying Zerodays are priced separately. This is therefore a downside scenario for Critical reports that remain in the standard monthly-pool path, not a claim that every Critical report is paid $40–$200.
    </p>
  `;

  if (nextSection) {
    nextSection.before(risk);
  } else {
    article.append(risk);
  }
});
