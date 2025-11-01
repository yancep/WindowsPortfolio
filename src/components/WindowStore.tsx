"use client";

import { create } from "zustand";

export type WindowType = "browser";

export interface WindowInstance {
  id: string;
  type: WindowType;
  title: string;
  z: number;
  minimized: boolean;
}

interface WindowStore {
  windows: WindowInstance[];
  openWindow: (type: WindowType, opts?: Partial<Pick<WindowInstance, "title">>) => string;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  getFirstByType: (type: WindowType) => WindowInstance | undefined;
}

let zCounter = 100;

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],

  openWindow: (type, opts) => {
    const id = `${type}-${Date.now()}`;
    const title = opts?.title || (type === "browser" ? "Microsoft Edge" : "Window");
    const z = ++zCounter;
    set((state) => ({
      windows: [...state.windows, { id, type, title, z, minimized: false }],
    }));
    return id;
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }));
  },

  focusWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, z: ++zCounter } : w
      ),
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    }));
  },

  getFirstByType: (type) => get().windows.find((w) => w.type === type),
}));
