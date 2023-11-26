"use client";
import { ActivityModel } from "@/app/model/ActivityModel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAllActivitiesByProjectId } from "../service/fetcher";
import Typography from "@mui/material/Typography/Typography";
import { ActivityColumn } from "./ActivityColumn";

export const ActivitiesListBoard = ({ projectId }: { projectId: string }) => {
  const session = useSession();
  const [activitiesList, setActivitiesList] = useState<ActivityModel[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    if (session.data?.user) {
      const {
        user: { idToken },
      } = session.data;
      getAllActivitiesByProjectId(+projectId, idToken)
        .then((data) => setActivitiesList(data))
        .catch(() => setIsError(true))
        .finally(() => setIsFetching(false));
    }
  }, [session, projectId]);

  const toDoActivityList = activitiesList.filter(
    (activity) => activity.status === "TODO"
  );
  const inProgressActivityList = activitiesList.filter(
    (activity) => activity.status === "IN_PROGRESS"
  );
  const reviewActivityList = activitiesList.filter(
    (activity) => activity.status === "REVIEW"
  );
  const revisionActivityList = activitiesList.filter(
    (activity) => activity.status === "REVISION"
  );
  const doneActivityList = activitiesList.filter(
    (activity) => activity.status === "DONE"
  );
  const archiveActivityList = activitiesList.filter(
    (activity) => activity.status === "ARCHIVE"
  );

  if (isFetching) return <Typography px={2} variant="h6" mb={"1rem"}>Loading...</Typography>;

  return (
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
        <ActivityColumn status={"Archive"} activityList={archiveActivityList} />
      </div>
    </div>
  );
};
