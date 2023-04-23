import { MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Link ,
} from "@mui/material";
import { useDrawerStore } from "../../store/ui/uiStore";
import NextLink from "next/link";

export const Navbar = () => {
  const openModal = useDrawerStore((state) => state.openDrawer);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openModal}>
          <MenuOutlined />
        </IconButton>

        <NextLink href="/" passHref legacyBehavior>
          <Link underline="none" color="white">
            <Typography variant="h6">Open Jira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
