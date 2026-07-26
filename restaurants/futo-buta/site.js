document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Nav Toggle ──
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  });

  // ── Menu Category Filter ──
  const pills = document.querySelectorAll('.category-pill');
  const categories = document.querySelectorAll('.menu-category');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.category;

      categories.forEach(cat => {
        if (filter === 'all' || cat.dataset.category === filter) {
          cat.style.display = '';
        } else {
          cat.style.display = 'none';
        }
      });

      // Also clear search when switching categories
      const searchInput = document.querySelector('.menu-search');
      if (searchInput) {
        searchInput.value = '';
        filterMenuItems('');
      }
    });
  });

  // ── Menu Search ──
  const searchInput = document.querySelector('.menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      // Reset category pills to "all"
      if (query) {
        pills.forEach(p => p.classList.remove('active'));
        const allPill = document.querySelector('.category-pill[data-category="all"]');
        if (allPill) allPill.classList.add('active');
        categories.forEach(cat => cat.style.display = '');
      }

      filterMenuItems(query);
    });
  }

  function filterMenuItems(query) {
    const items = document.querySelectorAll('.menu-item');
    const visibleCategories = {};

    items.forEach(item => {
      const name = item.querySelector('h4')?.textContent.toLowerCase() || '';
      const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
      const match = !query || name.includes(query) || desc.includes(query);
      item.style.display = match ? '' : 'none';

      const cat = item.closest('.menu-category');
      if (cat) {
        const catKey = cat.dataset.category;
        if (!visibleCategories[catKey]) visibleCategories[catKey] = 0;
        if (match) visibleCategories[catKey]++;
      }
    });

    // Hide categories with no visible items
    categories.forEach(cat => {
      const catKey = cat.dataset.category;
      if (query && visibleCategories[catKey] === 0) {
        cat.style.display = 'none';
      }
    });
  }

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80; // Account for fixed nav
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
