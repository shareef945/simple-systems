"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, RotateCcw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { CopyField } from '@/components/ui/copy-field';

const MOCK_CLIENT = {
  companyName: 'Acme Salon',
  slug: 'acme-salon',
  status: 'active' as const,
  productType: 'HIRING',
  notionIntegration: {
    workspaceId: 'ws_12345678',
    botId: 'bot_87654321',
    oauthConnected: true,
    candidatesDbId: 'db_candidates_001',
    rolesDbId: 'db_roles_001',
    stagesDbId: 'db_stages_001',
  },
  emailSettings: {
    enabled: true,
    monthlyQuota: 500,
    emailsSentThisMonth: 47,
    replyToEmail: 'hiring@acmesalon.com',
    logoUrl: '',
  },
  webhookSettings: {
    url: 'https://api.simplesystems.app/webhooks/hiring/intake/acme-salon',
    secret: 'whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    lastReceived: '2 minutes ago',
  },
};

const MOCK_LOGS = [
  { id: '1', timestamp: '2026-02-22 10:30:45', eventType: 'WEBHOOK', success: true, message: 'Candidate created: John Doe', submissionId: 'sub_001' },
  { id: '2', timestamp: '2026-02-22 10:28:12', eventType: 'EMAIL', success: true, message: 'Confirmation email sent', submissionId: 'sub_001' },
  { id: '3', timestamp: '2026-02-22 09:15:33', eventType: 'WEBHOOK', success: false, message: 'Invalid payload: missing email', submissionId: null },
  { id: '4', timestamp: '2026-02-21 16:45:00', eventType: 'WEBHOOK', success: true, message: 'Candidate created: Jane Smith', submissionId: 'sub_002' },
  { id: '5', timestamp: '2026-02-21 14:20:11', eventType: 'EMAIL', success: true, message: 'Confirmation email sent', submissionId: 'sub_002' },
];

export default function ClientDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [emailEnabled, setEmailEnabled] = useState(MOCK_CLIENT.emailSettings.enabled);
  const [loading, setLoading] = useState(false);
  void params;

  async function handleRevalidate() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  }

  async function handleRotateSecret() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  }

  async function handleResetCounter() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Clients
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-zinc-900">{MOCK_CLIENT.companyName}</h1>
            <Badge variant={MOCK_CLIENT.status === 'active' ? 'success' : 'destructive'}>
              {MOCK_CLIENT.status === 'active' ? 'Active' : 'Suspended'}
            </Badge>
            <Badge variant="secondary">{MOCK_CLIENT.productType}</Badge>
          </div>
          <p className="mt-1 text-sm text-zinc-500">Slug: {MOCK_CLIENT.slug}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Notion Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-500">Workspace ID</p>
                <p className="font-mono text-zinc-900">{MOCK_CLIENT.notionIntegration.workspaceId}</p>
              </div>
              <div>
                <p className="text-zinc-500">Bot ID</p>
                <p className="font-mono text-zinc-900">{MOCK_CLIENT.notionIntegration.botId}</p>
              </div>
              <div>
                <p className="text-zinc-500">OAuth Connected</p>
                <p className="flex items-center gap-1">
                  {MOCK_CLIENT.notionIntegration.oauthConnected ? (
                    <><CheckCircle className="h-4 w-4 text-emerald-600" /> Yes</>
                  ) : (
                    <><XCircle className="h-4 w-4 text-red-600" /> No</>
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-zinc-500">Candidates DB</p>
                <p className="font-mono text-xs text-zinc-700">{MOCK_CLIENT.notionIntegration.candidatesDbId}</p>
              </div>
              <div>
                <p className="text-zinc-500">Roles DB</p>
                <p className="font-mono text-xs text-zinc-700">{MOCK_CLIENT.notionIntegration.rolesDbId}</p>
              </div>
              <div>
                <p className="text-zinc-500">Stages DB</p>
                <p className="font-mono text-xs text-zinc-700">{MOCK_CLIENT.notionIntegration.stagesDbId}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleRevalidate} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Revalidate Schema
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-zinc-900">Email Enabled</p>
                <p className="text-sm text-zinc-500">Send confirmation emails to candidates</p>
              </div>
              <Toggle checked={emailEnabled} onChange={setEmailEnabled} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-500">Monthly Quota</p>
                <p className="font-medium text-zinc-900">{MOCK_CLIENT.emailSettings.monthlyQuota}</p>
              </div>
              <div>
                <p className="text-zinc-500">Sent This Month</p>
                <p className="font-medium text-zinc-900">{MOCK_CLIENT.emailSettings.emailsSentThisMonth}</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="text-zinc-500">Reply-To Email</p>
              <p className="text-zinc-900">{MOCK_CLIENT.emailSettings.replyToEmail}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleResetCounter} disabled={loading}>
                Reset Monthly Counter
              </Button>
              <Button variant="outline" size="sm" onClick={() => setEmailEnabled(false)} disabled={!emailEnabled}>
                Disable Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Webhook Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CopyField
              label="Webhook URL"
              value={MOCK_CLIENT.webhookSettings.url}
            />
            <CopyField
              label="Webhook Secret"
              value={MOCK_CLIENT.webhookSettings.secret}
              showReveal
            />
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-zinc-500">Last Webhook Received</p>
                <p className="text-zinc-900">{MOCK_CLIENT.webhookSettings.lastReceived}</p>
              </div>
              <Button variant="outline" onClick={handleRotateSecret} disabled={loading}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Rotate Secret
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Logs</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Show Errors Only</Button>
              <Button variant="outline" size="sm">Show Webhooks</Button>
              <Button variant="outline" size="sm">Show Email</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-zinc-500">
                    <th className="pb-2 font-medium">Timestamp</th>
                    <th className="pb-2 font-medium">Event Type</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Message</th>
                    <th className="pb-2 font-medium">Submission ID</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_LOGS.map((log) => (
                    <tr key={log.id} className="border-b last:border-0">
                      <td className="py-2 font-mono text-xs text-zinc-600">{log.timestamp}</td>
                      <td className="py-2">
                        <Badge variant="secondary">{log.eventType}</Badge>
                      </td>
                      <td className="py-2">
                        {log.success ? (
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </td>
                      <td className="py-2 text-sm text-zinc-700">{log.message}</td>
                      <td className="py-2 font-mono text-xs text-zinc-500">
                        {log.submissionId || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions for this client</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
              Suspend Client
            </Button>
            <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
              Activate Client
            </Button>
            <Button variant="destructive" disabled>
              Delete Client
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
