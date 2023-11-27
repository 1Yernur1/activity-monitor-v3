"use client";
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
import { staticLanguagesList } from "../service/data";
import { ProfileModel } from "@/app/model/ProfileModel";
import { ActivityModel } from "@/app/model/ActivityModel";
import { createActivity, getAllTranslators } from "../service/fetcher";

export const ActivityCreateModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("create");
  const projectId = searchParams.get("projectId") || 1;
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activity, setActivity] = useState<ActivityModel>({
    projectId: projectId,
  } as ActivityModel);
  const [translatorList, setTranslatorList] = useState<ProfileModel[]>([]);
  const [languageList, setLanguageList] = useState(staticLanguagesList);
  const [targetLanguageList, setTargetLanguageList] =
    useState(staticLanguagesList);
  const [isDisabled, setIsDisabled] = useState(false);

  const translatorsListView = translatorList.map(
    ({ firstName, lastName, id }: ProfileModel) => ({
      label: `${firstName} ${lastName}`,
      value: id,
    })
  );

  useEffect(() => {
    setIsFetching(true);
    if (session.data?.user) {
      const {
        user: { idToken },
      } = session.data;

      getAllTranslators(idToken)
        .then((data) => setTranslatorList(data))
        .catch(() => setIsError(true))
        .finally(() => setIsFetching(false));
    }
  }, [session]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("create");
    router.replace(`${pathname}?${params}`);
  };

  const handleCreate = () => {
    setIsDisabled(true);
    if (session.data?.user && activity) {
      const {
        user: { idToken },
      } = session.data;
      const {
        title,
        language,
        targetLanguage,
        translator: { id },
      } = activity;
      const body = {
        projectId: projectId,
        title: title,
        language: language,
        targetLanguage: targetLanguage,
        translatorId: id,
      };

      createActivity(body, idToken)
        .then(() => window.location.replace(`/?projectId=${projectId}`))
        .catch(() => setIsError(true))
        .finally(() => setIsDisabled(false));
    }
  };

  const loading = isFetching && <Typography>Loading...</Typography>;
  const content = !(isFetching || isError) && (
    <>
      <TextField
        label="Title"
        type="text"
        margin="dense"
        variant="standard"
        fullWidth
        onChange={(e) =>
          setActivity((prevState) => {
            return (
              prevState && {
                ...prevState,
                title: e.target.value,
              }
            );
          })
        }
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Select language" />
        )}
        options={languageList}
        onChange={(e, newValue) => {
          if (newValue?.value) {
            setActivity((prevState) => {
              return (
                prevState && {
                  ...prevState,
                  language: newValue.value,
                }
              );
            });
          }
        }}
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select target language"
          />
        )}
        options={targetLanguageList}
        onChange={(e, newValue) => {
          if (newValue?.value) {
            setActivity((prevState) => {
              return (
                prevState && {
                  ...prevState,
                  targetLanguage: newValue.value,
                }
              );
            });
          }
        }}
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Select translator" />
        )}
        options={translatorsListView}
        onChange={(e, newValue) => {
          if (newValue?.value) {
            setActivity((prevState) => {
              return {
                ...prevState,
                translator: {
                  ...prevState.translator,
                  id: newValue.value,
                },
              };
            });
          }
        }}
      />
    </>
  );

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Create Activity</DialogTitle>
      <DialogContent>
        {isError && (
          <p className="mb-2 text-red-500 text-base">Something wrong</p>
        )}
        {loading}
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={handleCreate}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
