import { useState } from 'react';
import { Settings, X, Monitor, Layers, Gamepad2, ChevronDown } from 'lucide-react';
import { useSettings, type SetupMode } from '../../contexts/SettingsContext';

const SETUP_MODES: { value: SetupMode; label: string; icon: typeof Monitor }[] = [
  { value: 'Desk', label: 'Desk', icon: Monitor },
  { value: 'Travel', label: 'Travel', icon: Layers },
  { value: 'Gaming', label: 'Gaming', icon: Gamepad2 },
];

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const { settings, updateSettings } = useSettings();

  return (
    <>
      {/* Gear toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 top-4 z-40 rounded-lg bg-graphene-900 p-2 text-alloy-100 shadow-lg transition-colors hover:bg-graphene-800 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-graphene-950"
        aria-label="Open settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-alloy-200/10 bg-graphene-950 shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-alloy-200/10 px-5 py-4">
          <h2 className="text-lg font-semibold text-alloy-50">Settings</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-alloy-100 transition-colors hover:bg-graphene-800 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-6">
            {/* Reduce Motion */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-alloy-50">Reduce Motion</p>
                <p className="text-xs text-alloy-100/60">Minimize animations and transitions</p>
              </div>
              <button
                onClick={() => updateSettings({ reduceMotion: !settings.reduceMotion })}
                className={`relative flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
                  settings.reduceMotion ? 'bg-teal-500' : 'bg-alloy-200/20'
                }`}
                aria-label="Toggle reduce motion"
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    settings.reduceMotion ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Show Spec Strip Overlays */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-alloy-50">Show Spec Strip Overlays</p>
                <p className="text-xs text-alloy-100/60">Display spec strips on product cards</p>
              </div>
              <button
                onClick={() => updateSettings({ showSpecStrips: !settings.showSpecStrips })}
                className={`relative flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
                  settings.showSpecStrips ? 'bg-teal-500' : 'bg-alloy-200/20'
                }`}
                aria-label="Toggle spec strip overlays"
              >
                <div
                  className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    settings.showSpecStrips ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Default Setup Mode */}
            <div>
              <p className="mb-2 text-sm font-medium text-alloy-50">Default Setup Mode</p>
              <div className="relative">
                <select
                  value={settings.defaultSetupMode}
                  onChange={(e) => updateSettings({ defaultSetupMode: e.target.value as SetupMode })}
                  className="w-full appearance-none rounded-lg border border-alloy-200/20 bg-graphene-900 px-4 py-2.5 pr-10 text-sm text-alloy-50 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-graphene-950"
                >
                  {SETUP_MODES.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-teal-500" />
              </div>
              <div className="mt-3 flex gap-2">
                {SETUP_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = settings.defaultSetupMode === mode.value;
                  return (
                    <button
                      key={mode.value}
                      onClick={() => updateSettings({ defaultSetupMode: mode.value })}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-3 transition-colors ${
                        isActive
                          ? 'border-teal-500 bg-teal-500/10 text-teal-500'
                          : 'border-alloy-200/10 text-alloy-100/60 hover:border-alloy-200/20 hover:text-alloy-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
