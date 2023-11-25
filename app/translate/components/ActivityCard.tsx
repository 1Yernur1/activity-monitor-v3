import { ActivityModel } from "@/app/model/ProjectModel";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { ActivityLanguage } from "./ActivityLanguage";
import { ActivityTargetLanguage } from "./ActivityTargetLanguage";
import { ActivityDate } from "./ActivityDate";

export const ActivityCard = ({
  activity: { title, language, targetLanguage, createdAt },
}: {
  activity: ActivityModel;
}) => {
  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <div className="mb-2 flex justify-between items-center">
          <Typography>{title}</Typography>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-1">
          <ActivityLanguage language={language} />
          <ActivityTargetLanguage targetLanguage={targetLanguage} />
          <ActivityDate description={"Created Date"} date={createdAt} />
        </div>
      </CardContent>
    </Card>
  );
};
