// === CAJUN QUEEN: Site JavaScript ===
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
      // Show all sections when searching
      if(q){
        sections.forEach(s=>s.classList.remove('hidden'));
        filterBtns.forEach(b=>b.classList.remove('active'));
      }
      if(menuEmpty) menuEmpty.hidden = anyVisible;
    });
  }

  // Night selector (Live Jazz page)
  const nightData = {
    monday:{title:'Monday Night',desc:'Solo piano in the upstairs room. Intimate, relaxed, perfect for a quiet dinner and conversation.',time:'5:00 PM – 8:00 PM',vibe:'Intimate & Relaxed'},
    tuesday:{title:'Tuesday Night',desc:'Jazz trio brings a fuller sound. Standards and originals in a warm, inviting atmosphere.',time:'5:00 PM – 8:30 PM',vibe:'Warm & Sophisticated'},
    wednesday:{title:'Wednesday Night',desc:'Jazz trio with guest musicians. Expect the unexpected—every Wednesday is a little different.',time:'5:00 PM – 8:30 PM',vibe:'Eclectic & Fun'},
    thursday:{title:'Thursday Night',desc:'Full Dixieland band takes the stage. The energy picks up, the room fills, and the music swings.',time:'5:00 PM – 8:30 PM',vibe:'Lively & Energetic'},
    friday:{title:'Friday Night',desc:'Full band, full energy. The best night for jazz lovers who want the complete Cajun Queen experience.',time:'5:00 PM – 9:00 PM',vibe:'Electric & Celebratory'},
    saturday:{title:'Saturday Night',desc:'Full band with extended sets. The crown jewel of the week—arrive early, stay late.',time:'5:00 PM – 9:00 PM',vibe:'Unforgettable'},
    sunday:{title:'Sunday Jazz Brunch',desc:'Jazz brunch with Creole classics. Fried chicken, shrimp & grits, and mimosas to live music.',time:'11:00 AM – 8:00 PM',vibe:'Relaxed & Soulful'}
  };
  const nightBtns = document.querySelectorAll('.night-btn[data-night]');
  const nightTitle = document.getElementById('night-title');
  const nightDesc = document.getElementById('night-desc');
  const nightTime = document.getElementById('night-time');
  const nightVibe = document.getElementById('night-vibe');
  if(nightBtns.length){
    nightBtns.forEach(btn=>{
      btn.addEventListener('click',()=>{
        nightBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const data = nightData[btn.dataset.night];
        if(data && nightTitle){
          nightTitle.textContent = data.title;
          nightDesc.textContent = data.desc;
          nightTime.innerHTML = '&#128337; ' + data.time;
          nightVibe.innerHTML = '&#127796; ' + data.vibe;
        }
      });
    });
  }

  // Contact form
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Thanks! We\'ll be in touch soon.';
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
