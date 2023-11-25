import { Chip, Typography } from "@mui/material";

export const ActivityLanguage = ({ language }: { language: string }) => {
  return (
    <div className="flex justify-between">
      <Typography variant="body1">Language:</Typography>
      <Chip
        label={language}
        color="info"
        size="small"
        sx={{ textTransform: "uppercase", borderRadius: ".25rem" }}
      />
    </div>
  );
};
