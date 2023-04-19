import { create } from "zustand";
import { Entry } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

interface IEntriesState {
  entries: Entry[];
  addEntry: (description: string) => void;
  updateEntry: (payload: Entry) => void;
}

export const useEntriesStore = create<IEntriesState>((set, get) => ({
  entries: [
  ],
  addEntry: (description: string) => {
    set((state) => ({
      entries: [
        ...state.entries,
        {
          _id: uuidv4(),
          description,
          status: "pending",
          createdAt: Date.now(),
        },
      ],
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
}));
