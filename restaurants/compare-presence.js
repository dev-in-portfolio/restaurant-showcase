(function() {
  const presenceUrls = {
    "aj-family-restaurant": "https://www.ajfamilyrestaurantnc.com/",
    "alice-jules-coffee-house": "https://alicejulescoffee.com/",
    "amina": "https://aminaclt.com/",
    "anatolia-cafe-and-cuisine": "https://anatoliacafeandcuisine.com/",
    "bahn-thai": "https://bahnthaicharlotte.com/",
    "bao-and-broth": "https://www.baoandbroth.com/",
    "barts-mart": "https://bartsmartclt.com/",
    "beef-n-bottle": "https://beefandbottle.net/",
    "boudreauxs": "https://boudreauxscharlotte.com/",
    "brooks-sandwich-house": "https://www.instagram.com/brookssandwichhouse/",
    "cafe-south": "https://cafesouthcharlotte.com/",
    "carolina-scoops": "https://carolinascoops.com/",
    "caswell-station": "https://www.caswellstation.com/",
    "cornerstone-pub-grill": "https://cornerstonepubmatthews.com/",
    "curry-gate": "https://currygates.com/",
    "dbs-tavern": "https://thedbstavern.com/",
    "deejai-thai": "https://deejaithai.com/",
    "dish": "https://eatatdish.com/",
    "the-dive-n": "https://thediven.shop/",
    "doans-vietnamese-cuisine": "https://doansvietnamesecuisine.shop/",
    "dolce-osteria": "https://dolce-osteria.com/",
    "doms-dive-bar": "https://domsdiveclt.com/",
    "dukes-grill": "https://dukes-grill.com/",
    "dozo-japanese-american-kitchen": "https://dozoclt.com/",
    "elk-monroe": "https://elkofmonroe.com/",
    "east-74-restaurant": "https://east74restaurant.com/",
    "el-valle-mexican-restaurant": "https://www.elvallerestaurante.com/",
    "enderly-coffee-co": "https://www.enderlycoffee.com/",
    "euro-grill-and-cafe": "https://www.eurogrillcafe.com/",
    "fenians-keep": "https://fenianskeep.com/",
    "flour-shop": "https://www.flourshopfood.com/",
    "food-soul": "https://order.toasttab.com/online/food-for-your-soul-clt-2200-thrift-road",
    "geno-ds-pizza": "https://genods.com/",
    "giddy-goat-coffee-roasters": "https://giddygoat.com/",
    "gotcha-matcha-espresso": "https://gotchamatcha.co/",
    "greys-diner": "https://www.greysdinerclt.com/",
    "gus-restaurant": "https://gusfamilyrestaurant.com/",
    "harpers-cafe": "https://www.harpersrestaurants.com/",
    "hathaways-fried-chicken": "https://www.facebook.com/people/Hathaways-Fried-Chicken/100046569957109/",
    "house-of-leng": "https://www.houseofleng.com/",
    "kits-trackside-crafts": "https://tracksidecrafts.com/",
    "lang-van": "https://www.langvancharlotte.com/",
    "laurel-market": "https://www.laurelmarketdeli.com/",
    "le-kebab-grill": "http://www.lekebabgrill.com/",
    "les-sandwiches-cafe": "https://www.lesbanhmishop.com/",
    "lula-banh-mi-and-bakery": "https://lulabanhmi.com/",
    "machu-picchu": "https://machupicchucharlotte.com/",
    "marias-mexican-restaurant": "https://mariasmexclt.com/",
    "matthews-social-house": "https://matthewssocialhouse.com/",
    "miguels-restaurant": "https://www.miguelscharlotte.com/",
    "mj-donuts": "http://www.facebook.com/pages/Mj-Donuts/109608449075237",
    "palace-monroe": "https://palacerestaurant.net/",
    "picadelis-pub-in-deli": "https://www.picadelis.com/",
    "portrait-gallery": "https://www.pgmatthews.com/",
    "queens-soul": "https://www.instagram.com/qsoulfood/",
    "republica": "https://linktr.ee/republica_clt"
  };

  // Determine current slug from pathname
  const pathParts = window.location.pathname.split('/');
  const restIndex = pathParts.indexOf('restaurants');
  let slug = '';
  if (restIndex !== -1 && pathParts[restIndex + 1]) {
    slug = pathParts[restIndex + 1];
  } else {
    const filtered = pathParts.filter(p => p !== '');
    if (filtered.length > 0) {
      const last = filtered[filtered.length - 1];
      if (last.includes('.')) {
        slug = filtered[filtered.length - 2];
      } else {
        slug = last;
      }
    }
  }

  const targetUrl = presenceUrls[slug];
  if (!targetUrl) return;

  // Insert styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .compare-presence-tab {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%) rotate(-90deg);
      transform-origin: right bottom;
      z-index: 2147483647;
      background: #0d0c0b;
      color: #ffdca3;
      border: 1px solid #ffdca3;
      border-bottom: none;
      padding: 12px 24px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      text-decoration: none;
      box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.45);
      border-radius: 8px 8px 0 0;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      display: inline-block;
      white-space: nowrap;
      margin-right: -1px;
    }
    .compare-presence-tab:hover {
      background: #e8bd72;
      color: #0d0c0b;
      border-color: #ffdca3;
      padding-bottom: 24px;
      text-decoration: none;
    }
    .compare-presence-tab:focus-visible {
      outline: 3px solid #3b82f6;
      outline-offset: 4px;
    }
    @media (max-width: 768px) {
      .compare-presence-tab {
        transform: none;
        top: auto;
        bottom: 20px;
        right: 20px;
        border-radius: 30px;
        padding: 12px 20px;
        font-size: 0.75rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        border: 1px solid #ffdca3;
        margin-right: 0;
      }
      .compare-presence-tab:hover {
        padding-bottom: 12px;
        transform: scale(1.05);
      }
    }
  `;
  document.head.appendChild(style);

  // Insert HTML anchor element dynamically
  const tab = document.createElement('a');
  tab.href = targetUrl;
  tab.target = '_blank';
  tab.rel = 'noopener noreferrer';
  tab.className = 'compare-presence-tab';
  tab.setAttribute('aria-label', 'Compare this showcase site with the current online presence of the restaurant');
  tab.textContent = 'Compare Current Presence';
  document.body.appendChild(tab);
})();
