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
import {
  createRemarkForTranslationItem,
  getAllTranslationRemarks,
} from "../../service/fetcher";

export const ReviewCreateRemarkModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("textItemId");
  
  const translationItemId = searchParams.get("textItemId");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [remark, setRemark] = useState("");

  useEffect(() => {
    if (session.data?.user && translationItemId) {
      const { user } = session.data;
      const { idToken } = user;

      getAllTranslationRemarks(+translationItemId, idToken)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  }, []);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("createRemark");
    params.delete("textItemId");
    router.replace(`${pathname}?${params}`);
  };

  const handleCreateRemark = () => {
    setIsDisabled(true);
    setIsError(false);
    if (session.data?.user && translationItemId && remark.length > 0) {
      const { user } = session.data;
      const { idToken } = user;
      const body = {
        remark: remark,
      };
      console.log("Non Incremented id %s",translationItemId);
      console.log("Incremented id %s",+translationItemId);
      createRemarkForTranslationItem(+translationItemId, body, idToken)
        .then((res) => {})
        .catch(() => setIsError(true))
        .finally(() => setIsDisabled(false));

      const params = new URLSearchParams(searchParams);
      params.delete("textItemId");
      router.replace(`${pathname}?${params}`);
    }
  };

  const loading = isLoading && <Typography>Loading...</Typography>;
  const error = isError && (
    <p className="text-red-500 text-center">Something wrong</p>
  );
  const content = !(isLoading || isError) && (
    <TextField
      label="Remark"
      variant="standard"
      fullWidth
      disabled={isDisabled}
      value={remark}
      onChange={(e) => setRemark(e.target.value)}
    />
  );
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Create Remark</DialogTitle>
      <DialogContent>
        {loading}
        {content}
        {error}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            handleCreateRemark();
            if (!error) {
              handleClose();
            }
          }}
          disabled={isDisabled}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
