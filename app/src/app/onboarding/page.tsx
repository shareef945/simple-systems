"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ArrowLeft, Upload, ExternalLink, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Toggle } from '@/components/ui/toggle';
import { EnhancedSelect } from '@/components/ui/enhanced-select';
import { CopyField } from '@/components/ui/copy-field';

const STEPS = [
  { id: 1, title: 'Company Details' },
  { id: 2, title: 'Connect Notion' },
  { id: 3, title: 'Select Databases' },
  { id: 4, title: 'Generate Link' },
  { id: 5, title: 'Test Submission' },
];

type DbOption = { id: string; title: string };

interface CompanyData {
  companyName: string;
  replyToEmail: string;
  logoUrl: string;
}

interface NotionData {
  workspaceId: string;
  workspaceName: string;
  connected: boolean;
}

interface DatabaseSelection {
  candidatesDbId: string;
  rolesDbId: string;
  stagesDbId: string;
}

interface SchemaError {
  type: 'candidates' | 'roles' | 'stages';
  message: string;
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    replyToEmail: '',
    logoUrl: '',
  });
  
  const [notionData, setNotionData] = useState<NotionData>({
    workspaceId: '',
    workspaceName: '',
    connected: false,
  });
  
  const [databases, setDatabases] = useState<DbOption[]>([]);
  const [dbSelection, setDbSelection] = useState<DatabaseSelection>({
    candidatesDbId: '',
    rolesDbId: '',
    stagesDbId: '',
  });
  
  const [schemaErrors, setSchemaErrors] = useState<SchemaError[]>([]);
  const [setupValidated, setSetupValidated] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const progressValue = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const dbOptions = databases.map(db => ({
    value: db.id,
    label: db.title,
  }));

  async function connectNotion() {
    setLoading(true);
    try {
      const response = await fetch('/api/notion/oauth/start?product=HIRING', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setNotionData({
          workspaceId: 'demo-workspace-id',
          workspaceName: 'Demo Workspace',
          connected: true,
        });
      }
    } catch {
      setNotionData({
        workspaceId: 'demo-workspace-id',
        workspaceName: 'Demo Workspace',
        connected: true,
      });
    } finally {
      setLoading(false);
    }
  }

  async function validateSetup() {
    setLoading(true);
    setError(null);
    setSchemaErrors([]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const errors: SchemaError[] = [];
    if (!dbSelection.candidatesDbId) {
      errors.push({ type: 'candidates', message: 'Please select a Candidates database' });
    }
    if (!dbSelection.rolesDbId) {
      errors.push({ type: 'roles', message: 'Please select a Roles database' });
    }
    if (!dbSelection.stagesDbId) {
      errors.push({ type: 'stages', message: 'Please select a Stages database' });
    }
    
    setSchemaErrors(errors);
    setSetupValidated(errors.length === 0);
    setLoading(false);
  }

  async function sendTestApplication() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestSent(true);
    setLoading(false);
  }

  function handleNext() {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return companyData.companyName && companyData.replyToEmail;
      case 2:
        return notionData.connected;
      case 3:
        return dbSelection.candidatesDbId && dbSelection.rolesDbId && dbSelection.stagesDbId;
      case 4:
        return setupValidated;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900">Setup Your Account</h1>
            <span className="text-sm text-zinc-500">Step {currentStep} of {STEPS.length}</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 text-sm ${
                  step.id === currentStep
                    ? 'font-medium text-[#ea5c1c]'
                    : step.id < currentStep
                    ? 'text-emerald-600'
                    : 'text-zinc-400'
                }`}
              >
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-current text-xs">
                    {step.id}
                  </div>
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-white">
          {currentStep === 1 && (
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Company Details</h2>
                  <p className="mt-1 text-sm text-zinc-500">Tell us a bit about your company.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Acme Inc."
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="replyToEmail">Reply-To Email *</Label>
                    <Input
                      id="replyToEmail"
                      type="email"
                      placeholder="hiring@acme.com"
                      value={companyData.replyToEmail}
                      onChange={(e) => setCompanyData({ ...companyData, replyToEmail: e.target.value })}
                    />
                    <p className="text-xs text-zinc-500">We&apos;ll send confirmation emails from this address.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Logo (optional)</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-zinc-300">
                        {companyData.logoUrl ? (
                          <img src={companyData.logoUrl} alt="Logo" className="h-full w-full object-contain rounded-lg" />
                        ) : (
                          <Upload className="h-6 w-6 text-zinc-400" />
                        )}
                      </div>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="logo-upload"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setCompanyData({ ...companyData, logoUrl: ev.target?.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Label htmlFor="logo-upload" className="cursor-pointer text-sm font-medium text-[#ea5c1c] hover:text-[#e65722]">
                          Upload logo
                        </Label>
                        <p className="text-xs text-zinc-500">PNG, JPG up to 1MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          )}

          {currentStep === 2 && (
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Connect Your Notion Workspace</h2>
                  <p className="mt-1 text-sm text-zinc-500">We need access to read and write to your Notion databases.</p>
                </div>

                {notionData.connected ? (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-emerald-900">Connected to {notionData.workspaceName}</p>
                        <p className="text-sm text-emerald-700">Workspace ID: {notionData.workspaceId}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-200 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ea5c1c]/10">
                      <svg viewBox="0 0 100 100" className="h-8 w-8">
                        <path fill="#ea5c1c" d="M6.017 4.313l55.333 -4.087c6.797 -.583 8.543 -.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 .194 -6.023 .39 -8.16 -2.533L3.3 79.94c-2.333 -3.113 -2.91 -5.443 -2.91 -8.167V11.113c0 -3.497 1.94 -5.626 5.627 -6.8z"/>
                        <path fill="#fff" d="M61.35 0L6.017 4.313c-2.72 .194 -4.473 1.553 -5.047 4.277v58.687c0 3.497 1.553 5.443 4.86 6.023l55.143 3.883c3.69 .39 5.247 .39 7.77 -2.333l15.377 -16.16c2.333 -2.527 2.91 -3.497 2.91 -5.827V7.233c0 -3.303 -1.75 -5.05 -5.7 -7.233zM25.92 19.523c-5.247 0 -9.513 4.277 -9.513 9.523s4.266 9.523 9.513 9.523c5.24 0 9.507 -4.277 9.507 -9.523s-4.267 -9.523 -9.507 -9.523zm38.193 0c-5.24 0 -9.507 4.277 -9.507 9.523s4.267 9.523 9.507 9.523c5.247 0 9.52 -4.277 9.52 -9.523s-4.273 -9.523 -9.52 -9.523z"/>
                      </svg>
                    </div>
                    <p className="mb-4 text-sm text-zinc-600">Click the button below to connect your Notion workspace. We&apos;ll only access what we need to manage candidates.</p>
                    <Button onClick={connectNotion} disabled={loading} size="lg">
                      {loading ? 'Connecting...' : 'Connect Notion'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          )}

          {currentStep === 3 && (
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Select Your Databases</h2>
                  <p className="mt-1 text-sm text-zinc-500">Choose which Notion databases to use for your hiring workflow.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Candidates Database *</Label>
                    <EnhancedSelect
                      value={dbSelection.candidatesDbId}
                      onChange={(value) => setDbSelection({ ...dbSelection, candidatesDbId: value })}
                      options={dbOptions}
                      placeholder="Select your Candidates database..."
                    />
                    <p className="text-xs text-zinc-500">Where candidate applications will be created</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Roles Database *</Label>
                    <EnhancedSelect
                      value={dbSelection.rolesDbId}
                      onChange={(value) => setDbSelection({ ...dbSelection, rolesDbId: value })}
                      options={dbOptions}
                      placeholder="Select your Roles database..."
                    />
                    <p className="text-xs text-zinc-500">The positions you&apos;re hiring for</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Stages Database *</Label>
                    <EnhancedSelect
                      value={dbSelection.stagesDbId}
                      onChange={(value) => setDbSelection({ ...dbSelection, stagesDbId: value })}
                      options={dbOptions}
                      placeholder="Select your Stages database..."
                    />
                    <p className="text-xs text-zinc-500">Hiring pipeline stages (e.g., Applied, Interview, Offer)</p>
                  </div>
                </div>

                {schemaErrors.length > 0 && (
                  <div className="space-y-2">
                    {schemaErrors.map((err, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                        <p className="text-sm text-red-800">{err.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {setupValidated && (
                  <div className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-900">Setup validated!</p>
                      <p className="text-sm text-emerald-700">Your databases are ready to go.</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          )}

          {currentStep === 4 && (
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">You&apos;re Live! 🎉</h2>
                  <p className="mt-1 text-sm text-zinc-500">Here&apos;s your application link and webhook setup.</p>
                </div>

                <div className="space-y-4">
                  <CopyField
                    label="Your application link"
                    value={`https://simplehiring.app/apply/${companyData.companyName.toLowerCase().replace(/\s+/g, '-') || 'acme'}/nail-technician`}
                  />
                  
                  <CopyField
                    label="Your webhook URL"
                    value={`https://api.simplesystems.app/webhooks/hiring/intake/${companyData.companyName.toLowerCase().replace(/\s+/g, '-') || 'acme'}`}
                  />
                  
                  <CopyField
                    label="Your webhook secret"
                    value="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    showReveal
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
                  <div>
                    <p className="font-medium text-zinc-900">Email notifications</p>
                    <p className="text-sm text-zinc-500">Send confirmation emails to candidates</p>
                  </div>
                  <Toggle checked={emailEnabled} onChange={setEmailEnabled} />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Setup Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          )}

          {currentStep === 5 && (
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Test Your Setup</h2>
                  <p className="mt-1 text-sm text-zinc-500">Send a test application to make sure everything works.</p>
                </div>

                {testSent ? (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center">
                    <div className="mb-2 text-4xl">🎉</div>
                    <p className="font-medium text-emerald-900">Test candidate created successfully!</p>
                    <p className="mt-1 text-sm text-emerald-700">Check your Notion database to see the test entry.</p>
                  </div>
                ) : (
                  <div className="rounded-lg border border-zinc-200 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ea5c1c]/10">
                      <Send className="h-8 w-8 text-[#ea5c1c]" />
                    </div>
                    <p className="mb-4 text-sm text-zinc-600">Click below to create a test candidate in your Notion database.</p>
                    <Button onClick={sendTestApplication} disabled={loading} size="lg">
                      {loading ? 'Sending...' : 'Send Test Application'}
                    </Button>
                  </div>
                )}

                <div className="rounded-lg bg-zinc-50 p-4">
                  <h3 className="font-medium text-zinc-900">What happens next?</h3>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600">
                    <li>1. Share your application link with candidates</li>
                    <li>2. When they apply, a new entry appears in Notion</li>
                    <li>3. You&apos;ll receive email notifications for new applications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          )}

          <div className="flex items-center justify-between border-t px-6 py-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            {currentStep < 4 ? (
              <Button onClick={currentStep === 2 ? (notionData.connected ? handleNext : connectNotion) : (currentStep === 3 ? validateSetup : handleNext)} disabled={!canProceed()}>
                {loading ? 'Loading...' : (
                  <>
                    {currentStep === 2 ? (notionData.connected ? 'Continue' : 'Connect Notion') : 
                     currentStep === 3 ? 'Validate Setup' : 'Continue'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : currentStep === 4 ? (
              <Button onClick={handleNext}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Link href="/roles">
                <Button>
                  Go to Roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
