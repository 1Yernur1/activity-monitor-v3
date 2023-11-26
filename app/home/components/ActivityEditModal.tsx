"use client";
import { ProfileModel } from "@/app/model/ProfileModel";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  changeActivityAsManager,
  getActivityById,
  getAllTranslators,
} from "../service/fetcher";
import { useSession } from "next-auth/react";
import { ActivityModel } from "@/app/model/ActivityModel";
import { staticLanguagesList } from "../service/data";

export const ActivityEditModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("edit");
  const activityId = searchParams.get("activityId");
  const [activity, setActivity] = useState<ActivityModel | null>(null);
  // const [chiefEditorList, setChiefEditorList] = useState<ProfileModel[]>([]);
  // const [managersList, setManagersList] = useState<ProfileModel[]>([]);
  const [translatorList, setTranslatorList] = useState<ProfileModel[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [languageList, setLanguageList] = useState(staticLanguagesList);
  const [targetLanguageList, setTargetLanguageList] =
    useState(staticLanguagesList);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    if (session.data?.user && activityId) {
      const {
        user: { idToken },
      } = session.data;

      Promise.all([
        getActivityById(+activityId, idToken)
          .then((data) => setActivity(data))
          .catch(() => setIsError(true)),
        getAllTranslators(idToken)
          .then((data) => setTranslatorList(data))
          .catch(() => setIsError(true)),
      ]).finally(() => setIsFetching(false));

      // getActivityById(+activityId, idToken)
      //   .then((data) => setActivity(data))
      //   .catch(() => setIsError(true))
      //   .finally(() => setIsFetching(false));
      // getAllFreeChiefEditors(idToken)
      //   .then((data) => setChiefEditorList(data))
      //   .catch(() => setIsError(true))
      //   .finally(() => setIsFetching(false));
      // getAllManagers(idToken)
      //   .then((data) => setManagersList(data))
      //   .catch(() => setIsError(true))
      //   .finally(() => setIsFetching(false));
      // getAllTranslators(idToken)
      //   .then((data) => setTranslatorList(data))
      //   .catch(() => setIsError(true))
      //   .finally(() => setIsFetching(false));
    }
  }, [session]);

  const handleClose = () => router.replace(pathname);

  const handleChangeActivityTitle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActivity((prevState) => {
      return (
        prevState && {
          ...prevState,
          title: e.target.value,
        }
      );
    });
  };

  const handleSave = () => {
    setIsDisabled(true);
    if (session.data?.user && activity && activityId) {
      const {
        user: { idToken },
      } = session.data;
      const {
        title,
        language,
        targetLanguage,
        translator: { id },
        projectId,
      } = activity;
      const body = {
        title: title,
        language: language,
        targetLanguage: targetLanguage,
        translatorId: id,
      };
      const params = new URLSearchParams();
      changeActivityAsManager(+activityId, body, idToken)
        .then(() => window.location.replace("/"))
        .catch(() => setIsError(true))
        .finally(() => setIsDisabled(false));
    }
  };

  const translatorsListView = translatorList.map(
    ({ firstName, lastName, id }: ProfileModel) => ({
      label: `${firstName} ${lastName}`,
      value: id,
    })
  );

  const translatorView = activity?.translator?.id
    ? translatorsListView.find(
        (translator) => translator.value === activity.translator.id
      )
    : { label: "", value: "" };

  const languageView = activity?.language
    ? languageList.find((lang) => lang.value === activity.language)
    : { label: "", value: "" };

  const targetLanguageView = activity?.targetLanguage
    ? targetLanguageList.find((lang) => lang.value === activity.targetLanguage)
    : { label: "", value: "" };

  const loading = isFetching && <Typography>Loading...</Typography>;
  const content = !(isFetching || isError) && (
    <>
      <TextField
        label="Title"
        type="text"
        margin="dense"
        variant="standard"
        fullWidth
        value={activity?.title}
        onChange={handleChangeActivityTitle}
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Select language" />
        )}
        options={languageList}
        value={languageView}
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
        value={targetLanguageView}
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
        value={translatorView}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Select translator" />
        )}
        options={translatorsListView}
      />
    </>
  );
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Activity</DialogTitle>
      <DialogContent>
        {isError && (
          <p className="mb-2 text-red-500 text-base">Something wrong</p>
        )}
        {loading}
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" disabled={isDisabled} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
