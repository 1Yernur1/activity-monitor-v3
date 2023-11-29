"use client";
import { ActivityModel } from "@/app/model/ActivityModel";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { ActivityLanguage } from "./ActivityLanguage";
import { ActivityTargetLanguage } from "./ActivityTargetLanguage";
import { ActivityDate } from "./ActivityDate";
import { ActivityTranslator } from "./ActivityTranslator";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ActivityProject } from "./ActivityProject";
import { ActivityDocStatus } from "./ActivityDocStatus";

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
    docxUploaded,
    isLoggedToday,
    translator: { firstName, lastName },
  },
}: {
  activity: ActivityModel;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const translatorStatusList = ["TODO", "IN_PROGRESS", "REVISION"];
  const isChangeableStatus = translatorStatusList.includes(status);
  const activityShowStatusList = ["IN_PROGRESS", "REVISION"];
  const notNullIsLogged = isLoggedToday === null && true;
  const isShowingActivityLog =
  docxUploaded && !notNullIsLogged && activityShowStatusList.includes(status);

  const handleClose = () => setAnchorEl(null);

  const handleChangeStatus = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("isOpen", "true");
    params.set("activityId", id.toString());
    params.set("status", status);
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleShow = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("projectId", projectId.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleTranslate = () => {
    handleClose();
    router.push(`/translate/${id}`);
  };

  const handleShowActivityLog = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("logInfo", projectId.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  const handleShowActivityInfo = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("activityInfo", id.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }
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
            <ActivityProject projectName={projectName} />
            <ActivityDocStatus docxUploaded={docxUploaded} />
          </div>
        </CardContent>
      </Card>
      <Menu {...{ open, anchorEl, onClose: handleClose }}>
        <MenuItem onClick={handleShow}>Project Info</MenuItem>
        {isChangeableStatus && (
          <MenuItem onClick={handleChangeStatus}>Change Status</MenuItem>
        )}
        {docxUploaded && (
          <MenuItem onClick={handleTranslate}>Translate</MenuItem>
        )}
        <MenuItem onClick={handleShowActivityInfo}>Activity Info</MenuItem>
        {isShowingActivityLog && <MenuItem onClick={handleShowActivityLog}>Activity Logging</MenuItem>}
      </Menu>
    </>
  );
};
