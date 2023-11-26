"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ActivityEditModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams.has("edit");

  const handleClose = () => router.replace(pathname);
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Activity</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
