import { useEffect, useRef } from 'react';

type ShortcutCallback = () => void;

const useKeyBind = () => {
  const shortcuts = useRef(new Map<string, ShortcutCallback>());
  const isEnabled = useRef(true);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isEnabled.current) return;

    // Create a normalized key combination string
    console.log('event.key', event.key);
    const keys = [
      event.metaKey ? 'Meta' : null,
      event.ctrlKey ? 'Control' : null,
      event.shiftKey ? 'Shift' : null,
      event.key.length === 1 ? event.key.toUpperCase() : event.key, // Only uppercase single character keys
    ]
      .filter(Boolean)
      .join('+');

    // Check if the shortcut exists in the map
    if (shortcuts.current.has(keys)) {
      //   event.preventDefault();
      //   event.stopPropagation();

      const callback = shortcuts.current.get(keys);
      if (callback) {
        event.preventDefault();
        event.stopPropagation();

        callback();
      }
    }
  };

  const registerShortcut = (keys: string, callback: ShortcutCallback) => {
    // Register the shortcut after normalizing the keys
    const normalizedKeys = keys;
    console.log('registering keys', normalizedKeys);
    shortcuts.current.set(normalizedKeys, callback);
  };

  const enableShortcuts = () => {
    isEnabled.current = true;
  };

  const disableShortcuts = () => {
    isEnabled.current = false;
  };

  const destroyShortcuts = () => {
    document.removeEventListener('keydown', handleKeyDown);
    shortcuts.current.clear();
  };

  useEffect(() => {
    // enableShortcuts();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      destroyShortcuts();
    };
  }, []);

  return {
    registerShortcut,
    enableShortcuts,
    disableShortcuts,
    destroyShortcuts,
  };
};

export default useKeyBind;
