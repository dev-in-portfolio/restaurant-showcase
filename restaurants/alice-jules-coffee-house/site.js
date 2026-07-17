document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupLiveHours();
  setupMoodApothecary();
  setupAlchemistLab();
  setupCoffeeFinder();
});

// Mobile Navigation Toggle
function setupNavigation() {
  const toggleBtn = document.querySelector('.toggle');
  const linksContainer = document.querySelector('.links');

  if (toggleBtn && linksContainer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = linksContainer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }
}

// Live Hours Badge Checker
function setupLiveHours() {
  const statusContainer = document.getElementById('live-status-container');
  if (!statusContainer) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTimeInMinutes = hour * 60 + minute;

  let isOpen = false;
  let hoursStr = "";

  if (day >= 1 && day <= 5) {
    // Weekdays: 6:30 am - 6:00 pm (390 mins to 1080 mins)
    isOpen = (currentTimeInMinutes >= 390 && currentTimeInMinutes < 1080);
    hoursStr = "Mon–Fri: 6:30am–6pm";
  } else {
    // Weekends: 8:00 am - 1:00 pm (480 mins to 780 mins)
    isOpen = (currentTimeInMinutes >= 480 && currentTimeInMinutes < 780);
    hoursStr = "Sat–Sun: 8am–1pm";
  }

  statusContainer.innerHTML = isOpen
    ? `<span class="live-status open"><span class="indicator-dot"></span>Open Now • Coffee is Hot</span>`
    : `<span class="live-status closed"><span class="indicator-dot"></span>Closed • Reopens Early</span>`;
}

// Home Mood Apothecary Widget
function setupMoodApothecary() {
  const moodButtons = document.querySelectorAll('.mood-btn');
  const resultTitle = document.getElementById('prescribed-drink');
  const resultDesc = document.getElementById('prescribed-desc');
  const resultNotes = document.getElementById('prescribed-notes');

  if (!moodButtons.length || !resultTitle) return;

  const prescriptions = {
    fatigued: {
      drink: "The Espresso Elixir",
      desc: "Double-shot hand-pulled espresso with a whisper of brown sugar. Direct, intense, and restorative.",
      notes: "Bitter sweet • Caramelized sugar • Stout density"
    },
    quiet: {
      drink: "Lavender Sage Infusion",
      desc: "Steeped lavender blossoms and white sage, lightly sweetened with wildflower honey. Formulated for contemplation.",
      notes: "Floral • Earthy sage • Sweet honey undertones"
    },
    creative: {
      drink: "Rosemary Rose Mocha",
      desc: "Steamed oat milk, dark chocolate, and organic rosewater, infused with a sprig of fresh griddled rosemary.",
      notes: "Rich cocoa • Subtle floral • Piney rosemary aromatics"
    },
    sunny: {
      drink: "Blended Frozen Cold Brew",
      desc: "Our signature 18-hour cold brew whipped with cream, ice, and sweet vanilla syrup. Cold, thick, and refreshing.",
      notes: "Vanilla sweetness • Smooth coffee finish • Frosted texture"
    }
  };

  moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active classes
      moodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mood = btn.dataset.mood;
      const data = prescriptions[mood];

      if (data) {
        // Transition fade effect
        const parent = resultTitle.closest('.prescription-result');
        if (parent) {
          parent.style.opacity = '0.3';
          parent.style.transform = 'scale(0.98)';
          setTimeout(() => {
            resultTitle.textContent = data.drink;
            resultDesc.textContent = data.desc;
            resultNotes.textContent = data.notes;
            parent.style.opacity = '1';
            parent.style.transform = 'none';
          }, 200);
        }
      }
    });
  });
}

