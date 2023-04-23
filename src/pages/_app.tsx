import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useEntriesStore } from "../../store/entries/entriesStore";
import { lightTheme, darkTheme } from "../../themes/";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function App({ Component, pageProps }: AppProps) {
  const { initializeEntries } = useEntriesStore();

  useEffect(() => {
    initializeEntries();
  }, []);

  return (
    <SnackbarProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SnackbarProvider>
  );
}
