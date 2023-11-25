"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export const StatusModal = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams.has("isOpen");
  const handleClose = () => replace(pathname);
  const handleChangeStatus = () => {};
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Change Status</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleChangeStatus}>
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
