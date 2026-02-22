import Link from 'next/link';
import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Role {
  id: string;
  name: string;
  status: 'active' | 'paused';
  slug: string;
  applicationLink: string;
}

const MOCK_ROLES: Role[] = [
  { id: '1', name: 'Nail Technician', status: 'active', slug: 'nail-technician', applicationLink: 'https://simplehiring.app/apply/demo-co/nail-technician' },
  { id: '2', name: 'Front Desk Manager', status: 'active', slug: 'front-desk-manager', applicationLink: 'https://simplehiring.app/apply/demo-co/front-desk-manager' },
  { id: '3', name: 'Esthetician', status: 'paused', slug: 'esthetician', applicationLink: 'https://simplehiring.app/apply/demo-co/esthetician' },
];

export default function RolesPage() {
  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-8">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/onboarding" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">
              ← Back to Setup
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-zinc-900">Your Roles</h1>
            <p className="mt-1 text-sm text-zinc-500">View and manage your open positions.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-zinc-500">
                    <th className="pb-3 font-medium">Role Name</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Slug</th>
                    <th className="pb-3 font-medium">Application Link</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ROLES.map((role) => (
                    <tr key={role.id} className="border-b last:border-0">
                      <td className="py-4">
                        <span className="font-medium text-zinc-900">{role.name}</span>
                      </td>
                      <td className="py-4">
                        <Badge variant={role.status === 'active' ? 'success' : 'secondary'}>
                          {role.status === 'active' ? 'Active' : 'Paused'}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <code className="text-sm text-zinc-600">{role.slug}</code>
                      </td>
                      <td className="py-4">
                        <code className="text-sm text-[#ea5c1c]">{role.applicationLink}</code>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyLink(role.applicationLink)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={role.applicationLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {MOCK_ROLES.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-zinc-500">No roles found.</p>
                <p className="mt-1 text-sm text-zinc-400">Create roles in your Notion database to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-600">
            <strong>Note:</strong> Roles are managed in your Notion workspace. 
            This page displays a read-only list of your open positions. 
            To add, edit, or remove roles, update your Roles database in Notion.
          </p>
        </div>
      </div>
    </main>
  );
}