// Alchemist Drink Lab Builder
function setupAlchemistLab() {
  const baseSelect = document.getElementById('choice-1');
  const textureSelect = document.getElementById('choice-2');
  const aromaSelect = document.getElementById('choice-3');
  const buildBtn = document.getElementById('build-plan');
  const summaryText = document.getElementById('summary');
  const resultIcon = document.querySelector('.result-icon');
  const resultHeader = document.querySelector('.result h2');

  const baseLayer = document.getElementById('svg-base-layer');
  const milkLayer = document.getElementById('svg-milk-layer');
  const aromaLayer = document.getElementById('svg-aroma-layer');

  if (!buildBtn || !summaryText) return;

  buildBtn.addEventListener('click', () => {
    const base = baseSelect.value;
    const texture = textureSelect.value;
    const aroma = aromaSelect.value;

    let drinkName = "Apothecary Blend";
    let description = "";
    let icon = "☕";

    // Set colors for layers
    let baseColor = "#5c3d24";  // Default coffee brown
    let milkColor = "#f0e8dc";  // Default milk cream
    let aromaColor = "#c59b27"; // Default gold

    if (base === "Espresso-led") {
      baseColor = "#362517"; // Dark Espresso
      if (texture === "Creamy") {
        drinkName = "Lavender Honey Velvet Latte";
        description = "A warm double shot of espresso layered with thick steamed oat milk and sweet lavender honey syrup.";
        milkColor = "#e8d8e8"; // Lavender tinted cream
        aromaColor = "#a080a0"; // Purple lavender
        icon = "🥛";
      } else if (texture === "Bright") {
        drinkName = "Espresso Tonic Elixir";
        description = "A double shot of espresso poured over ice and sparkling tonic water with a twist of lemon peel.";
        milkColor = "#e0f2fe"; // Bubbling blue tonic
        aromaColor = "#eab308"; // Lemon yellow
        icon = "🍋";
      } else {
        drinkName = "Traditional Cafe Au Lait";
        description = "Our classic bold espresso topped with smooth steamed whole milk. Simple and satisfying.";
        milkColor = "#fffdfa";
        aromaColor = "#d4af37";
        icon = "☕";
      }
    } else if (base === "Cold & refreshing") {
      baseColor = "#735135"; // Lighter cold brew
      if (texture === "Bright") {
        drinkName = "Sparkling Peach Cold Brew";
        description = "Cold brew coffee mixed with peach nectar and club soda over crushed ice. Incredibly refreshing.";
        milkColor = "#fed7aa"; // Peach orange
        aromaColor = "#ea580c";
        icon = "🍑";
      } else if (texture === "Creamy") {
        drinkName = "Salted Caramel Cold Foam";
        description = "Slow-steeped cold brew topped with a thick, velvety layer of salted caramel sweet cold foam.";
        milkColor = "#ffedd5";
        aromaColor = "#b45309";
        icon = "🍮";
      } else {
        drinkName = "Cozy Iced Americano";
        description = "Espresso shots topped with cold water and ice for a rich, bold flavor profile served chilled.";
        milkColor = "#bae6fd"; // Ice water blue
        aromaColor = "#0284c7";
        icon = "🧊";
      }
    } else {
      // Slow-sipped
      baseColor = "#451a03"; // Very dark brew
      if (aroma === "Adventurous") {
        drinkName = "Spiced Rosemary Chai Latte";
        description = "Black tea steeped with cardamoms, cloves, and ginger, finished with steamed milk and fresh rosemary oil.";
        milkColor = "#fef3c7"; // Warm tea yellow
        aromaColor = "#15803d"; // Rosemary green
        icon = "🌿";
      } else {
        drinkName = "Aged Vanilla Pour-Over";
        description = "Slow-drip single origin beans filtered over sweet bourbon vanilla beans for a rich, aromatic finish.";
        milkColor = "#fffbeb";
        aromaColor = "#f59e0b";
        icon = "☕";
      }
    }

    // Apply colors to SVG beaker
    if (baseLayer) {
      baseLayer.style.fill = baseColor;
      baseLayer.classList.add('show');
    }
    if (milkLayer) {
      milkLayer.style.fill = milkColor;
      // Show milk layer if texture is not "Classic"
      if (texture !== "Classic") {
        milkLayer.classList.add('show');
      } else {
        milkLayer.classList.remove('show');
      }
    }
    if (aromaLayer) {
      aromaLayer.style.fill = aromaColor;
      if (aroma !== "Balanced") {
        aromaLayer.classList.add('show');
      } else {
        aromaLayer.classList.remove('show');
      }
    }

    // Update Result Panel text
    if (resultIcon) resultIcon.textContent = icon;
    if (resultHeader) resultHeader.textContent = drinkName;
    summaryText.textContent = description;

    // Toast notification
    showToast(`Alchemical Formula Generated: ${drinkName}`);
  });
}

