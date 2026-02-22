import { Users, Webhook, Mail, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const METRICS = {
  totalActiveClients: 24,
  totalWebhooks24h: 1247,
  emailSendsThisMonth: 3892,
  errorRate: 2.3,
};

const WEBHOOKS_PER_DAY = [
  { day: 'Mon', count: 180 },
  { day: 'Tue', count: 220 },
  { day: 'Wed', count: 195 },
  { day: 'Thu', count: 240 },
  { day: 'Fri', count: 210 },
  { day: 'Sat', count: 102 },
  { day: 'Sun', count: 100 },
];

const MAX_WEBHOOKS = Math.max(...WEBHOOKS_PER_DAY.map(d => d.count));

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Metrics</h1>
        <p className="mt-1 text-sm text-zinc-500">System performance overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Total Active Clients</CardTitle>
            <Users className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900">{METRICS.totalActiveClients}</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +2 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Webhooks (24h)</CardTitle>
            <Webhook className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900">{METRICS.totalWebhooks24h.toLocaleString()}</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Email Sends (Month)</CardTitle>
            <Mail className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900">{METRICS.emailSendsThisMonth.toLocaleString()}</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">Error Rate (24h)</CardTitle>
            <AlertCircle className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-zinc-900">{METRICS.errorRate}%</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -0.5% vs yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks Per Day</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-48">
            {WEBHOOKS_PER_DAY.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full max-w-12 rounded-t-md bg-[#ea5c1c] transition-all hover:bg-[#e65722]"
                    style={{ height: `${(day.count / MAX_WEBHOOKS) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-500">{day.day}</span>
                <span className="text-xs font-medium text-zinc-700">{day.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
