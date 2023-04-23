import { Delete, SaveOutlined } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  capitalize,
  IconButton,
} from "@mui/material";
import React, { ChangeEvent, useMemo, useState, FC } from "react";
import { Layout } from "../../../components/layouts";
import { EntryStatus } from "../../../interfaces";
import { GetServerSideProps } from "next";
import { isValidObjectId } from "mongoose";
import { dbEntries } from "../../../database";
import { Entry } from "../../../interfaces/entry";
import { useEntriesStore } from "../../../store/entries/entriesStore";
import { useSnackbar } from "notistack";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { status, description, createdAt } = entry;
  const [inputValue, setInputValue] = useState(description);
  const [currentStatus, setCurrentStatus] = useState<EntryStatus>(status);
  const [touched, setTouched] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  const { updateEntry } = useEntriesStore();

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(event.target.value as EntryStatus);
  };

  const onSave = async () => {
    try {
      if (inputValue.trim().length === 0) return 0;
      const updatedEntry: Entry = {
        ...entry,
        status: currentStatus,
        description: inputValue,
      };
      await updateEntry(updatedEntry);
      enqueueSnackbar("Entry updated", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      enqueueSnackbar("An error ocurred", {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    }
  };

  const isNotValidForm = useMemo(
    () => inputValue.length === 0 && touched,
    [inputValue, touched]
  );

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" mt={2}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entry: ${inputValue}`}
              subheader={`Created ${createdAt}  ... ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                placeholder="New Entry"
                autoFocus
                multiline
                label="Update Entry"
                value={inputValue}
                onChange={onTextChange}
                helperText={isNotValidForm && "Ingrese un valor"}
                onBlur={() => setTouched(true)}
                error={isNotValidForm}
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  onChange={onStatusChanged}
                  value={currentStatus}
                >
                  {validStatus.map((item: string) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={capitalize(item)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlined />}
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={inputValue.length === 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <Delete />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // your fetch function here
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { entry },
    };
  }
};

export default EntryPage;