// Drink / Retail Finder (shop.html)
function setupCoffeeFinder() {
  const options = document.querySelectorAll('.finder-opt');
  const resultDiv = document.getElementById('finderResult');
  const resultTitle = document.getElementById('finderDrink');
  const resultDesc = document.getElementById('finderDesc');

  if (!options.length || !resultDiv) return;

  const selections = { vibe: 'warm', style: 'milky', diet: 'none' };

  const recommendations = {
    warm_black_none: { name: 'Alice’s House Brew', desc: 'Our signature house blend. Clean, honest coffee done right.' },
    warm_black_sugarfree: { name: 'Alice’s House Brew', desc: 'No sugar needed. Our house blend stands on its own.' },
    warm_black_milk: { name: 'Cafe Au Lait', desc: 'House coffee with your choice of almond or coconut milk.' },
    warm_milky_none: { name: 'Cafe Latte', desc: 'Espresso with steamed milk. Smooth, comforting, classic.' },
    warm_milky_sugarfree: { name: 'Creme Brulee Latte', desc: 'Vanilla and caramel, sugar-free. Warm and creamy without the sugar.' },
    warm_milky_milk: { name: 'London Fog', desc: 'Earl Grey tea with vanilla and steamed non-dairy milk.' },
    warm_sweet_none: { name: 'Mr. Darcy', desc: 'English toffee latte. Warm, smooth, and just sweet enough.' },
    warm_sweet_sugarfree: { name: 'Creme Brulee Latte (SF)', desc: 'All the flavor, none of the sugar. Ask for sugar-free vanilla.' },
    warm_sweet_milk: { name: 'Chai Latte', desc: 'Spiced chai with your choice of non-dairy milk. Warm and aromatic.' },
    cool_black_none: { name: 'Iced Alice’s House Brew', desc: 'Our house blend, poured over ice. Refreshing and straightforward.' },
    cool_black_sugarfree: { name: 'Iced Coffee (SF)', desc: 'House brew over ice. No sugar needed.' },
    cool_black_milk: { name: 'Iced Latte (Almond)', desc: 'Espresso with almond milk over ice. Light and refreshing.' },
    cool_milky_none: { name: 'Iced Latte', desc: 'Espresso with cold milk. The cool-down classic.' },
    cool_milky_sugarfree: { name: 'Iced Creme Brulee (SF)', desc: 'Sugar-free vanilla and caramel. Iced and guilt-free.' },
    cool_milky_milk: { name: 'Iced Chai (Coconut)', desc: 'Spiced chai with coconut milk over ice.' },
    cool_sweet_none: { name: 'Chilly Alice', desc: 'Blended drink with your choice of flavor and 2 espresso shots.' },
    cool_sweet_sugarfree: { name: 'Italian Soda (SF)', desc: 'Club soda with sugar-free syrup over ice. Light and bubbly.' },
    cool_sweet_milk: { name: 'Smoothie', desc: 'Your choice of flavor with non-dairy base. Cool and fruity.' },
    bold_black_none: { name: 'Espresso (Double)', desc: 'Two shots of full-flavored espresso. Straight up.' },
    bold_black_sugarfree: { name: 'Bold Roast (Black)', desc: 'Our daily bold roast. Dark, intense, no apologies.' },
    bold_black_milk: { name: 'Cappuccino (Almond)', desc: 'Frothy espresso with almond milk. Bold but balanced.' },
    bold_milky_none: { name: 'Cappuccino', desc: 'Espresso with frothy steamed milk. Bold and velvety.' },
    bold_milky_sugarfree: { name: 'Cafe Mocha (SF)', desc: 'Sugar-free chocolate syrup with espresso and steamed milk.' },
    bold_milky_milk: { name: 'Cafe Mocha (Coconut)', desc: 'Chocolate, espresso, and coconut milk. Bold and dairy-free.' },
    bold_sweet_none: { name: 'White Chocolate Mocha', desc: 'White chocolate syrup with espresso. Bold, sweet, indulgent.' },
    bold_sweet_sugarfree: { name: 'Cafe Mocha (SF)', desc: 'Sugar-free chocolate. All the bold, none of the sugar.' },
    bold_sweet_milk: { name: 'White Chocolate Mocha (Almond)', desc: 'White chocolate and almond milk. Bold and dairy-friendly.' }
  };

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.closest('[data-question]');
      if (!group) return;

      const q = group.getAttribute('data-question');
      const val = opt.getAttribute('data-value');

      group.querySelectorAll('.finder-opt').forEach(b => b.classList.remove('selected'));
      opt.classList.add('selected');
      selections[q] = val;

      const key = `${selections.vibe}_${selections.style}_${selections.diet}`;
      const rec = recommendations[key] || recommendations.warm_milky_none;

      if (resultTitle && resultDesc) {
        resultTitle.textContent = rec.name;
        resultDesc.textContent = rec.desc;
        resultDiv.classList.add('show');
      }
    });
  });
}

// Show toast helper
function showToast(msg) {
  const toast = document.querySelector('.demo-toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}
