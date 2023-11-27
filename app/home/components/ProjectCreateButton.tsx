"use client";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const ProjectCreateButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCreate = () => {
    const params = new URLSearchParams(searchParams);
    params.set("createProject", "true");
    router.replace(`${pathname}?${params}`);
  };
  return (
    <div className="flex justify-end">
      <IconButton color="secondary" onClick={handleCreate}>
        <AddCircleOutlineOutlined />
      </IconButton>
    </div>
  );
};
