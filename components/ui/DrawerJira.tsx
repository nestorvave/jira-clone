import { InboxOutlined, MailLockOutlined } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { useDrawerStore } from "../../store/ui/uiStore";
import { shallow } from "zustand/shallow";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const DrawerJira = () => {
  const { sideMenuOpen, closeDrawer } = useDrawerStore((state: any) => ({
    sideMenuOpen: state.sideMenuOpen,
    closeDrawer: state.closeDrawer,
  }));

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={() => closeDrawer()}>
      <Box sx={{ width: "250px" }}></Box>
      <Box sx={{ padding: "5px 10px" }}>
        <Typography variant="h4">Menú</Typography>
      </Box>
      <List>
        {menuItems.map((text: string, index: number) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 ? <InboxOutlined /> : <MailLockOutlined />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItems.map((text: string, index: number) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 ? <InboxOutlined /> : <MailLockOutlined />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
