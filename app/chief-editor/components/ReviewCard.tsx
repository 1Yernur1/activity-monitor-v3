import { ReviewModel } from "@/app/model/ReviewModel";
import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { ReviewField } from "./ReviewFiled";
import {
  getFormattedDate,
  getFormattedFullName,
} from "@/app/translate/service/formatter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ReviewCard = ({
  review: {
    id,
    activityId,
    activityTitle,
    createdAt,
    comment,
    endAt,
    status,
    remarkCount,
    chiefEditor: { firstName, lastName },
  },
}: {
  review: ReviewModel;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const fullName = getFormattedFullName(firstName, lastName);
  const formattedDate = getFormattedDate(createdAt.toString());
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleShowTranslation = () => {
    handleClose();
    router.push(`/chief-editor/${id}`);
  };

  const handleChangeStatus = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("changeStatus", status);
    params.set("reviewId", id.toString());
    router.replace(`${pathname}?${params}`);
  };
  return (
    <>
      <Card sx={{ width: 275 }}>
        <CardContent>
          <div className="mb-2 flex justify-between items-center">
            <Typography>{activityTitle}</Typography>
            <IconButton onClick={handleOpenMenu}>
              <MoreHorizOutlinedIcon />
            </IconButton>
          </div>
          <div className="flex flex-col gap-1">
            {/* <ReviewField filedKey={"Chief Editor"} filedName={fullName} /> */}
            <ReviewField
              filedKey={"Remark count"}
              filedName={remarkCount.toString()}
            />
            <ReviewField filedKey={"Created at"} filedName={formattedDate} />
          </div>
        </CardContent>
      </Card>
      <Menu {...{ open, anchorEl, onClose: handleClose }}>
        <MenuItem onClick={handleShowTranslation}>Review Translate</MenuItem>
        <MenuItem onClick={handleChangeStatus}>Change Status</MenuItem>
      </Menu>
    </>
  );
};
