"use client";
import { ActivityModel } from "@/app/model/ActivityModel";
import { ActivityDate } from "@/app/translate/components/ActivityDate";
import { ActivityLanguage } from "@/app/translate/components/ActivityLanguage";
import { ActivityTargetLanguage } from "@/app/translate/components/ActivityTargetLanguage";
import { ActivityTranslator } from "@/app/translate/components/ActivityTranslator";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export const ActivityCard = ({
  activity: {
    id,
    title,
    language,
    targetLanguage,
    createdAt,
    status,
    projectName,
    projectId,
    translator: { firstName, lastName },
  },
}: {
  activity: ActivityModel;
}) => {
  return (
    <>
      <Card sx={{ width: 275 }}>
        <CardContent>
          <div className="mb-2 flex justify-between items-center">
            <Typography>{title}</Typography>
            <IconButton onClick={() => {}}>
              <MoreHorizOutlinedIcon />
            </IconButton>
          </div>
          <div className="flex flex-col gap-1">
            <ActivityLanguage language={language} />
            <ActivityTargetLanguage targetLanguage={targetLanguage} />
            <ActivityDate description={"Created Date"} date={createdAt} />
            <ActivityTranslator {...{ firstName, lastName }} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
