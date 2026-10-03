import React, { useState } from 'react';
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Textarea,
  Select,
  Dialog,
  Dropdown,
  Tabs,
  ThemeSelector,
} from '../src/index.js';

function Showcase() {
  const { theme, currentThemeConfig } = useTheme();
  const [activeTab, setActiveTab] = useState('buttons');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-root)] text-[var(--text-main)] p-6 sm:p-12 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">@jdlc/ui</h1>
              <Badge variant="primary" dot>v0.1.0</Badge>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Unified design system and frontend component framework. Active theme:{' '}
              <span className="text-[var(--color-primary-glow)] font-semibold">
                {currentThemeConfig.name}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <Button variant="default" size="sm" onClick={() => setIsDialogOpen(true)}>
              Open Dialog
            </Button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <Tabs
          tabs={[
            { id: 'buttons', label: 'Buttons' },
            { id: 'badges', label: 'Badges' },
            { id: 'cards', label: 'Cards' },
            { id: 'forms', label: 'Form Elements' },
            { id: 'dropdowns', label: 'Dropdowns' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Section: Buttons */}
        {activeTab === 'buttons' && (
          <div className="space-y-6">
            <Card hover={false}>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>All standard button styles with interactive active scaling.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button variant="default">Primary Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="default" isLoading>Loading State</Button>
                <Button variant="default" disabled>Disabled</Button>
              </CardContent>
            </Card>

            <Card hover={false}>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Available sizing scale.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Section: Badges */}
        {activeTab === 'badges' && (
          <Card hover={false}>
            <CardHeader>
              <CardTitle>Badges & Indicators</CardTitle>
              <CardDescription>Semantic status chips with optional pulsating indicator dot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary" dot>Primary / Active</Badge>
                <Badge variant="accent" dot>Accent Glow</Badge>
                <Badge variant="success" dot>Success</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="danger" dot>Danger</Badge>
                <Badge variant="subtle">Subtle</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Badge size="sm" variant="primary">Small Badge</Badge>
                <Badge size="md" variant="primary">Medium Badge</Badge>
                <Badge size="lg" variant="primary">Large Badge</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Section: Cards */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card hover>
              <CardHeader>
                <CardTitle>Interactive Glass Card</CardTitle>
                <Badge variant="accent">Featured</Badge>
              </CardHeader>
              <CardContent>
                Hover over this card to experience subtle glow borders and elevated lighting.
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">Dismiss</Button>
                <Button variant="default" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card hover>
              <CardHeader>
                <CardTitle>Metric Card</CardTitle>
                <Badge variant="success" dot>+24%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-[var(--color-primary-glow)] font-mono">
                  $14,250
                </div>
                <p className="text-xs text-slate-400 mt-1">Monthly recurring budget calculation</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Section: Form Elements */}
        {activeTab === 'forms' && (
          <Card hover={false}>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Inputs with built-in labels, focus rings, and validation styling.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Workspace Name" placeholder="e.g. JDLC Platform" helperText="Unique identifier for workspace" />
              <Input label="Email Address" type="email" placeholder="name@domain.com" error="Invalid email format" />
              <Select label="Priority">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
              <div className="sm:col-span-2">
                <Textarea label="Project Description" placeholder="Write a short summary of goals..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default">Save Settings</Button>
            </CardFooter>
          </Card>
        )}

        {/* Section: Dropdowns */}
        {activeTab === 'dropdowns' && (
          <Card hover={false}>
            <CardHeader>
              <CardTitle>Dropdown Action Menus</CardTitle>
              <CardDescription>Menus with click-outside protection, keyboard support, and shortcuts.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Dropdown
                trigger={<Button variant="secondary">Actions Menu ▼</Button>}
                items={[
                  { label: 'View Analytics', shortcut: '⌘A' },
                  { label: 'Export Data', shortcut: '⌘E' },
                  { divider: true },
                  { label: 'Delete Item', danger: true },
                ]}
              />
            </CardContent>
          </Card>
        )}

        {/* Test Dialog */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          title="Sample UI Modal Dialog"
          description="Accessible modal dialog component with backdrop blur."
        >
          <p className="text-sm text-slate-300">
            This dialog features automatic backdrop click dismissal, Escape key handling, and background body scroll locking.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={() => setIsDialogOpen(false)}>Confirm</Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="linear" storageKey="jdlc_ui_showcase_theme">
      <Showcase />
    </ThemeProvider>
  );
}
