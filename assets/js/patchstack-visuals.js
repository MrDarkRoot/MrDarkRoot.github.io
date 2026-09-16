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
