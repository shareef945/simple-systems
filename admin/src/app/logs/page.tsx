import Link from 'next/link';
import { CheckCircle, XCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const MOCK_LOGS = [
  { id: '1', client: 'Acme Salon', eventType: 'WEBHOOK', success: true, timestamp: '2026-02-22 10:30:45', message: 'Candidate created: John Doe', submissionId: 'sub_001' },
  { id: '2', client: 'Acme Salon', eventType: 'EMAIL', success: true, timestamp: '2026-02-22 10:28:12', message: 'Confirmation email sent', submissionId: 'sub_001' },
  { id: '3', client: 'Tech Startup', eventType: 'WEBHOOK', success: false, timestamp: '2026-02-22 09:15:33', message: 'Invalid payload: missing email', submissionId: null },
  { id: '4', client: 'Fitness Studio', eventType: 'WEBHOOK', success: true, timestamp: '2026-02-21 16:45:00', message: 'Candidate created: Jane Smith', submissionId: 'sub_002' },
  { id: '5', client: 'Downtown Clinic', eventType: 'EMAIL', success: true, timestamp: '2026-02-21 14:20:11', message: 'Confirmation email sent', submissionId: 'sub_003' },
  { id: '6', client: 'Creative Agency', eventType: 'WEBHOOK', success: false, timestamp: '2026-02-21 11:05:22', message: 'Rate limit exceeded', submissionId: null },
  { id: '7', client: 'Acme Salon', eventType: 'WEBHOOK', success: true, timestamp: '2026-02-20 15:30:00', message: 'Candidate created: Bob Wilson', submissionId: 'sub_004' },
];

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">System Logs</h1>
        <p className="mt-1 text-sm text-zinc-500">View recent events across all clients</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>All Logs</CardTitle>
          <div className="flex gap-2">
            <Input placeholder="Search..." className="w-48" />
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-zinc-500">
                  <th className="pb-3 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Event Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Message</th>
                  <th className="pb-3 font-medium">Submission ID</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LOGS.map((log) => (
                  <tr key={log.id} className="border-b last:border-0 hover:bg-zinc-50">
                    <td className="py-3 font-mono text-xs text-zinc-600">{log.timestamp}</td>
                    <td className="py-3">
                      <Link href={`/clients/${log.client.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-zinc-900 hover:text-[#ea5c1c]">
                        {log.client}
                      </Link>
                    </td>
                    <td className="py-3">
                      <Badge variant="secondary">{log.eventType}</Badge>
                    </td>
                    <td className="py-3">
                      {log.success ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </td>
                    <td className="py-3 text-sm text-zinc-700 max-w-xs truncate">{log.message}</td>
                    <td className="py-3 font-mono text-xs text-zinc-500">
                      {log.submissionId || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-500">Showing {MOCK_LOGS.length} logs</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
