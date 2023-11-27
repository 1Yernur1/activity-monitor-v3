"use client";

import Button from "@mui/material/Button/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CreateActivityButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("create", "true");
    router.replace(`${pathname}?${params}`);
  };
  return (
    <Button variant="outlined" color="secondary" onClick={handleClick}>
      Create Activity
    </Button>
  );
};
