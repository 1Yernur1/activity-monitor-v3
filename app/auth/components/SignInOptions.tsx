import { Checkbox, Link } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Grid from "@mui/material/Grid/Grid";

export const SignInOptions = () => {
  return (
    <Grid container alignItems="center">
      <Grid item xs>
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
        />
      </Grid>
      <Grid item xs className="text-right">
        <Link href="https://activity-monitor-v2.vercel.app/auth/email-verification">Forgot password?</Link>
      </Grid>
    </Grid>
  );
};
