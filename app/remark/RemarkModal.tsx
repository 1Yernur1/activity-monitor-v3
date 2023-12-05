"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRemarks } from "../translate/service/fetcher";
import { RemarkModel } from "@/app/model/RemarkModel";

export const RemarkModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("textItemId");
  const textItemId = searchParams.get("textItemId");
  const [remarkItemList, setRemarkItemList] = useState<
    RemarkModel[]
  >([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session.data?.user && textItemId) {
      const { user } = session.data;
      const { idToken } = user;
      getRemarks(+textItemId, idToken)
        .then((data) => setRemarkItemList(data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [session]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("textItemId");
    params.delete("showRemark");
    router.replace(`${pathname}?${params}`);
  };

  const loading = isLoading && <Typography>Loading...</Typography>;
  const error = isError && (
    <p className="text-red-500 text-center">Something wrong</p>
  );
  const content =
    !(isLoading || isError) &&
    remarkItemList.map((remark) => (
        <div className="font-sans font-normal text-lg">{remark.remark}</div>
    ));
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Remark</DialogTitle>
      <DialogContent>
        {loading}
        {content}
        {error}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};