import { AppBar, Toolbar, Typography } from "@mui/material";
import { SignOutButton } from "./SignOutButton";

export const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Activity monitoring</Typography>
        <SignOutButton />
      </Toolbar>
    </AppBar>
  );
};
