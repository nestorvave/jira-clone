import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Layout } from "../../components/layouts";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { EntryCard, EntryList, NewEntry } from "../../components/ui";
const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <Layout title=" Home - Open Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Pendings" />

            <NewEntry />
            <EntryList status={"pending"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="In progress" />

            <EntryList status={"in-progress"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="Done" />

            <EntryList status={"finished"} />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
