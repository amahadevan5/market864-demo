// Market864 - Demo Data
// Generated from anonymized CRM patterns (2026-02-04)
// NO PII - patterns only

export const williamsWealthConfig = {
  client: {
    name: "Market864",
    location: "Greenville, SC",
    dmaCode: 567,
    dmaName: "Greenville-Spartanburg-Asheville-Anderson",
  },
  tvSpot: {
    station: "WYFF4",
    network: "NBC",
    daypart: "Early Evening News",
    airTime: "4:30 PM",
    frequency: "Weekly",
  },
  advisors: [
    { name: "Brandon Cabaniss", clients: 686, role: "Senior Advisor" },
    { name: "Michael Giordano", clients: 183, role: "TV Lead Specialist" },
    { name: "Jeremy Strickler", clients: 175, role: "Advisor" },
  ],
};

// Real attribution windows based on client feedback
export const attributionWindows = {
  immediate: { minutes: 15, weight: 40, label: "Immediate Response" },
  sameEvening: { hours: 4, weight: 25, label: "Same Evening" },
  nextDay: { hours: 24, weight: 15, label: "Next Day" },
  weekWindow: { days: 7, weight: 10, label: "Within Week", decay: true },
};

// Scoring model based on Market864 parameters
export const scoringRules = [
  { factor: "TV spot time window (15min)", weight: 40, category: "timing" },
  { factor: "TV spot time window (4hr)", weight: 25, category: "timing" },
  { factor: "Geographic match (Greenville DMA)", weight: 30, category: "geo" },
  { factor: 'Source = "Mike Giordano @ WYFF"', weight: 35, category: "source" },
  { factor: "Topic = Retirement Planning", weight: 25, category: "intent" },
  { factor: "Topic = Life Change/Estate", weight: 20, category: "intent" },
  { factor: "Direct navigation (no referrer)", weight: 10, category: "behavior" },
  { factor: "AUM indicator present", weight: 15, category: "qualification" },
];

// KPI metrics derived from real CRM data
export const kpiMetrics = {
  totalContacts: 1535,
  totalClients: 179,
  tvAttributedLeads: 5,
  tvToTier1Conversion: 0.6, // 60% - TV leads become top clients!
  internetLeads2025: 59,
  scBasedContacts: 355,
  
  // Funnel metrics (extrapolated)
  avgMonthlyImpressions: 45000,
  avgWeeklyWebVisits: 120,
  avgMonthlyFormSubmits: 8,
  meetingBookedRate: 0.35,
  clientConversionRate: 0.25,
};

// Geographic distribution from real data
export const geographicBreakdown = [
  { state: "SC", count: 355, percentage: 73.2, inDMA: true },
  { state: "GA", count: 55, percentage: 11.3, inDMA: false },
  { state: "FL", count: 17, percentage: 3.5, inDMA: false },
  { state: "NC", count: 15, percentage: 3.1, inDMA: true },
  { state: "NY", count: 13, percentage: 2.7, inDMA: false },
  { state: "VA", count: 10, percentage: 2.1, inDMA: false },
  { state: "Other", count: 20, percentage: 4.1, inDMA: false },
];

// Source attribution from real data
export const sourceAttribution = [
  { source: "Client Referral", count: 204, percentage: 36.6 },
  { source: "Friends and Family", count: 135, percentage: 24.2 },
  { source: "Internet Lead", count: 61, percentage: 10.9 },
  { source: "Advisor", count: 48, percentage: 8.6 },
  { source: "Networking", count: 46, percentage: 8.3 },
  { source: "COI Referral", count: 29, percentage: 5.2 },
  { source: "TV", count: 5, percentage: 0.9, highlight: true },
  { source: "Other", count: 29, percentage: 5.2 },
];

// Client tier distribution
export const clientTiers = [
  { tier: "Tier 1", count: 70, label: "Top Clients", color: "#10B981" },
  { tier: "Tier 2", count: 20, label: "High Value", color: "#3B82F6" },
  { tier: "Tier 3", count: 21, label: "Growth", color: "#8B5CF6" },
  { tier: "Tier 4", count: 68, label: "Standard", color: "#6B7280" },
];

// Yearly growth trend
export const yearlyGrowth = [
  { year: "2021", contacts: 401 },
  { year: "2022", contacts: 126 },
  { year: "2023", contacts: 189 },
  { year: "2024", contacts: 299 },
  { year: "2025", contacts: 504 },
  { year: "2026", contacts: 16, projected: true },
];

