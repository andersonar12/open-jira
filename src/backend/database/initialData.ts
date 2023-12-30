import { EntryStatus } from "@/interfaces/entries";

interface Entry {
  description: string;
  createdAt: number;
  status: EntryStatus;
}

interface InitialData {
  entries: Entry[];
}

export const initialData: InitialData = {
  entries: [
    {
      description:
        "Pendiente lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description:
        "En progreso lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      description:
        "Finalizado lorem ipsum dolor sit amet consectetur lorem ipsum dolor sit amet consectetur",
      createdAt: Date.now() - 1000000,
      status: "finished",
    },
  ],
};
