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
  updateEntry: async ({ description, _id, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
    } catch (error) {
      console.log(error);
    }
    set((state) => ({
      ...state,
      entries: state.entries.map((entry) => {
        if (entry._id === _id) {
          entry.status = status;
          entry.description = description;
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
