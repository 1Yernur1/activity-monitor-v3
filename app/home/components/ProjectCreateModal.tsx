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
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createProject,
  getAllFreeChiefEditors,
  getAllManagers,
} from "../service/fetcher";
import { ProjectModel } from "@/app/model/ProjectModel";
import { DatePicker } from "@mui/x-date-pickers";

export const ProjectCreateModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("createProject");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [chiefEditorList, setChiefEditorList] = useState<ProfileModel[]>([]);
  const [managersList, setManagersList] = useState<ProfileModel[]>([]);
  const [project, setProject] = useState<ProjectModel>({
    description: "DescriptionSample",
  } as ProjectModel);

  useEffect(() => {
    setIsFetching(true);
    if (session.data?.user) {
      const {
        user: { idToken },
      } = session.data;

      Promise.all([
        getAllFreeChiefEditors(idToken)
          .then((data) => setChiefEditorList(data))
          .catch(() => setIsError(true)),
        getAllManagers(idToken)
          .then((data) => setManagersList(data))
          .catch(() => setIsError(true)),
      ]).finally(() => setIsFetching(false));
    }
  }, [session]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("createProject");
    router.replace(`${pathname}?${params}`);
  };

  const handleCreate = () => {
    setIsDisabled(true);
    if (session.data?.user && project) {
      const {
        user: { idToken },
      } = session.data;
      const {
        name,
        description,
        chiefEditor: { id },
        targetDate,
      } = project;
      const body = {
        name: name,
        description: description,
        chiefEditorId: id,
        targetDate: targetDate,
      };
      createProject(body, idToken)
        .then((project) => window.location.replace(`/?projectId=${project.id}`))
        .catch(() => setIsError(true))
        .finally(() => setIsDisabled(false));
    }
  };

  const chiefEditorListView = chiefEditorList.map(
    ({ firstName, lastName, id }) => ({
      label: `${firstName} ${lastName}`,
      value: id,
    })
  );

  // const managerListView = managersList.map(({ firstName, lastName, id }) => ({
  //   label: `${firstName} ${lastName}`,
  //   value: id,
  // }));

  const loading = isFetching && <Typography>Loading...</Typography>;
  const content = !(isFetching || isError) && (
    <>
      <TextField
        label="Project name"
        type="text"
        margin="dense"
        variant="standard"
        fullWidth
        onChange={(e) =>
          setProject((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Select Chief Editor"
          />
        )}
        options={chiefEditorListView}
        onChange={(e, newValue) => {
          if (newValue?.value) {
            setProject((prevState) => ({
              ...prevState,
              chiefEditor: {
                ...prevState.chiefEditor,
                id: newValue.value,
              },
            }));
          }
        }}
      />
      <div className="flex justify-end mt-6">
        <DatePicker
          label="Project Deadline"
          onChange={(newValue: any) =>
            setProject((prevState) => ({
              ...prevState,
              targetDate: newValue.format("YYYY-MM-DD"),
            }))
          }
        />
      </div>
    </>
  );

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Create Project</DialogTitle>
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
