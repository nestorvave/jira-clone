import {
  AddCircleOutline,
  Diversity2Rounded,
  SaveOutlined,
} from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { shallow } from "zustand/shallow";
import { useEntriesStore } from "../../store/entries/entriesStore";
import { useDrawerStore } from "../../store/ui/uiStore";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const { addEntry } = useEntriesStore();
  const { isAddingEntry, setIsAddingEntry } = useDrawerStore(
    (state: any) => ({
      isAddingEntry: state.isAddingEntry,
      setIsAddingEntry: state.setIsAddingEntry,
    }),
    shallow
  );

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) return;
    addEntry(inputValue);
    setInputValue("");
    setTouched(false);
    setIsAddingEntry(false);
  };
  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {typeof window !== "undefined" && isAddingEntry ? (
        <Box>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            value={inputValue}
            multiline
            error={inputValue.length <= 0 && touched}
            label="Nueva entrada"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onTextChange(e)}
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAddingEntry(false)}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onSave}
              endIcon={<SaveOutlined />}
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          onClick={() => setIsAddingEntry(true)}
          startIcon={<AddCircleOutline />}
          fullWidth
          variant="outlined"
        >
          Add Task
        </Button>
      )}
    </Box>
  );
};
