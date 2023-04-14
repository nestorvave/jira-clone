import { List, Paper } from "@mui/material";
import React, { DragEvent, FC, useMemo } from "react";
import { EntryStatus } from "../../interfaces";
import { useEntriesStore } from "../../store/entries/entriesStore";
import { useDrawerStore } from "../../store/ui/uiStore";
import { EntryCard } from "./EntryCard";
import styles from "./EntryList.module.css";

interface IEntry {
  status: EntryStatus;
}

export const EntryList: FC<IEntry> = ({ status }) => {
  const { entries, updateEntry } = useEntriesStore();
  const { isDragging, endDragging } = useDrawerStore();
  const entriesByStatus = useMemo(
    () => entries.filter((item: any) => item.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all 0.3s" }}>
          {entriesByStatus.map((item: any) => (
            <EntryCard key={item._id} entry={item} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
