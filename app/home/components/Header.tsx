import { SignOutButton } from "@/app/components/SignOutButton";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { CreateActivityButton } from "./CreateActivityButton";

export const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>Activity monitoring</Typography>
        <div className="flex gap-4">
          <CreateActivityButton />
          <SignOutButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};
