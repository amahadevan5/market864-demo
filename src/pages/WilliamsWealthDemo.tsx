/**
 * Williams Wealth Management - Demo Dashboard
 * Shows what the attribution system would look like with their data
 */

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import { Tv, Users, Target, TrendingUp, Clock, Flame, ThermometerSun, DollarSign } from 'lucide-react';
import * as demo from '../data/williamsWealthDemo';

export function WilliamsWealthDemo() {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'tv' | 'alerts'>('overview');

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
                  <h1 className="text-xl font-bold text-foreground">Williams Wealth Management</h1>
                  <p className="text-sm text-muted-foreground">TV Attribution Dashboard • WYFF4 Campaign</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium dark:bg-green-900/30 dark:text-green-400">
                Live Demo
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 -mb-px">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'leads', label: 'Leads' },
              { id: 'tv', label: 'TV Performance' },
              { id: 'alerts', label: 'Alerts' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
              <Bar dataKey="attributed" name="TV Attributed Leads" fill="#5A9BD5" radius={[4, 4, 0, 0]} />
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
          <p className="text-sm text-muted-foreground mb-4">Website visits spike after 4:30pm airing</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={demo.hourlyTraffic}>
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="baseline" name="Baseline" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.3} />
              <Area type="monotone" dataKey="visits" name="Actual Visits" stroke="#5A9BD5" fill="#5A9BD5" fillOpacity={0.5} />
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
          <h3 className="text-lg font-semibold">🔥 Latest Hot Lead</h3>
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
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                Call Now
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium">
                View in Wealthbox
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Time since TV spot:</p>
            <p className="text-2xl font-bold text-primary">22 min</p>
            <p className="text-xs text-green-600 mt-1">✓ Within attribution window</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsTab() {
  return (
    <div className="space-y-4">
      {/* Segment Summary */}
      <div className="grid grid-cols-4 gap-3">
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

      {/* Lead Cards */}
      <div className="space-y-3">
        {demo.recentLeads.map((lead) => (
          <div key={lead.id} className="bg-card rounded-lg shadow-sm border border-border p-4">
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
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded text-sm">Call</button>
                <button className="px-3 py-1.5 border border-border rounded text-sm">Email</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
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

function AlertsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alert Configuration</h3>
        <div className="bg-card rounded-lg shadow-sm border border-border divide-y divide-border">
          {[
            { name: 'Hot Lead Alert (Slack)', enabled: true, desc: 'Notify when score ≥ 80' },
            { name: 'Hot Lead Alert (SMS)', enabled: true, desc: 'Text to +1864XXXXXXX' },
            { name: 'Daily Summary', enabled: true, desc: 'Email at 9am' },
            { name: 'Weekly Report', enabled: true, desc: 'Email on Mondays' },
          ].map((alert) => (
            <div key={alert.name} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{alert.name}</p>
                <p className="text-sm text-muted-foreground">{alert.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full ${alert.enabled ? 'bg-green-500' : 'bg-gray-300'} relative`}>
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
            { type: '🔥', msg: 'Hot lead: Robert Anderson (94)', time: '22 min ago' },
            { type: '📈', msg: 'Traffic spike detected after TV spot', time: '35 min ago' },
            { type: '🔥', msg: 'Hot lead: Patricia Williams (87)', time: '1.5 hr ago' },
            { type: '✅', msg: 'Weekly report sent', time: 'Yesterday' },
          ].map((alert, i) => (
            <div key={i} className="p-4 flex items-start gap-3">
              <span className="text-xl">{alert.type}</span>
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

export default WilliamsWealthDemo;
