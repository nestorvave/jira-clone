import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC } from "react";
import { DrawerJira, Navbar } from "../ui";

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export const Layout: FC<Props> = ({ title = "Open Jira", children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <DrawerJira />
      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
