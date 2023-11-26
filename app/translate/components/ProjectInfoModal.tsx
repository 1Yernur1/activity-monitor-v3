"use client";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjectById } from "../service/fetcher";
import { ProjectModel } from "@/app/model/ProjectModel";

export const ProjectInfoModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const session = useSession();
  const [project, setProject] = useState<ProjectModel>({} as ProjectModel);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const isOpen = searchParams.has("projectId");
  useEffect(() => {
    if (session.data?.user) {
      const {
        user: { idToken },
      } = session.data;

      const id = searchParams.get("projectId");
      id &&
        getProjectById(+id, idToken)
          .then((data) => setProject(data))
          .catch(() => setIsError(true))
          .finally(() => setIsFetching(false));
    }
  }, [session]);
  const handleClose = () => router.replace(pathname);

  if (isFetching) return <Typography>Loading...</Typography>;

  return (
    <Dialog fullWidth open={isOpen} onClose={handleClose}>
      <DialogTitle>Project Info</DialogTitle>
      <DialogContent>
        {!isFetching && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Typography variant="body1">Name</Typography>
              <Typography variant="body1" fontWeight={500}>
                {project.name}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="body1">Chief Editor</Typography>
              <Typography variant="body1" fontWeight={500}>
                {`${project.chiefEditor.firstName} ${project.chiefEditor.lastName}`}
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography variant="body1">Manager</Typography>
              <Typography variant="body1" fontWeight={500}>
                {`${project.manager.firstName} ${project.manager.lastName}`}
              </Typography>
            </div>
            {project.extraChiefEditors.length > 0 && (
              <div className="flex justify-between items-center">
                <Typography variant="body1">Extra Chief Editor</Typography>
                <Typography variant="body1" fontWeight={500}>
                  {`${project.extraChiefEditors[0].firstName} ${project.extraChiefEditors[0].lastName}`}
                </Typography>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
