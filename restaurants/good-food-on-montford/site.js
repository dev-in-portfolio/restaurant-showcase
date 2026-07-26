document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          links && links.classList.remove('open');
        }
      }
    });
  });

  // Menu filter
  const pills = document.querySelectorAll('.pill');
  const menuItems = document.querySelectorAll('.menu-item');
  const searchInput = document.getElementById('menuSearch');
  const menuNote = document.getElementById('menuNote');
  let activeCategory = 'all';

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visible = 0;

    menuItems.forEach(item => {
      const cat = item.dataset.category;
      const name = item.dataset.name || '';
      const text = item.textContent.toLowerCase();
      const matchCat = activeCategory === 'all' || cat === activeCategory;
      const matchSearch = !query || name.includes(query) || text.includes(query);
      if (matchCat && matchSearch) {
        item.classList.remove('hidden');
        visible++;
      } else {
        item.classList.add('hidden');
      }
    });

    if (menuNote) {
      menuNote.style.display = visible === 0 ? 'block' : 'none';
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
});
