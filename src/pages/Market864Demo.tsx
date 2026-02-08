/**
 * Market864 - Demo Dashboard
 * Shows what the attribution system would look like with their data
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
  ReferenceLine, ReferenceArea
} from 'recharts';
import { Tv, Users, Target, TrendingUp, Clock, Flame, ThermometerSun, DollarSign, X, Phone, Mail, Sun, Moon } from 'lucide-react';
import * as demo from '../data/williamsWealthDemo';
import { useToast } from '../components/ToastProvider';

type TabId = 'overview' | 'leads' | 'tv' | 'alerts';
const VALID_TABS: TabId[] = ['overview', 'leads', 'tv', 'alerts'];

function getInitialTab(): TabId {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab') as TabId;
  return VALID_TABS.includes(tab) ? tab : 'overview';
}

export function Market864Demo() {
  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // CSS defaults body to .dark — ensure <html> matches
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
    return 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark');
      document.body.classList.toggle('dark');
      return next;
    });
  }, []);

  const switchTab = useCallback((tab: TabId) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    history.replaceState(null, '', url.toString());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Tv className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Market864</h1>
                  <p className="text-sm text-muted-foreground">TV Attribution Dashboard • WYFF4 Campaign</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium dark:bg-green-900/30 dark:text-green-400">
                Live Demo
              </span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 -mb-px">
            {[
              { id: 'overview' as TabId, label: 'Overview' },
              { id: 'leads' as TabId, label: 'Leads' },
              { id: 'tv' as TabId, label: 'TV Performance' },
              { id: 'alerts' as TabId, label: 'Alerts' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-background text-foreground border border-border border-b-background -mb-px'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'leads' && <LeadsTab />}
        {activeTab === 'tv' && <TVPerformanceTab />}
        {activeTab === 'alerts' && <AlertsTab />}
      </div>
    </div>
  );
}

function OverviewTab() {
  const showToast = useToast();
  const [projectedLeads, setProjectedLeads] = useState(demo.kpiMetrics.tvAttributedLeads);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="TV Attributed Leads"
          value={demo.metrics.attributed_leads}
          subtitle={`${demo.metrics.attribution_rate}% attribution rate`}
          icon={<Tv className="w-5 h-5" />}
          trend={+12}
        />
        <KPICard
          title="Hot Leads"
          value={demo.metrics.hot_leads}
          subtitle="Score 80+"
          icon={<Flame className="w-5 h-5" />}
          trend={+25}
        />
        <KPICard
          title="New Clients"
          value={demo.metrics.conversions}
          subtitle={`${demo.metrics.conversion_rate}% conversion`}
          icon={<Users className="w-5 h-5" />}
          trend={+50}
        />
        <KPICard
          title="TV ROI"
          value={`${demo.metrics.tv_roi}x`}
          subtitle="Return on TV spend"
          icon={<DollarSign className="w-5 h-5" />}
          trend={+18}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Performance */}
        <div className="lg:col-span-2 bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly TV Spot Performance</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={demo.weeklySpots}>
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="visits" name="Website Visits" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="leads" name="TV Attributed Leads" fill="#5A9BD5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attribution Sources */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={demo.attributionSources}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
              >
                {demo.attributionSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {demo.attributionSources.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground truncate max-w-[120px]">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic After TV Spot */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold mb-1">Traffic After TV Spot</h3>
          <p className="text-sm text-muted-foreground mb-4">Website visits spike within the attribution window after 4:30pm airing</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={demo.hourlyTraffic}>
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <ReferenceArea x1="4:30pm" x2="7pm" fill="#5A9BD5" fillOpacity={0.08} />
              <ReferenceLine x="4:30pm" stroke="#5A9BD5" strokeDasharray="4 4" label={{ value: 'TV Spot', position: 'top', fontSize: 11, fill: '#5A9BD5' }} />
              <Area type="monotone" dataKey="visits" name="Visits" stroke="#5A9BD5" fill="#5A9BD5" fillOpacity={0.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Attribution Funnel</h3>
          <div className="space-y-2">
            {demo.funnel.map((item, _) => {
              const maxValue = demo.funnel[0].value;
              const widthPercent = Math.max(15, (item.value / maxValue) * 100);
              return (
                <div key={item.stage} className="relative">
                  <div
                    className="h-8 rounded flex items-center justify-between px-3 text-white text-sm"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: item.color,
                      minWidth: '150px',
                    }}
                  >
                    <span className="truncate">{item.stage}</span>
                    <span className="font-bold">{item.value.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Latest Hot Lead */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Latest Hot Lead</h3>
          <span className="text-sm text-muted-foreground">22 minutes ago</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30">
            <span className="text-3xl font-bold text-green-600">94</span>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold">Robert Anderson</h4>
            <p className="text-muted-foreground">Topic: Retirement Planning</p>
            <p className="text-sm text-muted-foreground mt-1">
              Source: Mike Giordano @ WYFF News 4 • Greenville, SC
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => showToast('Calling Robert Anderson...')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
              >
                Call Now
              </button>
              <button
                onClick={() => showToast('Opening CRM record...')}
                className="px-4 py-2 border border-border rounded-lg text-sm font-medium"
              >
                View in CRM
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Time since TV spot:</p>
            <p className="text-2xl font-bold text-primary">22 min</p>
            <p className="text-xs text-green-600 mt-1">Within attribution window</p>
          </div>
        </div>
      </div>

      {/* ROI Projection Panel */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold mb-1">What If You Captured More TV Leads?</h3>
        <p className="text-sm text-muted-foreground mb-5">TV Attribution Opportunity</p>

        <div className="mb-6">
          <label className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Monthly TV-attributed leads</span>
            <span className="text-2xl font-bold text-primary">{projectedLeads}</span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={projectedLeads}
            onChange={(e) => setProjectedLeads(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">
              {Math.round(projectedLeads * demo.kpiMetrics.tvToTier1Conversion) * 12}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Projected Tier 1 Clients/Year</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">
              {(projectedLeads / demo.kpiMetrics.tvAttributedLeads).toFixed(1)}x
            </p>
            <p className="text-xs text-muted-foreground mt-1">Capture Improvement</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold">60%</p>
            <p className="text-xs text-muted-foreground mt-1">TV→Tier 1 Rate</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Based on your CRM data: 60% of TV-attributed leads convert to Tier 1 clients, vs. 12.6% average across all sources.
        </p>
      </div>
    </div>
  );
}

type SegmentFilter = 'all' | 'hot' | 'warm' | 'cool';
type SourceFilter = 'all' | 'TV' | 'Internet' | 'Referral' | 'Other';
type SortBy = 'score-desc' | 'score-asc' | 'newest' | 'oldest';

const CATEGORY_COLORS: Record<string, string> = {
  timing: '#3B82F6',
  geo: '#10B981',
  source: '#059669',
  intent: '#8B5CF6',
  behavior: '#F59E0B',
  qualification: '#EC4899',
};

function LeadsTab() {
  const showToast = useToast();
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('score-desc');
  const [selectedLead, setSelectedLead] = useState<typeof demo.recentLeads[0] | null>(null);

  const filteredLeads = useMemo(() => {
    let leads = [...demo.recentLeads];

    if (segmentFilter !== 'all') {
      leads = leads.filter((l) => l.segment === segmentFilter);
    }
    if (sourceFilter !== 'all') {
      if (sourceFilter === 'Internet') {
        leads = leads.filter((l) => l.source === 'Internet Lead' || l.source === 'LinkedIn');
      } else if (sourceFilter === 'Referral') {
        leads = leads.filter((l) => l.source === 'Client Referral');
      } else if (sourceFilter === 'Other') {
        leads = leads.filter((l) => !['TV', 'Internet Lead', 'LinkedIn', 'Client Referral'].includes(l.source));
      } else {
        leads = leads.filter((l) => l.source === sourceFilter);
      }
    }

    leads.sort((a, b) => {
      switch (sortBy) {
        case 'score-desc': return b.score - a.score;
        case 'score-asc': return a.score - b.score;
        case 'newest': return new Date(b.created).getTime() - new Date(a.created).getTime();
        case 'oldest': return new Date(a.created).getTime() - new Date(b.created).getTime();
        default: return 0;
      }
    });

    return leads;
  }, [segmentFilter, sourceFilter, sortBy]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedLead) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [selectedLead]);

  // Close modal on Escape
  useEffect(() => {
    if (!selectedLead) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedLead(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedLead]);

  const clearFilters = () => {
    setSegmentFilter('all');
    setSourceFilter('all');
    setSortBy('score-desc');
  };

  const hasFilters = segmentFilter !== 'all' || sourceFilter !== 'all';

  return (
    <div className="space-y-4">
      {/* Segment Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { segment: 'Hot', count: 8, icon: <Flame className="w-4 h-4" />, color: 'text-red-500' },
          { segment: 'Warm', count: 12, icon: <ThermometerSun className="w-4 h-4" />, color: 'text-orange-500' },
          { segment: 'Nurture', count: 8, icon: <Clock className="w-4 h-4" />, color: 'text-blue-500' },
          { segment: 'Cold', count: 3, icon: <Target className="w-4 h-4" />, color: 'text-gray-500' },
        ].map(({ segment, count, icon, color }) => (
          <div key={segment} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
            <span className={color}>{icon}</span>
            <div>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-sm text-muted-foreground">{segment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Segment:</span>
          <div className="flex flex-wrap gap-1">
            {(['all', 'hot', 'warm', 'cool'] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setSegmentFilter(seg)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  segmentFilter === seg
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {seg === 'all' ? 'All' : seg.charAt(0).toUpperCase() + seg.slice(1)}
              </button>
            ))}
          </div>

          <span className="text-border">|</span>

          <span className="text-sm font-medium text-muted-foreground">Source:</span>
          <div className="flex flex-wrap gap-1">
            {(['all', 'TV', 'Internet', 'Referral', 'Other'] as const).map((src) => (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  sourceFilter === src
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {src === 'all' ? 'All' : src}
              </button>
            ))}
          </div>

          <span className="text-border">|</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="text-xs bg-muted border border-border rounded px-2 py-1 text-foreground"
          >
            <option value="score-desc">Score: High → Low</option>
            <option value="score-asc">Score: Low → High</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            Showing {filteredLeads.length} of {demo.recentLeads.length} leads
          </span>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Lead Cards */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <p className="text-muted-foreground">No leads match your filters.</p>
            <button onClick={clearFilters} className="text-sm text-primary hover:underline mt-2">
              Clear filters
            </button>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className="bg-card rounded-lg shadow-sm border border-border p-4 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-14 h-14 rounded-lg font-bold text-lg ${
                  lead.score >= 80 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                  lead.score >= 60 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-800'
                }`}>
                  {lead.score}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{lead.name}</h4>
                    {lead.segment === 'hot' && <Flame className="w-4 h-4 text-red-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.topic}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{lead.source}</span>
                    <span>•</span>
                    <span>{lead.dma}</span>
                    <span>•</span>
                    <span>{lead.time_since_spot} after spot</span>
                  </div>
                  {lead.confidence != null && (
                    <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                      lead.confidence >= 0.7
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : lead.confidence >= 0.4
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      <Tv className="w-3 h-3" />
                      TV {Math.round(lead.confidence * 100)}%
                    </span>
                  )}
                </div>
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => showToast(`Calling ${lead.name}...`)}
                    className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm"
                  >
                    Call
                  </button>
                  <button
                    onClick={() => showToast(`Opening email draft for ${lead.name}...`)}
                    className="px-3 py-1.5 border border-border rounded text-sm"
                  >
                    Email
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}
    </div>
  );
}

function LeadDetailModal({ lead, onClose }: { lead: typeof demo.recentLeads[0]; onClose: () => void }) {
  const showToast = useToast();

  // Determine applicable scoring rules based on lead properties
  const applicableRules = useMemo(() => {
    const rules: Array<typeof demo.scoringRules[0] & { active: boolean }> = demo.scoringRules.map((rule) => {
      let active = false;
      if (rule.category === 'timing' && lead.attributedToTV) {
        if (rule.factor.includes('15min') && lead.time_since_spot.includes('min')) active = true;
        if (rule.factor.includes('4hr') && lead.attributedToTV) active = true;
      }
      if (rule.category === 'geo' && lead.dma === 'Greenville DMA') active = true;
      if (rule.category === 'source' && lead.source === 'TV') active = true;
      if (rule.category === 'intent') {
        if (rule.factor.includes('Retirement') && lead.topic === 'Retirement Planning') active = true;
        if (rule.factor.includes('Estate') && lead.topic === 'Estate Planning') active = true;
      }
      if (rule.category === 'behavior') active = lead.attributedToTV;
      if (rule.category === 'qualification') active = lead.score >= 80;
      return { ...rule, active };
    });
    return rules;
  }, [lead]);

  // Find matching journey for TV leads
  const journey = useMemo(() => {
    if (!lead.attributedToTV) return null;
    return demo.tvAttributionDetails.journeyExamples.find((j) => j.state === lead.state) || null;
  }, [lead]);

  const segmentLabel = lead.score >= 80 ? 'Hot' : lead.score >= 60 ? 'Warm' : 'Cool';
  const segmentColor = lead.score >= 80 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    : lead.score >= 60 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';

  const maxWeight = Math.max(...demo.scoringRules.map((r) => r.weight));

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />
      <div
        className="relative bg-card border border-border rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 rounded-t-xl flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-16 h-16 rounded-full font-bold text-2xl ${
              lead.score >= 80 ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
              lead.score >= 60 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
              'bg-gray-100 text-gray-600 dark:bg-gray-800'
            }`}>
              {lead.score}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{lead.name}</h2>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${segmentColor}`}>
                  {segmentLabel}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{lead.topic} • {lead.status}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Advisor</p>
              <p className="text-sm font-medium">{lead.advisor}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">DMA</p>
              <p className="text-sm font-medium">{lead.dma}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Source</p>
              <p className="text-sm font-medium">{lead.source}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time Since Spot</p>
              <p className="text-sm font-medium">{lead.time_since_spot}</p>
            </div>
          </div>

          {/* Attribution Confidence */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Attribution Confidence</h3>
            {lead.confidence != null ? (
              <div className="flex items-center gap-5">
                {/* Confidence ring */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" strokeWidth="3"
                      className="stroke-muted" />
                    <circle cx="18" cy="18" r="14" fill="none" strokeWidth="3"
                      strokeDasharray={`${lead.confidence * 88} 88`}
                      strokeLinecap="round"
                      className={lead.confidence >= 0.7 ? 'stroke-green-500' : lead.confidence >= 0.4 ? 'stroke-yellow-500' : 'stroke-gray-400'}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {Math.round(lead.confidence * 100)}%
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      lead.confidence >= 0.7
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : lead.confidence >= 0.4
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {lead.confidence >= 0.7 ? 'High' : lead.confidence >= 0.4 ? 'Medium' : 'Low'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lead.attributionMethod === 'time_window' ? 'Time Window' : 'Geo Match'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {lead.attributionMethod === 'time_window'
                      ? `Arrived ${lead.time_since_spot} after TV spot in ${lead.dma}`
                      : `Located in ${lead.dma} — no direct time correlation`}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No TV attribution</p>
            )}
          </div>

          {/* Score Breakdown */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Score Breakdown</h3>
            <div className="space-y-2">
              {applicableRules.map((rule) => (
                <div key={rule.factor} className="flex items-center gap-3">
                  <div className="w-[140px] text-xs text-muted-foreground truncate" title={rule.factor}>
                    {rule.factor}
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(rule.weight / maxWeight) * 100}%`,
                        backgroundColor: rule.active
                          ? CATEGORY_COLORS[rule.category] || '#6B7280'
                          : '#D1D5DB',
                        opacity: rule.active ? 1 : 0.4,
                      }}
                    />
                  </div>
                  <span className={`text-xs font-medium w-6 text-right ${rule.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {rule.weight}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  {cat}
                </div>
              ))}
            </div>
          </div>

          {/* Journey Timeline (TV leads only) */}
          {journey && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Attribution Journey</h3>
              <div className="flex items-center gap-0 overflow-x-auto pb-2">
                {journey.touchpoints.map((tp, i) => {
                  const isCompleted = journey.outcome === 'Tier 1 Client' || i < journey.touchpoints.length - 1;
                  const isLast = i === journey.touchpoints.length - 1;
                  return (
                    <div key={i} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 ${
                          isCompleted
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-muted border-border text-muted-foreground'
                        }`}>
                          {i + 1}
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap max-w-[60px] text-center truncate">
                          {tp}
                        </span>
                      </div>
                      {!isLast && (
                        <div className={`w-8 h-0.5 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              {journey.outcome && (
                <p className="text-xs text-muted-foreground mt-2">
                  Outcome: <span className="font-medium text-foreground">{journey.outcome}</span>
                  {journey.daysToClient && ` (${journey.daysToClient} days to close)`}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <button
              onClick={() => showToast(`Calling ${lead.name}...`)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              Call
            </button>
            <button
              onClick={() => showToast(`Opening email draft for ${lead.name}...`)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function TVPerformanceTab() {
  return (
    <div className="space-y-6">
      {/* Campaign Info */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Active Campaign</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Station</p>
            <p className="font-medium">WYFF4 (NBC)</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Program</p>
            <p className="font-medium">Mike Giordano Segment</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Schedule</p>
            <p className="font-medium">Weekly @ 4:30 PM</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">DMA</p>
            <p className="font-medium">567 - Greenville-Spartanburg</p>
          </div>
        </div>
      </div>

      {/* Attribution Windows */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold mb-1">Attribution Windows</h3>
        <p className="text-sm text-muted-foreground mb-4">Confidence weight decays over time after TV spot</p>
        <div className="space-y-3">
          {[
            { label: demo.attributionWindows.immediate.label, time: '15 min', weight: demo.attributionWindows.immediate.weight },
            { label: demo.attributionWindows.sameEvening.label, time: '4 hours', weight: demo.attributionWindows.sameEvening.weight },
            { label: demo.attributionWindows.nextDay.label, time: '24 hours', weight: demo.attributionWindows.nextDay.weight },
            { label: demo.attributionWindows.weekWindow.label, time: '7 days', weight: demo.attributionWindows.weekWindow.weight },
          ].map((window) => (
            <div key={window.label} className="flex items-center gap-4">
              <div className="w-36 text-sm font-medium">{window.label}</div>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-primary flex items-center justify-end px-2 rounded-full"
                  style={{ width: `${(window.weight / 40) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{window.weight}%</span>
                </div>
              </div>
              <div className="w-16 text-right text-xs text-muted-foreground">{window.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Performance Comparison */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Channel Performance Comparison</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Channel</th>
                <th>Campaign</th>
                <th>Leads</th>
                <th>Meetings</th>
                <th>Clients</th>
                <th>Cost</th>
                <th>CPL</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              {demo.campaignPerformance.map((camp) => (
                <tr key={camp.id} className={camp.channel === 'TV' ? 'border-l-2 border-l-primary' : ''}>
                  <td className="font-medium">{camp.channel}</td>
                  <td>{camp.name}</td>
                  <td>{camp.leads}</td>
                  <td>{camp.meetings}</td>
                  <td>{camp.clients}</td>
                  <td>${camp.cost.toLocaleString()}</td>
                  <td>${camp.cpl}</td>
                  <td className={`font-bold ${camp.roi >= 5 ? 'text-green-500' : 'text-muted-foreground'}`}>
                    {camp.roi}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          <span className="font-medium text-foreground">TV drives 8.4x ROI</span> — highest quality leads at scale
        </p>
      </div>

      {/* Geographic Breakdown */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Leads by Location</h3>
        <div className="space-y-3">
          {demo.geoBreakdown.map((geo) => (
            <div key={geo.city} className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium">{geo.city}</div>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-primary flex items-center justify-end px-2"
                  style={{ width: `${geo.pct}%` }}
                >
                  <span className="text-xs text-white font-medium">{geo.leads}</span>
                </div>
              </div>
              <div className="w-16 text-right text-sm text-muted-foreground">{geo.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Performance */}
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Performance by Topic of Interest</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={demo.topicBreakdown} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="topic" width={140} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="count" name="Leads" fill="#5A9BD5" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface AlertConfig {
  name: string;
  enabled: boolean;
  desc: string;
}

function AlertsTab() {
  const showToast = useToast();
  const [alerts, setAlerts] = useState<AlertConfig[]>([
    { name: 'Hot Lead Alert (Slack)', enabled: true, desc: 'Notify when score >= 80' },
    { name: 'Hot Lead Alert (SMS)', enabled: true, desc: 'Text to +1864XXXXXXX' },
    { name: 'Daily Summary', enabled: true, desc: 'Email at 9am' },
    { name: 'Weekly Report', enabled: true, desc: 'Email on Mondays' },
  ]);

  const toggleAlert = (index: number) => {
    setAlerts((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], enabled: !next[index].enabled };
      showToast(`${next[index].name}: ${next[index].enabled ? 'enabled' : 'disabled'}`);
      return next;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alert Configuration</h3>
        <div className="bg-card rounded-lg shadow-sm border border-border divide-y divide-border">
          {alerts.map((alert, i) => (
            <div key={alert.name} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{alert.name}</p>
                <p className="text-sm text-muted-foreground">{alert.desc}</p>
              </div>
              <div
                onClick={() => toggleAlert(i)}
                className={`w-10 h-6 rounded-full cursor-pointer transition-colors ${alert.enabled ? 'bg-green-500' : 'bg-gray-300'} relative`}
              >
                <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all ${alert.enabled ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Alerts</h3>
        <div className="bg-card rounded-lg shadow-sm border border-border divide-y divide-border">
          {[
            { type: 'hot', msg: 'Hot lead: Robert Anderson (94)', time: '22 min ago' },
            { type: 'spike', msg: 'Traffic spike detected after TV spot', time: '35 min ago' },
            { type: 'hot', msg: 'Hot lead: Patricia Williams (87)', time: '1.5 hr ago' },
            { type: 'report', msg: 'Weekly report sent', time: 'Yesterday' },
          ].map((alert, i) => (
            <div key={i} className="p-4 flex items-start gap-3">
              <span className="text-xl">
                {alert.type === 'hot' ? '🔥' : alert.type === 'spike' ? '📈' : '✅'}
              </span>
              <div className="flex-1">
                <p className="text-sm">{alert.msg}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, subtitle, icon, trend }: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: number;
}) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
          <TrendingUp className="w-4 h-4" />
          <span>{trend > 0 ? '+' : ''}{trend}% vs last month</span>
        </div>
      )}
    </div>
  );
}

export default Market864Demo;
