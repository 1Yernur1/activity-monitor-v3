"use client";
import { staticStatusList } from "@/app/translate/service/data";
import {
  Autocomplete,
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
import { changeReviewStatus } from "../service/fetcher";

export const ReviewChangeStatusModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("changeStatus");
  const reviewId = searchParams.get("reviewId");
  const initialStatus = searchParams.get("changeStatus");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [statusList, setStatusList] = useState(staticStatusList);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  useEffect(() => {
    if (initialStatus === "TODO") {
      setStatusList([
        { label: "Todo", value: "TODO" },
        { label: "In Progress", value: "IN_PROGRESS" },
      ]);
    } else if (initialStatus === "IN_PROGRESS") {
      setStatusList([
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "Needs Revision", value: "NEEDS_REVISION" },
        { label: "Ok", value: "OK" },
      ]);
    } else {
      setStatusList([]);
    }
  }, []);
  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("changeStatus");
    params.delete("reviewId");
    router.replace(`${pathname}?${params}`);
  };

  const handleChangeStatus = () => {
    setIsDisabled(true);
    if (session.data?.user && selectedStatus && reviewId) {
      const body = {
        status: selectedStatus,
      };
      const { idToken } = session.data.user;
      changeReviewStatus(+reviewId, body, idToken)
        .then(() => window.location.replace(`/?reviewId=${reviewId}`))
        .catch(() => setIsError(true))
        .finally(() => setIsDisabled(false));
    }
  };

  const loading = isLoading && <Typography>Loading...</Typography>;
  const error = isError && (
    <p className="mb-2 text-red-500 text-base">Something wrong</p>
  );
  const content = !(isLoading || isError) && (
    <Autocomplete
      options={statusList}
      value={statusList.find((status) => status.value === selectedStatus)}
      onChange={(e, newValue) => {
        newValue?.label && setSelectedStatus(newValue.value);
      }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Select status" />
      )}
    />
  );
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent>
        {loading}
        {content}
        {error}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleChangeStatus}
          disabled={isDisabled}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
