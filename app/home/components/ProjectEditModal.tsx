"use client";
import { ProfileModel } from "@/app/model/ProfileModel";
import { ProjectModel } from "@/app/model/ProjectModel";
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
  editProject,
  getAllFreeChiefEditors,
  getAllManagers,
  getProjectById,
} from "../service/fetcher";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const ProjectEditModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const isOpen = searchParams.has("editProject");
  const projectId = searchParams.get("projectId") || 1;
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [chiefEditorList, setChiefEditorList] = useState<ProfileModel[]>([]);
  const [managersList, setManagersList] = useState<ProfileModel[]>([]);
  const [project, setProject] = useState<ProjectModel>({} as ProjectModel);

  useEffect(() => {
    setIsFetching(true);
    if (session.data?.user) {
      const {
        user: { idToken },
      } = session.data;

      Promise.all([
        getProjectById(projectId.toString(), idToken)
          .then((data) => setProject(data))
          .catch(() => setIsError(true)),
        getAllFreeChiefEditors(idToken)
          .then((data) => setChiefEditorList(data))
          .catch(() => setIsError(true)),
        getAllManagers(idToken)
          .then((data) => setManagersList(data))
          .catch(() => setIsError(true)),
      ]).finally(() => setIsFetching(false));
    }
  }, [session]);

  const handleEdit = () => {
    setIsDisabled(true);
    if (session.data?.user && project) {
      const {
        user: { idToken },
      } = session.data;
      const { id, name, description, chiefEditor, manager, targetDate } =
        project;
      const body = {
        name: name,
        description: description,
        managerId: manager.id,
        chiefEditorId: chiefEditor.id,
        targetDate: targetDate,
      };
      editProject(id, body, idToken)
        .then((project) => window.location.replace(`/?projectId=${project.id}`))
        .catch(() => setIsError(true))
        .finally(() => setIsDisabled(false));
    }
  };
  const loading = isFetching && <Typography>Loading...</Typography>;

  const chiefEditorListView = chiefEditorList.map(
    ({ firstName, lastName, id }) => ({
      label: `${firstName} ${lastName}`,
      value: id,
    })
  );

  const chiefEditorView = project?.chiefEditor?.id
    ? {
        label: `${project.chiefEditor.firstName} ${project.chiefEditor.lastName}`,
        value: project.chiefEditor.id,
      }
    : { label: "", value: "" };

  const managerListView = managersList.map(({ firstName, lastName, id }) => ({
    label: `${firstName} ${lastName}`,
    value: id,
  }));

  const managerView = project?.manager?.id
    ? managerListView.find((manager) => manager.value === project.manager.id)
    : { label: "", value: "" };

  const content = !(isFetching || isError) && (
    <>
      <TextField
        label="Project name"
        type="text"
        margin="dense"
        variant="standard"
        fullWidth
        value={project.name}
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
        defaultValue={chiefEditorView}
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
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="Select Manager" />
        )}
        defaultValue={managerView}
        options={managerListView}
        onChange={(e, newValue) => {
          if (newValue?.value) {
            setProject((prevState) => ({
              ...prevState,
              manager: {
                ...prevState.manager,
                id: newValue.value,
              },
            }));
          }
        }}
      />
      <div className="flex justify-end mt-6">
        <DatePicker
          label="Project Deadline"
          defaultValue={project?.targetDate && dayjs(project.targetDate)}
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

  const handleClose = () => router.replace(pathname);
  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        {isError && (
          <p className="mb-2 text-red-500 text-base">Something wrong</p>
        )}
        {loading}
        {content}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleEdit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
