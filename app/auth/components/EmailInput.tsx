import TextField from "@mui/material/TextField/TextField";

export const EmailInputField = ({ isError = false }: { isError?: boolean }) => {
  return (
    <TextField
      id="email"
      name="email"
      type="email"
      label="Email Address"
      margin="normal"
      error={isError}
      fullWidth
      required
    />
  );
};
