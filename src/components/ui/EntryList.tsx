import { List, Paper } from "@mui/material";
import { EntryCard } from "./EntryCard";
import "./EntryList.scss";
import { EntryStatus } from "../../interfaces/entries";
import { EntriesContext } from "@/context/entries/EntriesContext";
import { useContext, useMemo } from "react";
import { UIContext } from "@/context/ui/UIcontext";

export const EntryList = ({ status }: { status: EntryStatus }) => {
  const { entries, updatedEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    console.log({ id });

    const entry = entries.find((e) => e._id === id)!;
    entry['status'] = status;
    updatedEntry(entry)
    endDragging();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className={isDragging ? "dragging" : ""} onDrop={onDrop} onDragOver={allowDrop} >
      <Paper
        className="paper"
        sx={{
          height: "700px",
          maxHeight: "calc(100vh - 200px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "10px",
        }}
      >
        {/* TODO: cambiara dependiendo si esta haciendo drag o no*/}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
