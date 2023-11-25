"use client";
import Button from "@mui/material/Button/Button";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  const handleClick = () => signOut();
  return (
    <Button variant="outlined" color="secondary" onClick={handleClick}>
      Sign Out
    </Button>
  );
};
