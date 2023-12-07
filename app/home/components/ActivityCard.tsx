"use client";
import { ActivityModel } from "@/app/model/ActivityModel";
import { ActivityDate } from "@/app/translate/components/ActivityDate";
import { ActivityLanguage } from "@/app/translate/components/ActivityLanguage";
import { ActivityTargetLanguage } from "@/app/translate/components/ActivityTargetLanguage";
import { ActivityTranslator } from "@/app/translate/components/ActivityTranslator";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ActivityDocStatus } from "./ActivityDocStatus";

export const ActivityCard = ({
  activity: {
    id,
    title,
    language,
    targetLanguage,
    createdAt,
    status,
    docxUploaded,
    translator: { firstName, lastName },
  },
}: {
  activity: ActivityModel;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const managerStatusList = ["TODO", "IN_PROGRESS"];
  const isChangeableStatus = managerStatusList.includes(status);

  const handleClose = () => setAnchorEl(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClickEdit = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("activityId", id.toString());
    params.set("edit", "true");
    router.replace(`${pathname}?${params}`);
  };
  const handleClickChangeStatus = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("activityId", id.toString());
    params.set("changeStatus", status);
    router.replace(`${pathname}?${params}`);
  };

  const handleShowActivityInfo = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("activityInfo", id.toString());
    console.log("HEEERE: ", `${pathname}?${params.toString()}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleAddDoc = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("activityId", id.toString());
    params.set("addDoc", "true");
    router.replace(`${pathname}?${params}`);
  };
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
            <ActivityDocStatus docxUploaded={docxUploaded} />
          </div>
        </CardContent>
      </Card>

      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
        {isChangeableStatus && (
          <MenuItem onClick={handleClickChangeStatus}>Change Status</MenuItem>
        )}
        <MenuItem onClick={handleShowActivityInfo}>Activity Info</MenuItem>
        <MenuItem onClick={handleAddDoc}>Add Document</MenuItem>
      </Menu>
    </>
  );
};
