"use client";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import { useState } from "react";
import { PasswordVisibility } from "./PasswordVisibility";

export const PasswordInputField = ({
  label = "Password",
  isError = false,
}: {
  label?: string;
  isError?: boolean;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleSetPasswordVisibility = () =>
    setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);

  return (
    <FormControl margin="normal" fullWidth required>
      <InputLabel error={isError}>{label}</InputLabel>
      <OutlinedInput
        autoComplete="on"
        id="password"
        name="password"
        label={label}
        type={isPasswordVisible ? "text" : "password"}
        error={isError}
        endAdornment={
          <PasswordVisibility
            isPasswordVisible={isPasswordVisible}
            setPasswordVisibility={handleSetPasswordVisibility}
          />
        }
      />
    </FormControl>
  );
};
