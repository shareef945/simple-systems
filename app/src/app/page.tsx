import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-zinc-900">
            Simple Hiring
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600">
            <Link href="#how-it-works" className="hover:text-zinc-900">How It Works</Link>
            <Link href="#who-its-for" className="hover:text-zinc-900">Who It&apos;s For</Link>
            <Link href="#pricing" className="hover:text-zinc-900">Pricing</Link>
            <Link href="/onboarding">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,92,28,0.08),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-6xl lg:text-7xl">
            Hiring in Notion.{' '}
            <span className="text-[#ea5c1c]">Without the mess.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 md:text-xl">
            Collect applications. Auto-create candidates. Send confirmations.
            All inside Notion — no spreadsheets, no extra tools.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/onboarding">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-zinc-600">Three simple steps. Done in under 15 minutes.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Connect Notion',
                description: 'Sign in with your Notion account. We only access what we need.',
                icon: <Zap className="h-6 w-6" />,
              },
              {
                step: '02',
                title: 'Select Your Databases',
                description: 'Pick your Candidates, Roles, and Stages databases. We validate everything works.',
                icon: <Shield className="h-6 w-6" />,
              },
              {
                step: '03',
                title: 'Share Your Link',
                description: 'Get your application link. Start receiving candidates instantly.',
                icon: <Users className="h-6 w-6" />,
              },
            ].map((item) => (
              <Card key={item.step} className="border-0 bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-bold text-zinc-100">{item.step}</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ea5c1c]/10 text-[#ea5c1c]">
                      {item.icon}
                    </div>
                  </div>
                  <CardTitle className="mt-4 text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="who-its-for" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">Who It&apos;s For</h2>
            <p className="mt-4 text-lg text-zinc-600">Perfect for teams that already love Notion.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['Small teams', 'Agencies', 'Salons', 'Startups', 'Freelancers', 'Clinics'].map((item) => (
              <div
                key={item}
                className="rounded-full border bg-white px-6 py-3 text-sm font-medium text-zinc-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">Simple Pricing</h2>
            <p className="mt-4 text-lg text-zinc-600">One price. No subscriptions. No surprises.</p>
          </div>
          <div className="mx-auto max-w-md">
            <Card className="border-2 border-[#ea5c1c] bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">One-Time Purchase</CardTitle>
                <div className="mt-4 text-5xl font-bold text-zinc-900">
                  $300<span className="text-lg font-normal text-zinc-500"></span>
                </div>
                <CardDescription className="mt-2">Pay once. Use forever.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Unlimited candidates',
                  'Unlimited roles',
                  'Email notifications',
                  'Webhook integrations',
                  'Notion OAuth',
                  'Priority support',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#ea5c1c]" />
                    <span className="text-zinc-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <Link href="#" className="hover:text-zinc-900">Privacy</Link>
              <Link href="#" className="hover:text-zinc-900">Terms</Link>
              <span>Built by SAI Technology</span>
            </div>
            <p className="text-sm text-zinc-400">© 2026 Simple Hiring. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
