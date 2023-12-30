import { useEffect, useReducer } from "react";
import { EntriesContext } from "./EntriesContext";
import { entriesReducer } from "./entriesReducer";
import { Entry } from "@/interfaces/entries";
import entriesApi from "@/backend/api/entriesAPI";

export interface EntriesState {
  entries: Array<Entry>;
  isAdding: boolean;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
  isAdding: false,
};

export const EntriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addEntry = async (description: string) => {
    // const newEntry: Entry = {
    //   _id: uuidv4(),
    //   description,
    //   createdAt: Date.now(),
    //   status: "pending",
    // }

    const { data } = await entriesApi.post("/entries", { description });

    dispatch({ type: "Entries - AddEntry", payload: data.entry });
  };

  const updatedEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put(`/entries/${_id}`, { description, status });

      dispatch({ type: "Entries - UPDATED-ENTRY", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEntry = async (_id: string) => {
    try {
      await entriesApi.delete(`/entries/${_id}`);

      dispatch({ type: "Entries - DELETE-ENTRY", payload: _id });
    } catch (error) {
      console.error(error);
    }
  };

  const setIsAdding = () => {
    dispatch({ type: "Entries - isAdding" });
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get("/entries");
    console.log(data);
    dispatch({ type: "Entries - Refresh-Entries", payload: data.entries });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Metodos
        addEntry,
        updatedEntry,
        deleteEntry,
        setIsAdding,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
