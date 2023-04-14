import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { DragEvent, FC } from "react";
import { Entry } from "../../interfaces";
import { useDrawerStore } from "../../store/ui/uiStore";

interface IEntryCard {
  entry: Entry;
}

export const EntryCard: FC<IEntryCard> = ({ entry }) => {
  const { startDragging, endDragging } = useDrawerStore();
  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = () => {
    endDragging();
  };

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">Hace 30 min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
