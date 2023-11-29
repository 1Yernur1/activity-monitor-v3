"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ActivityInfoView } from "./ActivityInfoView";
import { ActivityModel } from "@/app/model/ActivityModel";
import { useSession } from "next-auth/react";
import { getActivityById } from "@/app/home/service/fetcher";

export const ActivityInfoModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("activityInfo");
  const activityId = searchParams.get("activityInfo");
  const [activity, setActivity] = useState<ActivityModel>({} as ActivityModel);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session.data?.user && activityId) {
      const { user } = session.data;
      const { idToken } = user;
      getActivityById(+activityId, idToken)
        .then((data) => setActivity(data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [session]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("activityInfo");
    router.replace(`${pathname}?${params}`);
  };

  const loading = isLoading && <Typography>Loading...</Typography>;
  const error = isError && (
    <p className="text-red-500 text-center">Something wrong</p>
  );

  const content = !(isLoading || isError) && (
    <ActivityInfoView activity={activity} />
  );

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Activity Info</DialogTitle>
      <DialogContent>
        {loading}
        {content}
        {error}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};
