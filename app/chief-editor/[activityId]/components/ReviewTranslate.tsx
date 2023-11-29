import { TextField } from "@mui/material";

export const ReviewTranslate = ({
  id,
  translationTextProps,
}: {
  id: number;
  translationTextProps: string;
}) => {
  return (
    <div className="flex">
      <TextField
        defaultValue={translationTextProps}
        fullWidth
        multiline
        disabled
      />
    </div>
  );
};
