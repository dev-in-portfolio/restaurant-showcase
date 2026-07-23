// Centralized Business Information Source of Truth for Orbit & Ember Kitchen + Bar

const BUSINESS_INFO = {
  name: "Orbit & Ember Kitchen + Bar",
  legalName: "Orbit & Ember LLC",
  tagline: "Wood-Fired Hearth Cooking & Craft Spirits in Charlotte",
  address: {
    streetAddress: "300 S Tryon St",
    addressLocality: "Charlotte",
    addressRegion: "NC",
    postalCode: "28202",
    addressCountry: "US",
    neighborhood: "South End / Uptown Charlotte",
    formatted: "300 S Tryon St, Charlotte, NC 28202"
  },
  phone: "(704) 555-0198",
  telLink: "tel:+17045550198",
  email: "hospitality@orbitandember.com",
  geo: {
    latitude: 35.2265,
    longitude: -80.8431
  },
  urls: {
    website: "http://localhost:8082/restaurants/orbit-ember-4/",
    menu: "http://localhost:8082/restaurants/orbit-ember-4/menu.html",
    reservation: "http://localhost:8082/restaurants/orbit-ember-4/reserve.html",
    googleMaps: "https://maps.google.com/?q=300+S+Tryon+St,+Charlotte,+NC+28202"
  },
  hours: [
    { day: "Monday", hours: "4:30 PM - 10:00 PM", openHour: 16.5, closeHour: 22.0, service: "Dinner" },
    { day: "Tuesday", hours: "4:30 PM - 10:00 PM", openHour: 16.5, closeHour: 22.0, service: "Dinner" },
    { day: "Wednesday", hours: "4:30 PM - 10:00 PM", openHour: 16.5, closeHour: 22.0, service: "Dinner" },
    { day: "Thursday", hours: "4:30 PM - 10:00 PM", openHour: 16.5, closeHour: 22.0, service: "Dinner" },
    { day: "Friday", hours: "4:30 PM - 11:00 PM", openHour: 16.5, closeHour: 23.0, service: "Dinner & Late Bar" },
    { day: "Saturday", hours: "10:00 AM - 2:30 PM, 4:30 PM - 11:00 PM", openHour: 10.0, closeHour: 23.0, service: "Brunch & Dinner" },
    { day: "Sunday", hours: "10:00 AM - 2:30 PM, 4:30 PM - 9:30 PM", openHour: 10.0, closeHour: 21.5, service: "Brunch & Dinner" }
  ],
  amenities: {
    parking: "Valet parking available at main entrance ($10). Covered parking deck at 300 S Tryon Garage. Metered street parking on Tryon St & 3rd St.",
    transit: "2 blocks from LYNX Blue Line (3rd St / Convention Center Station).",
    patio: "Heated outdoor patio dining available weather permitting.",
    accessibility: "Fully ADA compliant with step-free entrance, elevator access, and accessible restrooms.",
    priceRange: "$$$ (Contemporary Fine Dining)",
    servesCuisine: ["Contemporary American", "Wood-Fired Hearth", "Craft Cocktails"]
  }
};

// Open Now Real-time Status Calculator
function getRealtimeStatus() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[now.getDay()];
  const currentHour = now.getHours() + (now.getMinutes() / 60);

  const todayInfo = BUSINESS_INFO.hours.find(h => h.day === currentDayName);

  if (!todayInfo) return { isOpen: false, text: "Closed Today" };

  if (currentDayName === "Saturday" || currentDayName === "Sunday") {
    // Weekend split: 10am-2:30pm (10.0 to 14.5) OR 4:30pm-11pm/9:30pm
    const isBrunch = currentHour >= 10.0 && currentHour <= 14.5;
    const isDinner = currentHour >= 16.5 && currentHour <= todayInfo.closeHour;
    if (isBrunch) return { isOpen: true, text: "Open Now • Weekend Brunch Service" };
    if (isDinner) return { isOpen: true, text: "Open Now • Wood-Fired Dinner Service" };
    return { isOpen: false, text: `Closed • Next Service: ${currentHour < 10 ? "Brunch at 10:00 AM" : "Dinner at 4:30 PM"}` };
  } else {
    if (currentHour >= todayInfo.openHour && currentHour <= todayInfo.closeHour) {
      return { isOpen: true, text: "Open Now • Wood-Fired Dinner & Bar" };
    }
    return { isOpen: false, text: "Closed Now • Opens Today at 4:30 PM" };
  }
}
