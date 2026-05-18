import { useState, useEffect, useCallback } from 'react';
import { Settings, ShieldCheck, BarChart3, Megaphone } from 'lucide-react';

type ConsentStatus = 'undecided' | 'accepted' | 'declined' | 'custom';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'cookie-consent';

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

function loadConsent(): { status: ConsentStatus; preferences: CookiePreferences } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore corrupt data
  }
  return null;
}

function saveConsent(status: ConsentStatus, preferences: CookiePreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ status, preferences }));
}

function PreferencesModal({
  preferences,
  onToggle,
  onSave,
  onClose,
}: {
  preferences: CookiePreferences;
  onToggle: (key: 'analytics' | 'marketing') => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-xl border border-alloy-200 bg-graphene-900 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-alloy-50">Cookie Preferences</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-alloy-100 transition-colors hover:bg-graphene-800 hover:text-alloy-50"
            aria-label="Close preferences"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Essential - always on */}
          <div className="flex items-center justify-between rounded-lg border border-alloy-200/10 bg-graphene-950 p-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-teal-500" />
              <div>
                <p className="text-sm font-medium text-alloy-50">Essential</p>
                <p className="text-xs text-alloy-100/60">Required for site functionality</p>
              </div>
            </div>
            <div className="flex h-6 w-11 cursor-not-allowed items-center rounded-full bg-teal-500/80 p-0.5">
              <div className="h-5 w-5 translate-x-5 rounded-full bg-white shadow-sm transition-transform" />
            </div>
          </div>

          {/* Analytics */}
          <div className="flex items-center justify-between rounded-lg border border-alloy-200/10 bg-graphene-950 p-3">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-violet-500" />
              <div>
                <p className="text-sm font-medium text-alloy-50">Analytics</p>
                <p className="text-xs text-alloy-100/60">Help us improve with usage data</p>
              </div>
            </div>
            <button
              onClick={() => onToggle('analytics')}
              className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
                preferences.analytics ? 'bg-teal-500' : 'bg-alloy-200/20'
              }`}
              aria-label="Toggle analytics"
            >
              <div
                className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Marketing */}
          <div className="flex items-center justify-between rounded-lg border border-alloy-200/10 bg-graphene-950 p-3">
            <div className="flex items-center gap-3">
              <Megaphone className="h-5 w-5 text-coral-500" />
              <div>
                <p className="text-sm font-medium text-alloy-50">Marketing</p>
                <p className="text-xs text-alloy-100/60">Personalized ads and content</p>
              </div>
            </div>
            <button
              onClick={() => onToggle('marketing')}
              className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
                preferences.marketing ? 'bg-teal-500' : 'bg-alloy-200/20'
              }`}
              aria-label="Toggle marketing"
            >
              <div
                className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={onSave}
          className="mt-5 w-full rounded-lg bg-coral-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 focus:ring-offset-graphene-900"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = loadConsent();
    if (!stored || stored.status === 'undecided') {
      setVisible(true);
    } else {
      setPreferences(stored.preferences);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const allOn: CookiePreferences = { essential: true, analytics: true, marketing: true };
    saveConsent('accepted', allOn);
    setPreferences(allOn);
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    const onlyEssential: CookiePreferences = { essential: true, analytics: false, marketing: false };
    saveConsent('declined', onlyEssential);
    setPreferences(onlyEssential);
    setVisible(false);
  }, []);

  const handleToggle = useCallback((key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleSavePreferences = useCallback(() => {
    saveConsent('custom', preferences);
    setShowPreferences(false);
    setVisible(false);
  }, [preferences]);

  if (!visible) return null;

  return (
    <>
      {showPreferences && (
        <PreferencesModal
          preferences={preferences}
          onToggle={handleToggle}
          onSave={handleSavePreferences}
          onClose={() => setShowPreferences(false)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-alloy-200/10 bg-graphene-950 px-4 py-4 shadow-lg sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-alloy-100 sm:text-left">
            We use cookies to enhance your experience and analyze site traffic.
          </p>

          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="rounded-lg bg-coral-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 focus:ring-offset-graphene-950"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="rounded-lg border border-alloy-200/20 bg-transparent px-4 py-2 text-sm font-medium text-alloy-100 transition-colors hover:bg-graphene-800 focus:outline-none focus:ring-2 focus:ring-alloy-200/40 focus:ring-offset-2 focus:ring-offset-graphene-950"
            >
              Decline
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="rounded-lg border border-alloy-200/20 bg-transparent px-4 py-2 text-sm font-medium text-alloy-100 transition-colors hover:bg-graphene-800 focus:outline-none focus:ring-2 focus:ring-alloy-200/40 focus:ring-offset-2 focus:ring-offset-graphene-950"
            >
              Preferences
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
