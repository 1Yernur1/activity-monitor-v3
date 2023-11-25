import { Button } from "@mui/material";

export const SubmitButton = ({
  buttonText,
  isSubmitButtonDisabled = false,
}: {
  buttonText: string;
  isSubmitButtonDisabled?: boolean;
}) => {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={isSubmitButtonDisabled}
      sx={{mt: 1}}
    >
      {buttonText}
    </Button>
  );
};
