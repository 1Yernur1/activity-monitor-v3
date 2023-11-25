"use client";
import { ActivityModel } from "@/app/model/ProjectModel";
import { Card, CardContent, IconButton, Typography } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { ActivityLanguage } from "./ActivityLanguage";
import { ActivityTargetLanguage } from "./ActivityTargetLanguage";
import { ActivityDate } from "./ActivityDate";
import { ActivityTranslator } from "./ActivityTranslator";
import { useState } from "react";
import { FloatingMenu } from "./FloatingMenu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ActivityCard = ({
  activity: {
    title,
    language,
    targetLanguage,
    createdAt,
    translator: { firstName, lastName },
  },
}: {
  activity: ActivityModel;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onClose = () => setAnchorEl(null);

  const onClick = () => {
    onClose();
    const params = new URLSearchParams(searchParams);
    params.set("isOpen", "true");
    replace(`${pathname}?${params.toString()}`);
  };
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  return (
    <>
      <Card sx={{ width: 275 }}>
        <CardContent>
          <div className="mb-2 flex justify-between items-center">
            <Typography>{title}</Typography>
            <IconButton onClick={handleOpenMenu}>
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
      <FloatingMenu {...{ open, anchorEl, onClose, onClick }} />
    </>
  );
};