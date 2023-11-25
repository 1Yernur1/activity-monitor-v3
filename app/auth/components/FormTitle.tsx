import Typography from "@mui/material/Typography/Typography";

export const FormTitle = ({ title }: { title: string }) => {
  return (
    <Typography component="h1" fontWeight={700} fontSize={32}>
      {title}
    </Typography>
  );
};
