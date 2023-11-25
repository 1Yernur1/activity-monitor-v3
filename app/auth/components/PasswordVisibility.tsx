import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

export const PasswordVisibility = ({
  isPasswordVisible,
  setPasswordVisibility,
}: {
  isPasswordVisible: boolean;
  setPasswordVisibility: () => void;
}) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={setPasswordVisibility}>
        {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};
