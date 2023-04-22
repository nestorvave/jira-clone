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
import React from "react";
import { Layout } from "../../../components/layouts";
import { EntryStatus } from "../../../interfaces";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

export const EntryPage = () => {
  return (
    <Layout title="">
      <Grid container justifyContent="center" mt={2}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title="Entry: " subheader={`Created  ... ago`} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                placeholder="New Entry"
                autoFocus
                multiline
                label="Update Entry"
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row>
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
export default EntryPage;
