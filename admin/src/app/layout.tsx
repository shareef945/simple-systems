import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, FileText, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import './globals.css';

const NAV_ITEMS = [
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/logs', label: 'Logs', icon: FileText },
  { href: '/metrics', label: 'Metrics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex">
        <aside className="fixed left-0 top-0 z-20 h-screen w-64 border-r bg-white">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="text-lg font-bold text-zinc-900">
              Simple Systems
            </Link>
          </div>
          
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-zinc-100 text-zinc-900'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 pl-64">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                Staging
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm text-zinc-500">System healthy</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center text-sm font-medium">
                OP
              </div>
            </div>
          </header>
          
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
