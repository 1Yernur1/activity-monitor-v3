import { TranslateItemModel } from "@/app/model/TextItemModel";
import { IconButton, Input, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ReviewTranslate } from "./ReviewTranslate";

export const ReviewItem = ({
  reviewItem: { id, ordinal, text, translationText },
}: {
  reviewItem: TranslateItemModel;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleCreateRemark = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("textItemId", id.toString());
    router.replace(`${pathname}?${params}`);
  };

  const handleClose = () => setAnchorEl(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  return (
    <>
      <div key={ordinal} className="flex gap-4 mx-4 my-4">
        <div className="flex-1 flex ">
          <Input
            defaultValue={text.trim()}
            disabled
            fullWidth
            multiline
            endAdornment={
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
            }
          />
        </div>
        <div className="flex-1">
          <ReviewTranslate id={id} translationTextProps={translationText} />
        </div>
      </div>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleCreateRemark}>Create remark</MenuItem>
      </Menu>
    </>
  );
};
