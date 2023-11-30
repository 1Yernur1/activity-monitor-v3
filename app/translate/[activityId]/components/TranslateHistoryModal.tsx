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
import { getTranslationItemHistory } from "../../service/fetcher";
import { TranslationTranslateModel } from "@/app/model/TranslationTranlsateModel";

export const TranslateHistoryModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("textItemId");
  const translationItemId = searchParams.get("textItemId");
  const [translationTranslateList, setTranslationTranslateList] = useState<
    TranslationTranslateModel[]
  >([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session.data?.user && translationItemId) {
      const { user } = session.data;
      const { idToken } = user;
      getTranslationItemHistory(+translationItemId, idToken)
        .then((data) => setTranslationTranslateList(data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [session]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("textItemId");
    params.delete("showHistory");
    router.replace(`${pathname}?${params}`);
  };

  const loading = isLoading && <Typography>Loading...</Typography>;
  const error = isError && (
    <p className="text-red-500 text-center">Something wrong</p>
  );
  const content =
    !(isLoading || isError) &&
    translationTranslateList.map((translation) => (
      <TextField
        multiline
        disabled
        fullWidth
        defaultValue={translation.translationText}
        key={translation.historyOrdinal}
      />
    ));
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>History</DialogTitle>
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
