import { List, Paper } from "@mui/material";
import React, { FC, useMemo } from "react";
import { EntryStatus } from "../../interfaces";
import { useEntriesStore } from "../../store/entries/entriesStore";
import { EntryCard } from "./EntryCard";

interface IEntry {
  status: EntryStatus;
}

export const EntryList: FC<IEntry> = ({ status }) => {
  const entries = useEntriesStore((state) => state.entries);
  const entriesByStatus = useMemo(
    () => entries.filter((item: any) => item.status === status),
    [entries]
  );
  return (
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List sx={{ opacity: 1 }}>
          {entriesByStatus.map((item: any) => (
            <EntryCard key={item._id} entry={item} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
