import { Chip, Typography } from "@mui/material";

export const ActivityTargetLanguage = ({
  targetLanguage,
}: {
  targetLanguage: string;
}) => {
  return (
    <div className="flex justify-between">
      <Typography variant="body1">Target Language:</Typography>
      <Chip
        label={targetLanguage}
        color="success"
        size="small"
        sx={{ textTransform: "uppercase", borderRadius: ".25rem" }}
      />
    </div>
  );
};