// TV Attribution deep dive
export const tvAttributionDetails = {
  summary: {
    totalTVLeads: 5,
    convertedToTier1: 3,
    conversionRate: "60%",
    primaryAdvisor: "Michael Giordano",
    avgDaysToMeeting: 4.2,
    avgDaysToClient: 38,
  },
  // Anonymized TV lead journey examples
  journeyExamples: [
    {
      id: "tv-001",
      source: "TV",
      created: "2024-10-09",
      state: "SC",
      outcome: "Tier 1 Client",
      daysToMeeting: 3,
      daysToClient: 45,
      touchpoints: ["TV Spot", "Website Visit", "Form Submit", "Call", "Meeting", "Signed"],
    },
    {
      id: "tv-002",
      source: "TV", 
      created: "2024-10-09",
      state: "SC",
      outcome: "Tier 1 Client",
      daysToMeeting: 5,
      daysToClient: 32,
      touchpoints: ["TV Spot", "Direct Call", "Meeting", "Signed"],
    },
    {
      id: "tv-003",
      source: "TV",
      created: "2025-01-03",
      state: "NC",
      outcome: "Tier 1 Client",
      daysToMeeting: 7,
      daysToClient: 28,
      touchpoints: ["TV Spot", "Website Visit", "Form Submit", "Email", "Call", "Meeting", "Signed"],
    },
    {
      id: "tv-004",
      source: "TV",
      created: "2025-01-10",
      state: "NC",
      outcome: "In Progress",
      daysToMeeting: null,
      daysToClient: null,
      touchpoints: ["TV Spot", "Website Visit", "Form Submit"],
    },
    {
      id: "tv-005",
      source: "TV",
      created: "2025-05-13",
      state: "Unknown",
      outcome: "In Progress",
      daysToMeeting: null,
      daysToClient: null,
      touchpoints: ["TV Spot", "Website Visit"],
    },
  ],
};

// Conversion funnel (two-stage as requested)
export const conversionFunnel = {
  stage1: {
    name: "Lead to Meeting",
    stages: [
      { name: "TV Impressions", value: 45000, percentage: 100 },
      { name: "Website Visits", value: 520, percentage: 1.16 },
      { name: "Form Submits", value: 34, percentage: 0.08 },
      { name: "Meetings Booked", value: 12, percentage: 0.03 },
    ],
  },
  stage2: {
    name: "Meeting to Client",
    stages: [
      { name: "Meetings Held", value: 12, percentage: 100 },
      { name: "Proposals Sent", value: 10, percentage: 83.3 },
      { name: "Clients Won", value: 5, percentage: 41.7 },
    ],
  },
};

// Hourly traffic pattern (shows 4:30pm spike)
export const hourlyTrafficPattern = [
  { hour: "6am", visits: 2 },
  { hour: "7am", visits: 5 },
  { hour: "8am", visits: 12 },
  { hour: "9am", visits: 18 },
  { hour: "10am", visits: 15 },
  { hour: "11am", visits: 14 },
  { hour: "12pm", visits: 16 },
  { hour: "1pm", visits: 13 },
  { hour: "2pm", visits: 11 },
  { hour: "3pm", visits: 10 },
  { hour: "4pm", visits: 15 },
  { hour: "4:30pm", visits: 45, tvSpot: true }, // TV spot airs
  { hour: "5pm", visits: 38, tvWindow: true },
  { hour: "6pm", visits: 28, tvWindow: true },
  { hour: "7pm", visits: 22, tvWindow: true },
  { hour: "8pm", visits: 18 },
  { hour: "9pm", visits: 12 },
  { hour: "10pm", visits: 6 },
];

// Demo leads for the lead table (anonymized)
export const recentLeads = [
  {
    id: "lead-001",
    name: "James R.",
    score: 92,
    source: "TV",
    state: "SC",
    topic: "Retirement Planning",
    created: "2026-02-03",
    status: "Meeting Scheduled",
    attributedToTV: true,
    advisor: "Michael Giordano",
    segment: "hot",
    dma: "Greenville DMA",
    time_since_spot: "12 min",
  },
  {
    id: "lead-002", 
    name: "Patricia M.",
    score: 78,
    source: "Internet Lead",
    state: "SC",
    topic: "Estate Planning",
    created: "2026-02-02",
    status: "Contacted",
    attributedToTV: false,
    advisor: "Brandon Cabaniss",
    segment: "warm",
    dma: "Greenville DMA",
    time_since_spot: "N/A",
  },
  {
    id: "lead-003",
    name: "Robert & Susan L.",
    score: 85,
    source: "Client Referral",
    state: "GA",
    topic: "Retirement Planning",
    created: "2026-02-01",
    status: "Meeting Scheduled",
    attributedToTV: false,
    advisor: "Jeremy Strickler",
    segment: "hot",
    dma: "Atlanta DMA",
    time_since_spot: "N/A",
  },
  {
    id: "lead-004",
    name: "Michael T.",
    score: 71,
    source: "TV",
    state: "NC",
    topic: "Investment Review",
    created: "2026-01-30",
    status: "New",
    attributedToTV: true,
    advisor: "Michael Giordano",
    segment: "warm",
    dma: "Greenville DMA",
    time_since_spot: "2 hours",
  },
  {
    id: "lead-005",
    name: "Elizabeth K.",
    score: 65,
    source: "LinkedIn",
    state: "SC",
    topic: "Tax Planning",
    created: "2026-01-28",
    status: "Contacted",
    attributedToTV: false,
    advisor: "Brandon Cabaniss",
    segment: "cool",
    dma: "Greenville DMA",
    time_since_spot: "N/A",
  },
];

