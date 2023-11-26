import { ActivityModel } from "@/app/model/ActivityModel";
import { ActivityCard } from "./ActivityCard";
import { Typography } from "@mui/material";

export const ActivityColumn = ({
  activityList,
  status,
}: {
  activityList: ActivityModel[];
  status: string;
}) => {
  return (
    <div>
      <Typography variant="h6" mb={"1rem"}>
        {status}
      </Typography>
      <div className="flex flex-col gap-4">
        {activityList.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};
