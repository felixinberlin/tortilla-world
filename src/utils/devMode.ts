/**
 * FILE: devMode.ts
 *
 * PURPOSE:
 * Utilities for detecting Dev Mode vs Publish Mode (Slim/Thin mode).
 */

import { useState, useEffect } from 'react';

export function isDevMode(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);

  const devParam = params.get('dev');
  const modeParam = params.get('mode');

  // Explicit overrides
  if (devParam === 'false' || devParam === '0' || modeParam === 'publish' || modeParam === 'prod') {
    return false;
  }

  if (devParam === 'true' || devParam === '1' || modeParam === 'dev') {
    return true;
  }

  // Default: True in AI Studio / local Vite dev environment, False in production build
  return Boolean(import.meta.env.DEV);
}

export function useDevMode(): boolean {
  const [devMode, setDevMode] = useState<boolean>(isDevMode);

  useEffect(() => {
    const handleCheck = () => setDevMode(isDevMode());
    window.addEventListener('popstate', handleCheck);
    return () => window.removeEventListener('popstate', handleCheck);
  }, []);

  return devMode;
}
