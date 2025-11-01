import { create } from "zustand";

type JsonString = string;

export type SelectedItem = {
  id: string;
  metadata: JsonString;
};

interface SelectionStore {
  selectedIds: SelectedItem[];
  setSelected: (ids: SelectedItem[], additive?: boolean) => void;
  clear: () => void;
}

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selectedIds: [],

  setSelected: (ids, additive = false) =>
    set((state) => {
      if (!additive) return { selectedIds: ids };

      const map = new Map<string, SelectedItem>();
      state.selectedIds.forEach((s) => map.set(s.id, s));
      ids.forEach((s) => map.set(s.id, s));
      return { selectedIds: Array.from(map.values()) };
    }),

  clear: () => set({ selectedIds: [] }),
}));
