import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

// --- Types ---

export type SetupMode = 'Desk' | 'Travel' | 'Gaming';

export interface Settings {
  reduceMotion: boolean;
  showSpecStrips: boolean;
  defaultSetupMode: SetupMode;
}

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
}

// --- Context ---

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

function useSettingsContext(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

export { useSettingsContext as useSettings };

// --- Helpers ---

const STORAGE_KEY = 'settings';

const DEFAULTS: Settings = {
  reduceMotion: false,
  showSpecStrips: true,
  defaultSetupMode: 'Desk',
};

const VALID_SETUP_MODES: SetupMode[] = ['Desk', 'Travel', 'Gaming'];

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Validate fields, fall back to defaults for invalid values
      return {
        reduceMotion: typeof parsed.reduceMotion === 'boolean' ? parsed.reduceMotion : DEFAULTS.reduceMotion,
        showSpecStrips: typeof parsed.showSpecStrips === 'boolean' ? parsed.showSpecStrips : DEFAULTS.showSpecStrips,
        defaultSetupMode:
          VALID_SETUP_MODES.includes(parsed.defaultSetupMode)
            ? parsed.defaultSetupMode
            : DEFAULTS.defaultSetupMode,
      };
    }
  } catch {
    // ignore corrupt data
  }
  return { ...DEFAULTS };
}

function saveSettings(settings: Settings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// --- Provider ---

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      saveSettings(next);
      return next;
    });
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, updateSettings }),
    [settings, updateSettings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
