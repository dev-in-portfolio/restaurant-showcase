// === COUNTER-: Site JavaScript ===
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

  // Events category filter
  const filterBtns = document.querySelectorAll('.events-filter button[data-filter]');
  const eventCards = document.querySelectorAll('.event-card[data-category]');
  if(filterBtns.length && eventCards.length){
    filterBtns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        filterBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        eventCards.forEach(card=>{
          if(cat==='all' || card.dataset.category===cat){
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // FAQ accordions via details/summary (native)
})();
