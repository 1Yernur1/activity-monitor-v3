import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { addActivityDocument } from "../service/fetcher";

export const ActivityDocumentModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("addDoc");
  const activityId = searchParams.has("activityId");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("addDoc");
    router.replace(`${pathname}?${params}`);
  };
  const handleSetFile = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // @ts-ignore
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && activityId && session.data?.user) {
      const {
        user: { idToken },
      } = session.data;
      const formData = new FormData();
      formData.append("docx", selectedFile);
      addActivityDocument(+activityId, idToken, formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Select document</DialogTitle>
      <DialogContent>
        <TextField type="file" onChange={handleSetFile} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpload}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
