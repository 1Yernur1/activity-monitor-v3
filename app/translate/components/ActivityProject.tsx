import Typography from "@mui/material/Typography/Typography";

export const ActivityProject = ({ projectName }: { projectName: string }) => {
  return (
    <div className="flex justify-between">
      <Typography variant="body1">Project:</Typography>
      <Typography fontWeight={500}>{projectName}</Typography>
    </div>
  );
};
