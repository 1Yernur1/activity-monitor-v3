"use client";
import { ProjectModel } from "@/app/model/ProjectModel";
import { MoreHorizOutlined } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const ProjectListItem = ({
  project: { id, name },
}: {
  project: ProjectModel;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleSelectProject = () => {
    const params = new URLSearchParams(searchParams);
    params.set("projectId", id.toString());
    router.replace(`${pathname}?${params}`);
  };
  const handleClickEdit = () => {
    handleClose();
    const params = new URLSearchParams(searchParams);
    params.set("projectId", id.toString());
    params.set("editProject", "true");
    router.replace(`${pathname}?${params}`);
  };
  const handleClickAddChief = () => {};
  return (
    <>
      <div className="flex justify-between items-center">
        <Typography sx={{ cursor: "pointer" }} onClick={handleSelectProject}>
          {name}
        </Typography>
        <IconButton onClick={handleOpenMenu}>
          <MoreHorizOutlined color="secondary" />
        </IconButton>
      </div>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
        <MenuItem onClick={handleClickAddChief}>
          Add Extra Chief Editor
        </MenuItem>
      </Menu>
    </>
  );
};
