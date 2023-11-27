"use client";
import { ProjectModel } from "@/app/model/ProjectModel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAllProjects } from "../service/fetcher";
import { ProjectsListView } from "./ProjectsListView";
import Typography from "@mui/material/Typography/Typography";
import { ProjectCreateButton } from "./ProjectCreateButton";

export const SideBar = () => {
  const session = useSession();
  const [projectsList, setProjectsList] = useState<ProjectModel[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (session.data?.user) {
      const {
        user: { idToken },
      } = session.data;

      getAllProjects(idToken)
        .then((data) => setProjectsList(data))
        .catch(() => setIsError(true))
        .finally(() => setIsFetching(false));
    }
  }, [session]);

  const content = !(isFetching || isError) && (
    <>
      <ProjectsListView projectsList={projectsList} />
      <ProjectCreateButton />
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
