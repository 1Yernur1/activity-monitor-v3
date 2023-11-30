"use client";
import { TranslateItemModel } from "@/app/model/TextItemModel";
import { IconButton, Input, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TranslationTranslate } from "./TranslationTranslate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {useEffect, useState} from "react";
import {RemarkModel} from "@/app/model/RemarkModel";
import {getRemarks} from "@/app/translate/service/fetcher";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";

export const TranslateItem = ({
  translateItem: { id, ordinal, text, translationText },
}: {
  translateItem: TranslateItemModel;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleShowHistory = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("showHistory", "true");
    params.set("textItemId", id.toString());
    router.replace(`${pathname}?${params}`);
  };

  const handleShowRemark = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("showRemark", "true");
    params.set("textItemId", id.toString());
    router.replace(`${pathname}?${params}`);
  };

  // get remark list to show Remark menu item only if remark list is not empty
  const [remarkItemList, setRemarkItemList] = useState<
      RemarkModel[]
      >([]);
  const session = useSession();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (session.data?.user && id) {
      const { user } = session.data;
      const { idToken } = user;
      getRemarks(+id, idToken)
          .then((data) => setRemarkItemList(data))
          .catch((err) => {
            // 404 response status is OK, it means translator hasn't saved translation item for this text item yet
            if (err.message === '404') {
              setRemarkItemList([]);
              return;
            }
            setIsError(true)
          })
          .finally(() => setIsLoading(false));
    }
  }, [session]);
  const loading = isLoading && <Typography>Loading...</Typography>;
  const remarkMenuItem =
      !(isLoading || isError) &&
      (remarkItemList && remarkItemList.length > 0) &&
      remarkItemList.map((item) => (
          <MenuItem onClick={handleShowRemark}>Remark</MenuItem>
      ));

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
          <TranslationTranslate
              id={id}
              translationTextProps={translationText}
              hasRemark={!!remarkMenuItem}
          />
        </div>
      </div>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleShowHistory}>History</MenuItem>

        {/*{isError && <p className="text-red-500 text-center">Something wrong</p>}*/}
        {/*{loading}*/}
        {remarkMenuItem}
      </Menu>
    </>
  );
};
