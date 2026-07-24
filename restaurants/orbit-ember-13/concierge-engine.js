/**
 * ORBIT & EMBER — DIGITAL MENU CONCIERGE ENGINE
 * Deterministic recommendation rules engine, canonical tag normalization, natural language parsing, and local save/share.
 */

(function () {
  'use strict';

  class MenuConciergeEngine {
    constructor() {
      this.menuData = [];
      this.currentVersion = "11.0.0";
      this.loadMenuData();
    }

    async loadMenuData() {
      try {
        const resp = await fetch('restaurant.json');
        const data = await resp.json();
        this.menuData = data.menu || [];
      } catch (err) {
        console.warn('Fallback loading menu data:', err);
      }
    }

    // Tag Normalization Mapping
    normalizeTag(inputTag) {
      if (!inputTag) return '';
      const tag = inputTag.toLowerCase().trim();

      // Zero-Proof
      if (['zero-proof', 'zero proof', 'nonalcoholic', 'non-alcoholic', 'spirit-free', 'mocktail'].includes(tag)) return 'zero-proof';
      // Sharing
      if (['shared', 'shareable', 'sharing', 'family style', 'small plates', 'for the table'].includes(tag)) return 'sharing';
      // Main
      if (['main', 'main dish', 'entrée', 'entree', 'focused plate'].includes(tag)) return 'main';
      // Vegetarian
      if (['vegetarian', 'veggie'].includes(tag)) return 'vegetarian';
      // Vegan
      if (['vegan', 'plant-based'].includes(tag)) return 'vegan';
      // Gluten-Conscious
      if (['gluten-conscious', 'gluten free', 'gluten-free', 'gf'].includes(tag)) return 'gluten-conscious';

      return tag;
    }

    // Natural Language Intent Extractor
    parseNaturalLanguageInput(query) {
      if (!query || typeof query !== 'string') return {};
      const q = query.toLowerCase().trim();

      const extracted = {
        flavor: null,
        mealStyle: null,
        dietary: null,
        drinkPref: null,
        service: null
      };

      // Service Intent
      if (q.includes('brunch')) extracted.service = 'brunch';
      else if (q.includes('dessert') || q.includes('after dinner')) extracted.service = 'dessert-after-dinner';
      else if (q.includes('drink') || q.includes('cocktail') || q.includes('bar')) extracted.service = 'drinks-small-plates';
      else extracted.service = 'dinner';

      // Flavor Intent
      if (q.includes('smoky') || q.includes('charred') || q.includes('wood-fired') || q.includes('fire')) extracted.flavor = 'smoky-charred';
      else if (q.includes('bright') || q.includes('herbal') || q.includes('citrus') || q.includes('fresh')) extracted.flavor = 'bright-herbal';
      else if (q.includes('savory') || q.includes('deep') || q.includes('garlic') || q.includes('short rib')) extracted.flavor = 'deep-savory';
      else if (q.includes('comfort') || q.includes('rich') || q.includes('butter') || q.includes('potato')) extracted.flavor = 'rich-comforting';
      else if (q.includes('zero-proof') || q.includes('spirit-free') || q.includes('no alcohol')) extracted.flavor = 'fresh-zero-proof';
      else if (q.includes('sweet') || q.includes('chocolate') || q.includes('cheesecake')) extracted.flavor = 'sweet-bittersweet';

      // Sharing Intent
      if (q.includes('share') || q.includes('small plate') || q.includes('table')) extracted.mealStyle = 'sharing';
      else if (q.includes('main') || q.includes('focused')) extracted.mealStyle = 'focused';

      // Drink Pref
      if (q.includes('zero-proof') || q.includes('no alcohol') || q.includes('spirit-free')) extracted.drinkPref = 'zero-proof-only';
      else if (q.includes('no drink')) extracted.drinkPref = 'none';

      // Dietary Intent
      if (q.includes('vegetarian')) extracted.dietary = 'vegetarian';
      else if (q.includes('vegan')) extracted.dietary = 'vegan';
      else if (q.includes('gluten')) extracted.dietary = 'gluten-conscious';

      return extracted;
    }

    // Deterministic Rule-Based Recommendation Generator
    getRecommendations(prefs) {
      if (!this.menuData || this.menuData.length === 0) return [];

      const { service, mealStyle, flavor, priority, drinkPref, dietary, tableStyle } = prefs;

      // 1. HARD ELIGIBILITY FILTERING
      let eligible = this.menuData.filter(item => {
        if (!item.active) return false;

        // Service period filter
        if (service && service !== 'all') {
          if (!item.servicePeriod.includes(service)) return false;
        }

        // Alcohol Exclusion
        if (drinkPref === 'zero-proof-only') {
          if (item.alcoholStatus === 'contains-alcohol') return false;
        }
        if (drinkPref === 'none' && (item.category === 'cocktail' || item.category === 'zero-proof')) {
          return false;
        }

        // Hard Dietary Exclusions
        if (dietary === 'vegetarian' && !item.dietary.includes('vegetarian')) return false;
        if (dietary === 'vegan' && !item.dietary.includes('vegan')) return false;
        if (dietary === 'no-pork' && item.allergens.includes('pork')) return false;
        if (dietary === 'no-shellfish' && item.allergens.includes('shellfish')) return false;

        return true;
      });

      // 2. WEIGHTED RANKING ENGINE
      const scored = eligible.map(item => {
        let score = 0;

        // Flavor Match
        if (flavor && flavor !== 'open' && item.flavorTags.includes(flavor)) score += 40;

        // Priority / Category Match
        if (priority && priority !== 'flexible') {
          if (priority === 'starter' && item.category === 'starter') score += 30;
          if (priority === 'main' && item.category === 'main') score += 30;
          if (priority === 'shared' && item.sharingTags.includes('shared')) score += 30;
          if (priority === 'brunch' && item.category === 'brunch') score += 30;
          if (priority === 'dessert' && item.category === 'dessert') score += 30;
          if (priority === 'cocktail' && item.category === 'cocktail') score += 30;
          if (priority === 'zero-proof' && item.category === 'zero-proof') score += 30;
        }

        // Meal Style Match
        if (mealStyle && item.mealStyleTags.includes(mealStyle)) score += 20;

        // Table Style Match
        if (tableStyle === 'solo' && item.sharingTags.includes('individual')) score += 10;
        if ((tableStyle === 'friends' || tableStyle === 'group') && item.sharingTags.includes('shared')) score += 15;

        return { item, score };
      });

      // Sort by score descending, tie-break by ID
      scored.sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id));

      // 3. EDITORIAL DIVERSITY FILTERING (Select 2 to 4 items)
      const selected = [];
      const usedCategories = new Set();

      for (let entry of scored) {
        if (selected.length >= 4) break;
        
        // Ensure variety in recommendations
        if (selected.length < 2 || !usedCategories.has(entry.item.category)) {
          selected.push(entry.item);
          usedCategories.add(entry.item.category);
        }
      }

      // Fallback if less than 2 items selected
      if (selected.length < 2 && scored.length >= 2) {
        return scored.slice(0, 3).map(s => s.item);
      }

      return selected;
    }

    // Why-It-Fits Template Generator
    generateWhyItFits(item, prefs) {
      const { flavor, mealStyle, dietary } = prefs;

      if (item.category === 'main' && flavor === 'deep-savory') {
        return "A deeper savory main that matches the slow-cooked direction you selected.";
      }
      if (item.sharingTags.includes('shared') && (flavor === 'smoky-charred' || mealStyle === 'sharing')) {
        return "A fire-driven shared plate that fits the smoky, social direction.";
      }
      if (dietary === 'vegetarian' || item.dietary.includes('vegetarian')) {
        return "A brighter vegetarian option built around seasonal vegetables and herbs.";
      }
      if (item.category === 'brunch') {
        return "A richer brunch plate for the comforting, unhurried direction.";
      }
      if (item.category === 'zero-proof') {
        return "A spirit-free option with the bright, herbal, or bitter character you selected.";
      }
      if (item.category === 'dessert') {
        return "A dessert-led finish built around dark caramel, chocolate, coffee, fruit, or warm spice.";
      }
      return "Selected because it provides alignment with your requested flavor and dining pace.";
    }
  }

  window.menuConciergeEngine = new MenuConciergeEngine();
})();
