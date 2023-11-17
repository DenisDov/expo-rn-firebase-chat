import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Callbacks for handling app state changes.
 */
type AppStateCallbacks = {
  /**
   * Callback invoked when the app state changes.
   * @param newAppState - The new app state.
   */
  onChange?: (newAppState: AppStateStatus) => void;
  /**
   * Callback invoked when the app enters the foreground.
   */
  onForeground?: () => void;
  /**
   * Callback invoked when the app enters the background.
   */
  onBackground?: () => void;
};

/**
 * Return type of the useAppState hook.
 */
type UseAppStateReturn = {
  /**
   * The current app state.
   */
  appState: AppStateStatus;
};

/**
 * Hook for managing app state changes.
 * @param callbacks - Callbacks for handling app state changes.
 * @returns An object containing the current app state.
 */
export const useAppState = ({
  onChange,
  onForeground,
  onBackground,
}: AppStateCallbacks): UseAppStateReturn => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState<AppStateStatus>(
    appState.current,
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        onForeground
      ) {
        onForeground();
      } else if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/) &&
        onBackground
      ) {
        onBackground();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      onChange && onChange(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [onChange, onForeground, onBackground]);

  return { appState: appStateVisible };
};
