document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation Toggle
  const toggle = document.querySelector('.toggle');
  const links = document.querySelector('.links');
  if (toggle && links) {
    toggle.onclick = () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    };
  }

  // 2. Dynamic Menu Page Category Filters (menu.html)
  const filterBtns = [...document.querySelectorAll('.filter button')];
  const menuCards = [...document.querySelectorAll('.menu-card')];
  if (filterBtns.length > 0 && menuCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(x => x.classList.remove('on'));
        btn.classList.add('on');

        const filterVal = btn.dataset.f;
        menuCards.forEach(card => {
          if (filterVal === 'all' || card.dataset.g === filterVal) {
            card.hidden = false;
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transition = 'opacity 0.4s ease';
            }, 50);
          } else {
            card.hidden = true;
          }
        });
      };
    });
  }

  // 3. Live Business Hours Open/Closed Dashboard Indicator
  const statusIndicator = document.querySelector('.live-status-indicator');
  if (statusIndicator) {
    function updateOpenStatus() {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const timeDecimal = hour + minute / 60;

      let isOpen = false;
      let statusText = 'Closed';
      let nextOpening = '';

      if (day >= 1 && day <= 5) {
        // Mon-Fri: 6:00 AM - 8:00 PM
        if (timeDecimal >= 6 && timeDecimal < 20) {
          isOpen = true;
          statusText = timeDecimal < 11 ? 'Open Now • Serving Breakfast' : 'Open Now • Serving Lunch & Dinner';
        } else {
          nextOpening = 'Doors open tomorrow at 6:00 AM';
        }
      } else if (day === 6) {
        // Sat: 6:00 AM - 9:00 PM
        if (timeDecimal >= 6 && timeDecimal < 21) {
          isOpen = true;
          statusText = timeDecimal < 11 ? 'Open Now • Serving Saturday Breakfast' : 'Open Now • Serving Saturday Specials';
        } else {
          nextOpening = 'Doors open Sunday at 7:00 AM';
        }
      } else if (day === 0) {
        // Sun: 7:00 AM - 3:00 PM
        if (timeDecimal >= 7 && timeDecimal < 15) {
          isOpen = true;
          statusText = timeDecimal < 11.5 ? 'Open Now • Serving Sunday Brunch' : 'Open Now • Serving Sunday Dinner';
        } else {
          nextOpening = 'Doors open Monday at 6:00 AM';
        }
      }

      const dot = '<span class="indicator-dot"></span> ';
      if (isOpen) {
        statusIndicator.className = 'live-status-indicator open';
        statusIndicator.innerHTML = dot + statusText;
      } else {
        statusIndicator.className = 'live-status-indicator closed';
        statusIndicator.innerHTML = dot + `Closed • ${nextOpening || 'Doors open at 6:00 AM'}`;
      }
    }
    updateOpenStatus();
    setInterval(updateOpenStatus, 30000); // Update every 30 seconds
  }

  // 4. Homepage Mini Guest Slider & Proposal Preview (index.html)
  const homeRange = document.getElementById('home-range');
  const homeCount = document.getElementById('home-count');
  const homePlan = document.getElementById('home-plan');
  const homeCopy = document.getElementById('home-copy');

  function updateHomePlanner() {
    if (!homeRange) return;
    const val = +homeRange.value;
    homeCount.textContent = val;

    if (val < 12) {
      homePlan.textContent = 'Intimate Family Reservation';
      homeCopy.textContent = `Arrange standard table groupings for ${val} guests in our main dining hall.`;
    } else if (val < 40) {
      homePlan.textContent = 'Semi-Private Dining Feast';
      homeCopy.textContent = `Gather ${val} guests with curated Southern family platters in a dedicated section.`;
    } else if (val < 90) {
      homePlan.textContent = 'Spacious Gathering Room';
      homeCopy.textContent = `Private wing seating allocation for ${val} guests with custom buffet coordination.`;
    } else {
      homePlan.textContent = 'Exclusive Restaurant Buyout';
      homeCopy.textContent = `Full restaurant layout blockout for ${val} guests. Custom staffing and catering.`;
    }
  }

  if (homeRange) {
    homeRange.oninput = updateHomePlanner;
    updateHomePlanner();
  }

  // 5. Main Groups Page Guest Count Slider & Details (groups.html)
  const range = document.getElementById('range');
  const count = document.getElementById('count');
  const plan = document.getElementById('plan');
  const copy = document.getElementById('copy');

  function updateGuestCount() {
    if (!range) return;
    const val = +range.value;
    count.textContent = val;

    if (val < 12) {
      plan.textContent = 'Intimate Family Table';
      copy.textContent = `A simple reservation for ${val} guests. We will arrange standard contiguous seating in our main dining hall. Ready for direct coordination.`;
    } else if (val < 40) {
      plan.textContent = 'Semi-Private Social Feast';
      copy.textContent = `Perfect for family celebrations or birthday gatherings of ${val} guests. Includes custom group menu selection, shared table sides, and dedicated staff.`;
    } else if (val < 90) {
      plan.textContent = 'Large Gathering & Buffet';
      copy.textContent = `A planned large gathering for ${val} guests. Requires private hall coordination, custom buffet selection, and coordinated dining offsets.`;
    } else {
      plan.textContent = 'Exclusive Restaurant Buyout';
      copy.textContent = `High-volume custom booking for ${val} guests. Restructure the entire dining layout, custom catering flows, and custom staff allocation.`;
    }
  }

  if (range) {
    range.oninput = updateGuestCount;
    updateGuestCount();
  }

  // 6. Demo Form Inquiry Submission (contact.html / groups.html)
  document.querySelectorAll('[data-demo]').forEach(form => {
    form.onsubmit = e => {
      e.preventDefault();
      const toast = document.querySelector('.toast');
      if (toast) {
        toast.textContent = 'Simulation complete — this is a concept demo, no data was transmitted.';
        toast.classList.add('show');
        form.reset();
        
        // Retrigger ranges to defaults after form reset
        if (range) updateGuestCount();
        if (homeRange) updateHomePlanner();

        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }
    };
  });

  // 7. Interactive Comfort Plate Builder (comfort-plate.html)
  const choiceMeal = document.getElementById('choice-1');
  const choiceMood = document.getElementById('choice-2');
  const choiceTable = document.getElementById('choice-3');
  const buildBtn = document.getElementById('build-plan');
  const summaryText = document.getElementById('summary');
  const resultIcon = document.querySelector('.result-icon');

  const plateSuggestions = {
    // Breakfast
    'Breakfast,Classic,Quick stop': {
      title: 'Monroe Sunrise Plate',
      desc: 'Two scrambled farm eggs, hickory smoked bacon, and griddled hashbrowns with a buttered biscuit.',
      icon: '🍳',
      layers: ['egg', 'bacon', 'toast', 'plate']
    },
    'Breakfast,Classic,Family meal': {
      title: 'Grandma’s Pancake Feast',
      desc: 'Double stack of buttermilk pancakes, scrambled eggs, country ham, and warm maple syrup.',
      icon: '🥞',
      layers: ['egg', 'pancake', 'bacon', 'plate']
    },
    'Breakfast,Classic,Weekend gathering': {
      title: 'Harvest Breakfast Board',
      desc: 'Platter of soft scrambled eggs, pancakes, country ham, home fries, and house-made buttermilk biscuits.',
      icon: '🥓',
      layers: ['egg', 'pancake', 'bacon', 'biscuit', 'plate']
    },
    'Breakfast,Lighter,Quick stop': {
      title: 'Active Morning Oats & Toast',
      desc: 'Warm steel-cut oatmeal with fresh honey, apple slices, and toasted wheat bread.',
      icon: '🥣',
      layers: ['toast', 'salad', 'plate']
    },
    'Breakfast,Lighter,Family meal': {
      title: 'Fresh Start Fruit & Yogurt Bowl',
      desc: 'Creamy Greek yogurt with wild berries, homemade granola, sliced peaches, and honey drizzle.',
      icon: '🍓',
      layers: ['salad', 'plate']
    },
    'Breakfast,Lighter,Weekend gathering': {
      title: 'Monroe Avocado & Egg Board',
      desc: 'Poached eggs over whole grain avocado toast, served with a side of mixed seasonal fruits.',
      icon: '🥑',
      layers: ['egg', 'toast', 'salad', 'plate']
    },
    'Breakfast,Extra comforting,Quick stop': {
      title: 'Smothered Biscuit & Gravy',
      desc: 'Warm split buttermilk biscuit completely smothered in rich, peppered sausage gravy.',
      icon: '🥯',
      layers: ['biscuit', 'gravy', 'plate']
    },
    'Breakfast,Extra comforting,Family meal': {
      title: 'Country Sausage & Biscuit Skillet',
      desc: 'Two split biscuits with sausage patties, scrambled eggs, and dynamic sausage gravy.',
      icon: '🍳',
      layers: ['egg', 'biscuit', 'gravy', 'bacon', 'plate']
    },
    'Breakfast,Extra comforting,Weekend gathering': {
      title: 'AJ’s Ultimate Morning Skillet',
      desc: 'Buttermilk pancakes, eggs, crispy bacon, sausage, home fries, and biscuits smothered in hot pepper gravy.',
      icon: '🥞',
      layers: ['egg', 'pancake', 'bacon', 'biscuit', 'gravy', 'plate']
    },

    // Lunch
    'Lunch,Classic,Quick stop': {
      title: 'Pimento Cheese BLT Sandwich',
      desc: 'House-made pimento cheese, crispy bacon, lettuce, and ripe tomatoes on toasted sourdough with fries.',
      icon: '🥪',
      layers: ['toast', 'bacon', 'salad', 'plate']
    },
    'Lunch,Classic,Family meal': {
      title: 'Southern Fried Chicken Tender Basket',
      desc: 'Buttermilk marinated hand-breaded chicken tenders served with crinkle-cut fries, coleslaw, and honey mustard.',
      icon: '🍗',
      layers: ['chicken', 'salad', 'plate']
    },
    'Lunch,Classic,Weekend gathering': {
      title: 'Monroe Picnic Platter',
      desc: 'Assortment of mini pimento BLTs, hand-breaded chicken tenders, French fries, and sweet coleslaw.',
      icon: '🧺',
      layers: ['chicken', 'toast', 'salad', 'plate']
    },
    'Lunch,Lighter,Quick stop': {
      title: 'Garden Salad & Squash Soup',
      desc: 'Crisp romaine with tomatoes and cucumbers, served with a cup of warm, homemade seasonal squash soup.',
      icon: '🥗',
      layers: ['salad', 'plate']
    },
    'Lunch,Lighter,Family meal': {
      title: 'Grilled Chicken Garden Salad',
      desc: 'Herb-grilled chicken breast sliced over fresh garden greens with cucumbers, carrots, tomatoes, and balsamic dressing.',
      icon: '🥗',
      layers: ['chicken', 'salad', 'plate']
    },
    'Lunch,Lighter,Weekend gathering': {
      title: 'Fresh Harvest Chicken Salad Plate',
      desc: 'Scoops of our house-made chicken salad over organic greens, served with fruit skewers and sliced avocados.',
      icon: '🥑',
      layers: ['chicken', 'salad', 'plate']
    },
    'Lunch,Extra comforting,Quick stop': {
      title: 'Country Fried Steak Burger',
      desc: 'Crispy fried beef patty with lettuce, tomato, and country gravy on a buttered brioche bun, served with mashed potatoes.',
      icon: '🍔',
      layers: ['chicken', 'toast', 'gravy', 'plate']
    },
    'Lunch,Extra comforting,Family meal': {
      title: 'Open-Face Roast Beef Sandwich',
      desc: 'Tender roast beef over sliced white bread, piled high with creamy mashed potatoes and smothered in brown gravy.',
      icon: '🥩',
      layers: ['toast', 'steak', 'gravy', 'plate']
    },
    'Lunch,Extra comforting,Weekend gathering': {
      title: 'AJ’s Southern Comfort Sampler',
      desc: 'Tasting portion of country fried steak, pimento cheese bites, french fries, and gravy-covered biscuits.',
      icon: '🍽️',
      layers: ['chicken', 'biscuit', 'gravy', 'plate']
    },

    // Dinner
    'Dinner,Classic,Quick stop': {
      title: 'Slow-Braised Pot Roast Plate',
      desc: 'Tender pot roast with glazed carrots and celery, served over a bed of buttery mashed potatoes.',
      icon: '🥩',
      layers: ['steak', 'salad', 'plate']
    },
    'Dinner,Classic,Family meal': {
      title: 'Buttermilk Fried Chicken Dinner',
      desc: 'Three pieces of crispy fried chicken (breast, thigh, wing) with mashed potatoes, brown gravy, and green beans.',
      icon: '🍗',
      layers: ['chicken', 'gravy', 'salad', 'plate']
    },
    'Dinner,Classic,Weekend gathering': {
      title: 'AJ Family Sunday Roast Platter',
      desc: 'Family portion of slow-braised pot roast, crispy fried chicken, glazed carrots, green beans, and mashed potatoes.',
      icon: '🍲',
      layers: ['steak', 'chicken', 'gravy', 'salad', 'plate']
    },
    'Dinner,Lighter,Quick stop': {
      title: 'Pan-Seared Rainbow Trout',
      desc: 'Fresh trout fillet pan-seared with lemon herb butter, served with steamed broccoli and herbed brown rice.',
      icon: '🐟',
      layers: ['salad', 'plate']
    },
    'Dinner,Lighter,Family meal': {
      title: 'Grilled Salmon & Seasonal Asparagus',
      desc: 'Wild-caught salmon fillet grilled with lemon-dill glaze, served with charred asparagus and garden salad.',
      icon: '🐟',
      layers: ['salad', 'plate']
    },
    'Dinner,Lighter,Weekend gathering': {
      title: 'Monroe Grilled Fish Platter',
      desc: 'Pan-seared trout and grilled salmon fillets served family-style with steamed broccoli, asparagus, and garden greens.',
      icon: '🥗',
      layers: ['salad', 'plate']
    },
    'Dinner,Extra comforting,Quick stop': {
      title: 'Country Fried Steak & Potatoes',
      desc: 'Crispy hand-breaded country fried steak covered in rich white cream gravy, served with mashed potatoes.',
      icon: '🥩',
      layers: ['chicken', 'gravy', 'plate']
    },
    'Dinner,Extra comforting,Family meal': {
      title: 'Ultimate Southern Comfort Dinner',
      desc: 'Country fried steak and buttermilk fried chicken served with mashed potatoes, white gravy, and collard greens.',
      icon: '🍗',
      layers: ['chicken', 'gravy', 'salad', 'plate']
    },
    'Dinner,Extra comforting,Weekend gathering': {
      title: 'AJ’s Grand Family Feast',
      desc: 'Large sharing platter of pot roast, country fried steak, sausage-gravy biscuits, collard greens, mashed potatoes, and warm peach cobbler.',
      icon: '🥧',
      layers: ['steak', 'chicken', 'biscuit', 'gravy', 'cobbler', 'plate']
    }
  };

  function updateComfortPlate() {
    if (!choiceMeal || !choiceMood || !choiceTable) return;

    const key = `${choiceMeal.value},${choiceMood.value},${choiceTable.value}`;
    const suggestion = plateSuggestions[key];

    if (suggestion) {
      resultIcon.textContent = suggestion.icon;
      summaryText.innerHTML = `
        <strong>${suggestion.title}</strong><br>
        ${suggestion.desc}
      `;

      document.querySelectorAll('.food-layer').forEach(layer => {
        layer.classList.remove('show');
      });

      suggestion.layers.forEach(layerId => {
        const el = document.getElementById(`food-${layerId}`);
        if (el) {
          el.classList.add('show');
        }
      });
    }
  }

  if (buildBtn) {
    buildBtn.addEventListener('click', updateComfortPlate);
    updateComfortPlate();
  }
});