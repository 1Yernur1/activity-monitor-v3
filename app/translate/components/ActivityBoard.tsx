"use client";
import { getAllTranslatorActivities } from "../service/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ActivityModel } from "@/app/model/ActivityModel";
import { Typography } from "@mui/material";
import { ActivityColumn } from "./ActivityColumn";
import { staticStatusList } from "../service/data";

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

  const statusLists = {
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    REVISION: [],
    DONE: [],
    ARCHIVE: [],
  };

  const toDoActivityList = activityList.filter(
    (activity) => activity.status === "TODO"
  );
  const inProgressActivityList = activityList.filter(
    (activity) => activity.status === "IN_PROGRESS"
  );
  const reviewActivityList = activityList.filter(
    (activity) => activity.status === "REVIEW"
  );
  const revisionActivityList = activityList.filter(
    (activity) => activity.status === "REVISION"
  );
  const doneActivityList = activityList.filter(
    (activity) => activity.status === "DONE"
  );
  const archiveActivityList = activityList.filter(
    (activity) => activity.status === "ARCHIVE"
  );

  return (
    <div className="h-full">
      <div className="overflow-auto h-full col-start-1 col-span-full">
        <div className="min-w-[112.5rem] grid grid-cols-6 gap-x-2 px-4">
          <ActivityColumn status={"To do"} activityList={toDoActivityList} />
          <ActivityColumn
            status={"In Progress"}
            activityList={inProgressActivityList}
          />
          <ActivityColumn status={"Review"} activityList={reviewActivityList} />
          <ActivityColumn
            status={"Revision"}
            activityList={revisionActivityList}
          />
          <ActivityColumn status={"Done"} activityList={doneActivityList} />
          <ActivityColumn
            status={"Archive"}
            activityList={archiveActivityList}
          />
        </div>
      </div>
    </div>
  );
};
