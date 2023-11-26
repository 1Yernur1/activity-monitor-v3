"use client";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { changeActivityStatusAsTranslator } from "../service/fetcher";
import { useSession } from "next-auth/react";
import { staticStatusList } from "../service/data";

export const StatusModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("activityId");
  const initialStatus = searchParams.get("status");
  const isOpen = searchParams.has("isOpen");
  const { data } = useSession();
  const [statusList, setStatusList] = useState(staticStatusList);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (initialStatus === "TODO") {
      setStatusList([
        { label: "Todo", value: "TODO" },
        { label: "In Progress", value: "IN_PROGRESS" },
      ]);
    } else if (initialStatus === "IN_PROGRESS") {
      setStatusList([
        { label: "In Progress", value: "IN_PROGRESS" },
        { label: "Review", value: "REVIEW" },
      ]);
    } else if (initialStatus === "REVISION") {
      setStatusList([
        { label: "Review", value: "REVIEW" },
        { label: "Revision", value: "REVISION" },
      ]);
    } else {
      setStatusList([]);
    }
  }, []);

  const handleClose = () => router.replace(pathname);

  const handleChangeStatus = () => {
    setIsDisabled(true);
    if (data?.user && selectedStatus && id) {
      const { idToken } = data.user;

      changeActivityStatusAsTranslator(+id, selectedStatus, idToken)
        .then(() => window.location.replace("/"))
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
          onClick={handleChangeStatus}
          disabled={isDisabled}
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
