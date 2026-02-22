import Link from 'next/link';
import { Search, Eye, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Client {
  id: string;
  companyName: string;
  slug: string;
  productType: 'HIRING' | 'HELPDESK';
  status: 'active' | 'suspended';
  setupComplete: boolean;
  emailsSent: number;
  lastWebhook: string;
}

const MOCK_CLIENTS: Client[] = [
  { id: '1', companyName: 'Acme Salon', slug: 'acme-salon', productType: 'HIRING', status: 'active', setupComplete: true, emailsSent: 47, lastWebhook: '2 min ago' },
  { id: '2', companyName: 'Tech Startup Inc', slug: 'tech-startup', productType: 'HIRING', status: 'active', setupComplete: true, emailsSent: 123, lastWebhook: '5 min ago' },
  { id: '3', companyName: 'Downtown Clinic', slug: 'downtown-clinic', productType: 'HIRING', status: 'active', setupComplete: false, emailsSent: 0, lastWebhook: 'Never' },
  { id: '4', companyName: 'Creative Agency', slug: 'creative-agency', productType: 'HELPDESK', status: 'suspended', setupComplete: true, emailsSent: 89, lastWebhook: '1 day ago' },
  { id: '5', companyName: 'Fitness Studio', slug: 'fitness-studio', productType: 'HIRING', status: 'active', setupComplete: true, emailsSent: 12, lastWebhook: '10 min ago' },
];

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Clients</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage your client accounts</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>All Clients</CardTitle>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search by company or slug..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-zinc-500">
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Slug</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Setup</th>
                  <th className="pb-3 font-medium">Emails</th>
                  <th className="pb-3 font-medium">Last Webhook</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLIENTS.map((client) => (
                  <tr key={client.id} className="border-b last:border-0 hover:bg-zinc-50">
                    <td className="py-4">
                      <Link href={`/clients/${client.slug}`} className="font-medium text-zinc-900 hover:text-[#ea5c1c]">
                        {client.companyName}
                      </Link>
                    </td>
                    <td className="py-4">
                      <code className="text-sm text-zinc-600">{client.slug}</code>
                    </td>
                    <td className="py-4">
                      <Badge variant="secondary">{client.productType}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant={client.status === 'active' ? 'success' : 'destructive'}>
                        {client.status === 'active' ? 'Active' : 'Suspended'}
                      </Badge>
                    </td>
                    <td className="py-4">
                      {client.setupComplete ? (
                        <Badge variant="success">Yes</Badge>
                      ) : (
                        <Badge variant="warning">Incomplete</Badge>
                      )}
                    </td>
                    <td className="py-4 text-sm text-zinc-600">{client.emailsSent}</td>
                    <td className="py-4 text-sm text-zinc-600">{client.lastWebhook}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/clients/${client.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          {client.status === 'active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-500">Showing {MOCK_CLIENTS.length} clients</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