// Campaign performance for the campaign table
export const campaignPerformance = [
  {
    id: "camp-001",
    name: "WYFF4 Weekly Spot",
    channel: "TV",
    status: "Active",
    impressions: 45000,
    websiteVisits: 520,
    leads: 5,
    meetings: 3,
    clients: 2,
    cost: 2500,
    cpl: 500,
    cpa: 1250,
    roi: 8.4,
  },
  {
    id: "camp-002",
    name: "Google Search - Retirement",
    channel: "Digital",
    status: "Active", 
    impressions: 12000,
    websiteVisits: 340,
    leads: 8,
    meetings: 2,
    clients: 1,
    cost: 1800,
    cpl: 225,
    cpa: 1800,
    roi: 2.1,
  },
  {
    id: "camp-003",
    name: "Client Referral Program",
    channel: "Referral",
    status: "Active",
    impressions: null,
    websiteVisits: null,
    leads: 12,
    meetings: 6,
    clients: 3,
    cost: 500,
    cpl: 42,
    cpa: 167,
    roi: 24.5,
  },
];

// Topic/intent breakdown
export const topicBreakdown = [
  { topic: "Retirement Planning", leads: 18, percentage: 35, avgScore: 82 },
  { topic: "Estate Planning", leads: 12, percentage: 23, avgScore: 78 },
  { topic: "Investment Review", leads: 10, percentage: 19, avgScore: 71 },
  { topic: "Tax Planning", leads: 7, percentage: 13, avgScore: 68 },
  { topic: "General Inquiry", leads: 5, percentage: 10, avgScore: 55 },
];

// Aliased exports for WilliamsWealthDemo.tsx compatibility
export const metrics = {
  attributed_leads: kpiMetrics.tvAttributedLeads,
  attribution_rate: Math.round(kpiMetrics.tvToTier1Conversion * 100),
  hot_leads: recentLeads.filter(l => l.score >= 80).length,
  conversions: tvAttributionDetails.summary.convertedToTier1,
  conversion_rate: Math.round(kpiMetrics.tvToTier1Conversion * 100),
  total_leads: recentLeads.length,
  meetings_booked: conversionFunnel.stage2.stages[0].value,
  avg_score: Math.round(recentLeads.reduce((a, b) => a + b.score, 0) / recentLeads.length),
  tv_roi: 8.4, // From campaign performance
};

export const weeklySpots = [
  { week: "Jan 6", impressions: 42000, visits: 480, leads: 4, date: "2026-01-06" },
  { week: "Jan 13", impressions: 44000, visits: 510, leads: 5, date: "2026-01-13" },
  { week: "Jan 20", impressions: 46000, visits: 530, leads: 6, date: "2026-01-20" },
  { week: "Jan 27", impressions: 45000, visits: 520, leads: 5, date: "2026-01-27" },
  { week: "Feb 3", impressions: 47000, visits: 550, leads: 7, date: "2026-02-03" },
];

export const attributionSources = sourceAttribution.map(s => ({
  name: s.source,
  value: s.count,
  percentage: s.percentage,
  fill: s.highlight ? '#10B981' : s.source === 'Client Referral' ? '#3B82F6' : 
        s.source === 'Internet Lead' ? '#8B5CF6' : '#6B7280',
  color: s.highlight ? '#10B981' : s.source === 'Client Referral' ? '#3B82F6' : 
         s.source === 'Internet Lead' ? '#8B5CF6' : '#6B7280',
}));

const funnelColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
export const funnel = conversionFunnel.stage1.stages.map((s, i) => ({
  stage: s.name,
  value: s.value,
  percentage: s.percentage,
  color: funnelColors[i] || '#6B7280',
}));

const cityMap: Record<string, string> = {
  SC: 'Greenville',
  GA: 'Atlanta',
  FL: 'Tampa',
  NC: 'Charlotte',
  NY: 'New York',
  VA: 'Richmond',
  Other: 'Various',
};
export const geoBreakdown = geographicBreakdown.map(g => ({
  state: g.state,
  leads: g.count,
  percentage: g.percentage,
  pct: g.percentage,
  inDMA: g.inDMA,
  city: cityMap[g.state] || g.state,
}));

export const hourlyTraffic = hourlyTrafficPattern.map(h => ({
  hour: h.hour,
  visits: h.visits,
  tvSpot: h.tvSpot || false,
  tvWindow: h.tvWindow || false,
}));

// Export all demo data
export const williamsWealthDemo = {
  config: williamsWealthConfig,
  attributionWindows,
  scoringRules,
  kpiMetrics,
  geographicBreakdown,
  sourceAttribution,
  clientTiers,
  yearlyGrowth,
  tvAttributionDetails,
  conversionFunnel,
  hourlyTrafficPattern,
  recentLeads,
  campaignPerformance,
  topicBreakdown,
  // Compatibility aliases
  metrics,
  weeklySpots,
  attributionSources,
  funnel,
  geoBreakdown,
  hourlyTraffic,
};

export default williamsWealthDemo;
