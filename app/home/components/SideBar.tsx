"use client";
import { ProjectModel } from "@/app/model/ProjectModel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAllFreeChiefEditors, getAllProjects } from "../service/fetcher";
import { ProjectsListView } from "./ProjectsListView";
import Typography from "@mui/material/Typography/Typography";
import { ProjectCreateButton } from "./ProjectCreateButton";
import { ProfileModel } from "@/app/model/ProfileModel";

export const SideBar = () => {
  const session = useSession();
  const [projectsList, setProjectsList] = useState<ProjectModel[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCreatable, setIsCreatable] = useState(true);
  useEffect(() => {
    if (session.data?.user) {
      const {
        user: { idToken },
      } = session.data;

      Promise.all([
        getAllProjects(idToken)
          .then((data) => setProjectsList(data))
          .catch(() => setIsError(true)),
        getAllFreeChiefEditors(idToken)
          .then(
            (data: ProfileModel[]) => data.length === 0 && setIsCreatable(false)
          )
          .catch(() => setIsError(true)),
      ]).finally(() => setIsFetching(false));
    }
  }, [session]);

  const content = !(isFetching || isError) && (
    <>
      <ProjectsListView projectsList={projectsList} />
      {isCreatable && <ProjectCreateButton />}
    </>
  );
  const loading = isFetching && <Typography>Loading...</Typography>;
  const error = isError && <Typography>Something wrong</Typography>;
  return (
    <div className="py-1 px-6">
      {loading}
      {content}
      {error}
    </div>
  );
};
