import { Typography } from "@mui/material";
import { getFormattedDate } from "../service/formatter";

export const ActivityDate = ({
  description,
  date,
}: {
  description: string;
  date: string;
}) => {
  const formattedDate = getFormattedDate(date);
  return (
    <div className="flex justify-between">
      <Typography variant="body1">{description}:</Typography>
      <Typography fontWeight={500}>{formattedDate}</Typography>
    </div>
  );
};
