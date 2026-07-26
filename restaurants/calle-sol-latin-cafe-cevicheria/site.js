// === CALLE SOL: Site JavaScript ===
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

  // Menu category filter
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

  // Location switcher
  const locTabs = document.querySelectorAll('.loc-tab[data-loc]');
  const locDetails = document.querySelectorAll('.loc-detail');
  if(locTabs.length){
    locTabs.forEach(tab=>{
      tab.addEventListener('click',()=>{
        locTabs.forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});
        tab.classList.add('active');
        tab.setAttribute('aria-selected','true');
        const loc = tab.dataset.loc;
        locDetails.forEach(d=>{
          d.hidden = d.id !== 'loc-'+loc;
        });
        // Update URL hash
        if(loc==='midwood'){
          history.replaceState(null,'','#midwood');
        } else {
          history.replaceState(null,'','#southpark');
        }
      });
    });
    // Check URL hash on load
    const hash = window.location.hash.replace('#','');
    if(hash==='southpark'){
      const sp = document.querySelector('.loc-tab[data-loc="southpark"]');
      if(sp) sp.click();
    }
  }

  // Catering form
  const form = document.getElementById('catering-form');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Thanks! We\'ll be in touch about your event.';
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
