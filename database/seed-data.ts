interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Chelsea vs madrid",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "PSG vs madrid",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Liverpool vs madrid",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
