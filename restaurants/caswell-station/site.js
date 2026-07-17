// === CASWELL STATION: Site JavaScript ===
(function(){
  // Mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(toggle && navLinks){
    toggle.addEventListener('click',()=>{
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
  }

  // Category filter for menu
  const filterBtns = document.querySelectorAll('.menu-controls button[data-filter]');
  const sections = document.querySelectorAll('.menu-section[data-category]');
  if(filterBtns.length && sections.length){
    filterBtns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        sections.forEach(s=>{
          if(cat==='all' || s.dataset.category===cat){
            s.style.display = 'block';
          } else {
            s.style.display = 'none';
          }
        });
      });
    });
  }

  // Menu search
  const searchInput = document.getElementById('menu-search-input');
  const menuEmpty = document.getElementById('menu-empty');
  if(searchInput){
    searchInput.addEventListener('input',()=>{
      const q = searchInput.value.toLowerCase().trim();
      let anyVisible = false;
      document.querySelectorAll('.menu-row').forEach(row=>{
        const text = row.textContent.toLowerCase();
        const match = !q || text.includes(q);
        row.style.display = match ? 'flex' : 'none';
        if(match) anyVisible = true;
      });
      if(q){
        sections.forEach(s=>s.style.display = 'block');
        filterBtns.forEach(b=>b.classList.remove('active'));
      }
      if(menuEmpty) menuEmpty.hidden = anyVisible;
    });
  }
})();
