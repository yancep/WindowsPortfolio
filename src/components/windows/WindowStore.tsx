"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

export type WindowType = 'browser';

export interface WindowInstance {
  id: string;
  type: WindowType;
  title: string;
  z: number;
  minimized: boolean;
}

interface WindowStoreValue {
  windows: WindowInstance[];
  openWindow: (type: WindowType, opts?: Partial<Pick<WindowInstance, 'title'>>) => string;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  getFirstByType: (type: WindowType) => WindowInstance | undefined;
}

const WindowStoreContext = createContext<WindowStoreValue | null>(null);

export function WindowStoreProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const zCounter = useRef(100);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map(w => w.id === id ? { ...w, z: ++zCounter.current } : w));
  }, []);

  const openWindow = useCallback((type: WindowType, opts?: Partial<Pick<WindowInstance, 'title'>>) => {
    const id = `${type}-${Date.now()}`;
    const title = opts?.title || (type === 'browser' ? 'Microsoft Edge' : 'Window');
    const z = ++zCounter.current;
    setWindows(prev => [...prev, { id, type, title, z, minimized: false }]);
    return id;
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  }, []);

  const value = useMemo(() => ({ windows, openWindow, closeWindow, focusWindow, minimizeWindow }), [windows, openWindow, closeWindow, focusWindow, minimizeWindow]);
  const getFirstByType = useCallback((type: WindowType) => windows.find(w => w.type === type), [windows]);

  const valueFull = useMemo(() => ({ ...value, getFirstByType }), [value, getFirstByType]);

  return (
    <WindowStoreContext.Provider value={valueFull}>{children}</WindowStoreContext.Provider>
  );
}

export function useWindowStore() {
  const ctx = useContext(WindowStoreContext);
  if (!ctx) throw new Error('useWindowStore must be used within WindowStoreProvider');
  return ctx;
}


