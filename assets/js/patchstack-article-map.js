document.addEventListener('DOMContentLoaded', () => {
  const targetPath = '/academy/patchstack-vulnerability-research-economics/';
  if (window.location.pathname !== targetPath) return;

  const article = document.querySelector('.post-content');
  if (!article || document.querySelector('.patchstack-article-map')) return;

  const firstSection = document.getElementById('the-old-bargain-was-simple-find-a-bug-get-paid-for-the-bug');
  if (!firstSection) return;

  const map = document.createElement('section');
  map.className = 'patchstack-article-map';
  map.setAttribute('aria-label', 'Article summary');
  map.innerHTML = `
    <p class="patchstack-article-map__eyebrow">The article in four parts</p>
    <h2 class="patchstack-article-map__title">What this critique is really about</h2>
    <p class="patchstack-article-map__lead">Four economic risks shape the researcher's side of Patchstack's bounty model.</p>

    <div class="patchstack-article-map__grid">
      <a class="patchstack-article-map__card" href="#before-the-pool-even-matters-duplicate-risk-can-zero-out-the-entire-project">
        <span class="patchstack-article-map__number">01</span>
        <strong>Duplicate risk can erase the payout</strong>
        <span>You can find a real vulnerability, prove it correctly, and still earn $0 because another researcher got there first.</span>
      </a>

      <a class="patchstack-article-map__card" href="#patchstack-turned-standard-bounty-hunting-into-a-shared-pool-economy">
        <span class="patchstack-article-map__number">02</span>
        <strong>The shared pool dilutes research value</strong>
        <span>Your payout depends on your XP relative to everybody else's XP. More supply can make each unit of research worth less.</span>
      </a>

      <a class="patchstack-article-map__card" href="#rejection-penalties-change-the-game-from-bug-hunting-into-portfolio-management">
        <span class="patchstack-article-map__number">03</span>
        <strong>The system shifts risk and QA cost to researchers</strong>
        <span>Rejection penalties, leaderboard pressure, and pre-submission validation make hunters carry more of the downside.</span>
      </a>

      <a class="patchstack-article-map__card" href="#security-researchers-need-to-think-like-businesses">
        <span class="patchstack-article-map__number">04</span>
        <strong>Researchers need to price their labor like a business</strong>
        <span>CVE credit and XP have value, but deep research still has hours, opportunity cost, and alternative buyers.</span>
      </a>
    </div>
  `;

  firstSection.before(map);
});
