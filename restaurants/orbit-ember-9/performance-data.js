// Centralized Performance & Insights Source of Truth & Tracking Engine for Orbit & Ember

const PERFORMANCE_CONFIG = {
  timezone: "America/New_York",
  currency: "USD",
  metrics: {
    sessions: 12450,
    users: 9820,
    primaryConversions: 746,
    conversionRate: "5.99%",
    reservations: 510,
    ordersCompleted: 142,
    privateDiningInquiries: 18,
    giftCardsPurchased: 24,
    emailSignups: 127,
    loyaltyEnrollments: 68
  },
  webVitals: {
    lcp: "1.8s",
    inp: "85ms",
    cls: "0.02",
    status: "Good"
  },
  channels: [
    { name: "Organic Search", percentage: "42%", sessions: 5229, conversions: 313 },
    { name: "Direct Traffic", percentage: "28%", sessions: 3486, conversions: 224 },
    { name: "Social Media", percentage: "16%", sessions: 1992, conversions: 112 },
    { name: "Email & SMS", percentage: "14%", sessions: 1743, conversions: 97 }
  ],
  showcaseNotice: "Orbit & Ember Kitchen + Bar is a fictional restaurant concept created to demonstrate Dark Star Consulting's restaurant branding, menu, photo storytelling, local discovery, trust-building, reservation, ordering, private dining, guest follow-up, loyalty, and performance-reporting services."
};

// Global Analytics Dispatcher
window.OrbitAnalytics = {
  eventLog: [],
  track: function(eventName, properties = {}) {
    const eventPayload = {
      timestamp: new Date().toISOString(),
      event_name: eventName,
      page_path: window.location.pathname,
      device_class: window.innerWidth < 768 ? "mobile" : "desktop",
      properties: properties
    };
    this.eventLog.unshift(eventPayload);
    if (this.eventLog.length > 20) this.eventLog.pop();
    
    // Dispatch custom DOM event for live dashboard listeners
    window.dispatchEvent(new CustomEvent('orbitEventTracked', { detail: eventPayload }));
    console.log('[OrbitAnalytics Tracked]:', eventPayload);
  }
};
