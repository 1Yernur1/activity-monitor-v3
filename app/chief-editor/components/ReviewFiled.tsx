import { Typography } from "@mui/material";

export const ReviewField = ({
  filedKey,
  filedName,
}: {
  filedKey: string;
  filedName: string;
}) => {
  return (
    <div className="flex justify-between">
      <Typography variant="body1">{filedKey}:</Typography>
      <Typography fontWeight={500}>{filedName}</Typography>
    </div>
  );
};
