import { create } from "zustand";
import { Entry } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

interface IEntriesState {
  entries: Entry[];
  addEntry: (description: string) => void;
}

export const useEntriesStore = create<IEntriesState>((set, get) => ({
  entries: [
    {
      _id: uuidv4(),
      description: "Chelsea vs madrid",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "PSG vs madrid",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description: "Liverpool vs madrid",
      status: "finished",
      createdAt: Date.now(),
    },
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
}));
