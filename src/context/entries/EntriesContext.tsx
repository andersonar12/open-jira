import { Entry } from "@/interfaces/entries";
import { createContext } from "react";

export interface ContextProps {
  entries: Array<Entry>;
  addEntry: (description: string) => void;
  updatedEntry: (entry: Entry) => void;
  deleteEntry: (id: string) => Promise<void>;
  isAdding: boolean;
  setIsAdding: () => void;
}

export const EntriesContext = createContext({} as ContextProps);
