import { Typography } from "@mui/material";
import { getFormattedFullName } from "../service/formatter";

export const ActivityTranslator = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const translatorFullName = getFormattedFullName(
    firstName,
    lastName
  );
  return (
    <div className="flex justify-between">
      <Typography variant="body1">Translator:</Typography>
      <Typography fontWeight={500}>{translatorFullName}</Typography>
    </div>
  );
};
