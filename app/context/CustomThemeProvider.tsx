"use client";
import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { lightThemeResponsive } from "../config/theme";

export default function CustomThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider theme={lightThemeResponsive}>{children}</ThemeProvider>;
}
