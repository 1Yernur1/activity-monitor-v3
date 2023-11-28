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
import { ChangeEvent, useEffect, useState } from "react";
import { addActivityDocument, getActivityById } from "../service/fetcher";
import { ActivityModel } from "@/app/model/ActivityModel";

export const ActivityDocumentModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("addDoc");
  const activityId = searchParams.get("activityId");
  const [activity, setActivity] = useState<ActivityModel | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session.data?.user && activityId) {
      const {
        user: { idToken },
      } = session.data;
      getActivityById(+activityId, idToken)
        .then((data) => setActivity(data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [session]);
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
    setIsLoading(true);
    setIsDisabled(true);
    if (selectedFile && activityId && session.data?.user && activity) {
      const { projectId } = activity;
      const {
        user: { idToken },
      } = session.data;
      const formData = new FormData();
      formData.append("docx", selectedFile);
      addActivityDocument(+activityId, idToken, formData)
        .then(() => window.location.replace(`/?projectId=${projectId}`))
        .catch(() => setIsError(true))
        .finally(() => {
          setIsLoading(false);
          setIsDisabled(false);
        });
    }
  };

  const loading = isLoading && <Typography>Loading...</Typography>;
  const content = !(isLoading || isError) && (
    <TextField type="file" onChange={handleSetFile} />
  );
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Select document</DialogTitle>
      <DialogContent>
        {isError && (
          <p className="mb-2 text-green-500 text-base">
            Document success loaded
          </p>
        )}
        {loading}
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={isDisabled}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
