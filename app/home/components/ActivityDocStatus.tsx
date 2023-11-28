import { Typography } from "@mui/material";

export const ActivityDocStatus = ({
  docxUploaded,
}: {
  docxUploaded: boolean;
}) => {
  const isDocumentUploaded = docxUploaded ? "Yes" : "No";
  return (
    <div className="flex justify-between">
      <Typography variant="body1">Document uploaded:</Typography>
      <Typography fontWeight={500}>{isDocumentUploaded}</Typography>
    </div>
  );
};
