import { LockOutlined } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar/Avatar";

export const SignInAvatar = () => {
  return (
    <Avatar sx={{ bgcolor: "black" }}>
      <LockOutlined />
    </Avatar>
  );
};
