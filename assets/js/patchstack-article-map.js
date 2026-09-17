document.addEventListener('DOMContentLoaded', () => {
  const targetPath = '/academy/patchstack-vulnerability-research-economics/';
  if (window.location.pathname !== targetPath) return;

  const article = document.querySelector('.post-content');
  if (!article || document.querySelector('.patchstack-article-map')) return;

  const firstSection = document.getElementById('the-problem-in-one-sentence');
  if (!firstSection) return;

  const map = document.createElement('section');
  map.className = 'patchstack-article-map';
  map.setAttribute('aria-label', 'Article summary');
  map.innerHTML = `
    <p class="patchstack-article-map__eyebrow">The critique in four parts</p>
    <h2 class="patchstack-article-map__title">What Patchstack's model does to researcher economics</h2>
    <p class="patchstack-article-map__lead">The core argument is not about one bad payout. It is about where cost, risk, and pricing power sit.</p>

    <div class="patchstack-article-map__grid">
      <a class="patchstack-article-map__card" href="#1-duplicate-risk-means-correct-research-can-still-be-worth-0">
        <span class="patchstack-article-map__number">01</span>
        <strong>Researchers absorb the downside</strong>
        <span>Correct research can still return $0 because duplicate risk sits almost entirely with the researcher.</span>
      </a>

      <a class="patchstack-article-map__card" href="#2-the-shared-pool-is-a-cost-control-mechanism-disguised-as-competition">
        <span class="patchstack-article-map__number">02</span>
        <strong>The pool creates downward pricing pressure</strong>
        <span>More community XP can dilute the implied value of each unit of research without requiring per-finding cost to scale linearly.</span>
      </a>

      <a class="patchstack-article-map__card" href="#4-patchstack-made-the-pricing-mechanics-more-complicated-than-they-need-to-be">
        <span class="patchstack-article-map__number">03</span>
        <strong>Marketing is simple; pricing is not</strong>
        <span>$10K pool, $33K Zeroday, XP and badges are easy to advertise. Expected value takes a rule maze to calculate.</span>
      </a>

      <a class="patchstack-article-map__card" href="#the-conclusion-patchstack-has-optimized-vulnerability-acquisition-not-researcher-economics">
        <span class="patchstack-article-map__number">04</span>
        <strong>The buyer keeps the leverage</strong>
        <span>Researchers fund discovery and QA; Patchstack controls scoring, penalties, eligibility, the denominator, and downstream reuse.</span>
      </a>
    </div>
  `;

  firstSection.before(map);
});
