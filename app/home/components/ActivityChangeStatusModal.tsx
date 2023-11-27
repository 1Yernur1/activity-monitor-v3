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
} from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { changeActivityStatusAsManger } from "../service/fetcher";

export const ActivityChangeStatusModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useSession();
  const isOpen = searchParams.has("changeStatus");
  const activityId = searchParams.get("activityId");
  const projectId = searchParams.get("projectId") || 1;
  const initialStatus = searchParams.get("changeStatus");
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [statusList, setStatusList] = useState(staticStatusList);

  useEffect(() => {
    if (initialStatus === "TODO") {
      setStatusList([
        { label: "Todo", value: "TODO" },
        { label: "Archive", value: "ARCHIVE" },
      ]);
    } else if (initialStatus === "IN_PROGRESS") {
      setStatusList([
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "Archive", value: "ARCHIVE" },
      ]);
    } else {
      setStatusList([]);
    }
  }, []);

  const handleClose = () =>  {
    const params = new URLSearchParams(searchParams);
    params.delete("changeStatus");
    router.replace(`${pathname}?${params}`);
  }

  const handleChangeStatus = () => {
    setIsDisabled(true);
    if (data?.user && selectedStatus && activityId) {
      const { idToken } = data.user;
      changeActivityStatusAsManger(+activityId, selectedStatus, idToken)
        .then(() => window.location.replace(`/?projectId=${projectId}`))
        .catch(() => setIsError(true))
        .finally(() => setIsDisabled(false));
    }
  };

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent>
        {isError && (
          <p className="mb-2 text-red-500 text-base">Something wrong</p>
        )}
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
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleChangeStatus}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
