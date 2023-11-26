"use client";
import { ProjectModel } from "@/app/model/ProjectModel";
import { Button, Link, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ProjectListItem = ({
  project: { id, name },
}: {
  project: ProjectModel;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("projectId", id.toString());
    router.replace(`${pathname}?${params}`);
  };
  return (
    <Typography sx={{ cursor: "pointer" }} onClick={handleClick}>
      {name}
    </Typography>
  );
};
