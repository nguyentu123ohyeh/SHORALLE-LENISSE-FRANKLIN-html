import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';

// --- Types ---

export type SetupMode = 'Desk' | 'Travel' | 'Gaming';

interface SetupModeContextValue {
  setupMode: SetupMode;
  setSetupMode: (mode: SetupMode) => void;
}

// --- Context ---

const SetupModeContext = createContext<SetupModeContextValue | undefined>(undefined);

function useSetupModeContext(): SetupModeContextValue {
  const context = useContext(SetupModeContext);
  if (context === undefined) {
    throw new Error('useSetupMode must be used within a SetupModeProvider');
  }
  return context;
}

export { useSetupModeContext as useSetupMode };

// --- Helpers ---

const STORAGE_KEY = 'setup-mode';
const VALID_MODES: SetupMode[] = ['Desk', 'Travel', 'Gaming'];

function loadSetupMode(): SetupMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_MODES.includes(stored as SetupMode)) {
      return stored as SetupMode;
    }
  } catch {
    // ignore
  }
  return 'Desk';
}

// --- Provider ---

export function SetupModeProvider({ children }: { children: ReactNode }) {
  const [setupMode, setSetupModeState] = useState<SetupMode>(loadSetupMode);

  const setSetupMode = useCallback((mode: SetupMode) => {
    setSetupModeState(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, []);

  const value = useMemo<SetupModeContextValue>(
    () => ({ setupMode, setSetupMode }),
    [setupMode, setSetupMode],
  );

  return <SetupModeContext.Provider value={value}>{children}</SetupModeContext.Provider>;
}
