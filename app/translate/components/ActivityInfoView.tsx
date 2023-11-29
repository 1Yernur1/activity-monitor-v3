import { ActivityModel } from "@/app/model/ActivityModel";
import { Typography } from "@mui/material";

export const ActivityInfoView = ({
  activity: { hoursRemaining, totalHoursCompleted, percentageCompleted },
}: {
  activity: ActivityModel;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <Typography variant="body1">Activity hours remaining:</Typography>
        <Typography fontWeight={500}>{"0" || hoursRemaining}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography variant="body1">Activity hours completed:</Typography>
        <Typography fontWeight={500}>{totalHoursCompleted}</Typography>
      </div>
      <div className="flex justify-between">
        <Typography variant="body1">Completed:</Typography>
        <Typography fontWeight={500}>{percentageCompleted}%</Typography>
      </div>
    </div>
  );
};
