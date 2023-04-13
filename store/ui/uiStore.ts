import { persist } from "zustand/middleware";
import { create } from "zustand";

interface IUi {
  sideMenuOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  isAddingEntry: boolean;
  setIsAddingEntry: (payload: boolean) => void;
}

export const useDrawerStore = create<IUi>((set, get) => ({
  sideMenuOpen: false,
  isAddingEntry: false,
  openDrawer: () => set((state: any) => ({ ...state, sideMenuOpen: true })),
  closeDrawer: () => set((state: any) => ({ ...state, sideMenuOpen: false })),

  setIsAddingEntry: (payload: boolean) =>
    set((state: any) => ({ ...state, isAddingEntry: payload })),
}));
