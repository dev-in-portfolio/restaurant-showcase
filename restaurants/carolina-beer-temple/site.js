// === CAROLINA BEER TEMPLE: Site JavaScript ===
(function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if(toggle && navLinks){
    toggle.addEventListener('click',()=>{
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded',String(open));
    });
  }

  // Tap list category filter
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
            s.classList.remove('hidden');
          } else {
            s.classList.add('hidden');
          }
        });
      });
    });
  }

  // Tap search
  const searchInput = document.getElementById('tap-search');
  const menuEmpty = document.getElementById('menu-empty');
  if(searchInput){
    searchInput.addEventListener('input',()=>{
      const q = searchInput.value.toLowerCase().trim();
      let anyVisible = false;
      document.querySelectorAll('.menu-row').forEach(row=>{
        const text = row.textContent.toLowerCase();
        const match = !q || text.includes(q);
        row.style.display = match ? '' : 'none';
        if(match) anyVisible = true;
      });
      if(q){
        sections.forEach(s=>s.classList.remove('hidden'));
        filterBtns.forEach(b=>b.classList.remove('active'));
      }
      if(menuEmpty) menuEmpty.hidden = anyVisible;
    });
  }

  // Newsletter form
  const form = document.getElementById('newsletter-form');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Welcome to the Temple! Check your inbox.';
      toast.setAttribute('role','status');
      document.body.appendChild(toast);
      requestAnimationFrame(()=>toast.classList.add('show'));
      setTimeout(()=>{
        toast.classList.remove('show');
        setTimeout(()=>toast.remove(),400);
      },3500);
      form.reset();
    });
  }
})();
