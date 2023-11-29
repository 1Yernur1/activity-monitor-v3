"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createActivityLogDaily } from "../service/fetcher";

export const ActivityLogModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("logInfo");
  const activityId = searchParams.get("logInfo");
  const [hoursCompleted, setHoursCompleted] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const date = new Date();
  const dayOfWeek = date.getDay();
  const todayIsFriday = dayOfWeek === 5;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("logInfo");
    router.replace(`${pathname}?${params}`);
  };

  const handleCreateLog = () => {
    setIsDisabled(true);
    setIsLoading(true);
    if (session.data?.user && activityId) {
      const { user } = session.data;
      const { idToken } = user;
      const body = !todayIsFriday
        ? {
            hoursCompleted: hoursCompleted,
          }
        : {
            hoursCompleted: hoursCompleted,
            hoursRemaining: hoursRemaining,
          };
      !todayIsFriday
        ? handleCreateActivityLogDaily(+activityId, body, idToken)
        : handleCreateActivityLogWeekly(+activityId, body, idToken);
    }
  };

  const handleCreateActivityLogDaily = (
    activityId: number,
    body: any,
    idToken: string
  ) => {
    createActivityLogDaily(+activityId, body, idToken)
      .then(() => {
        const params = new URLSearchParams();
        params.delete("logInfo");
        router.replace(`${pathname}?${params}`);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsDisabled(false);
        setIsLoading(false);
      });
  };

  const handleCreateActivityLogWeekly = (
    activityId: number,
    body: any,
    idToken: string
  ) => {
    createActivityLogDaily(+activityId, body, idToken)
      .then(() => {
        const params = new URLSearchParams();
        params.delete("logInfo");
        router.replace(`${pathname}?${params}`);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsDisabled(false);
        setIsLoading(false);
      });
  };

  const loading = isLoading && <Typography>Loading...</Typography>;
  const error = isError && (
    <p className="text-red-500 text-center">Something wrong</p>
  );
  const content = !(isLoading || isError) && (
    <>
      <FormControl fullWidth variant="filled">
        <InputLabel>Select Hours</InputLabel>
        <Select
          onChange={(e) => setHoursCompleted(+e.target.value)}
          value={hoursCompleted}
        >
          {Array.from({ length: 8 }, (_, index) => index + 1).map((index) => (
            <MenuItem key={index} value={index}>
              {index}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {todayIsFriday && (
        <TextField
          margin="dense"
          fullWidth
          label="Select Remaining Hours"
          type="number"
          variant="filled"
          defaultValue={hoursRemaining}
          onChange={(e) => setHoursRemaining(+e.target.value)}
        />
      )}
    </>
  );

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Activity Logging</DialogTitle>
      <DialogContent>
        {loading}
        {content}
        {error}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleCreateLog}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
