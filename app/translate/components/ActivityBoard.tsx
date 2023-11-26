"use client";
import { getAllTranslatorActivities } from "../service/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ActivityModel } from "@/app/model/ActivityModel";
import { Typography } from "@mui/material";
import { ActivityCard } from "./ActivityCard";

export const ActivityBoard = () => {
  const session = useSession();
  const [activityList, setActivityList] = useState<ActivityModel[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (session.data?.user) {
      const {
        user: { userId, idToken },
      } = session.data;
      getAllTranslatorActivities(userId, idToken)
        .then((activities) => setActivityList(activities))
        .catch((error) => console.log(error))
        .finally(() => setIsFetching(false));
    }
  }, [session]);

  if (isFetching) return <Typography>Loading...</Typography>;

  return (
    <div>
      {activityList.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};
