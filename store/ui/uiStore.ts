import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
interface IUi {
  sideMenuOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create(
  persist(
    (set, get) => ({
      sideMenuOpen: true,
      openDrawer: () => set((state: any) => ({ ...state, sideMenuOpen: true })),
      closeDrawer: () =>
        set((state: any) => ({ ...state, sideMenuOpen: false })),
    }),
    {
      name: "drawer-store",
    }
  )
);
