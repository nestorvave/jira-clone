import { create } from "zustand";
import { Entry } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { entriesApi } from "../../apis";

interface IEntriesState {
  entries: Entry[];
  addEntry: (description: string) => void;
  updateEntry: (payload: Entry) => void;
  initializeEntries: () => Promise<void>;
}

export const useEntriesStore = create<IEntriesState>((set, get) => ({
  entries: [],
  addEntry: async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    set((state) => ({
      entries: [...state.entries, data],
    }));
  },
  updateEntry: (payload: Entry) => {
    set((state) => ({
      ...state,
      entries: state.entries.map((entry) => {
        if (entry._id === payload._id) {
          entry.status = payload.status;
          entry.description = payload.description;
        }
        return entry;
      }),
    }));
  },
  initializeEntries: async () => {
    try {
      const { data } = await entriesApi.get<Entry[]>("/entries");
      set((state) => ({ entries: data }));
    } catch (error) {
      console.error(error);
    }
  },
}));
