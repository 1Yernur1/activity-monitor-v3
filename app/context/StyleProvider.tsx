"use client";
import StyledEngineProvider from "@mui/styled-engine/StyledEngineProvider/StyledEngineProvider";
import { ReactNode } from "react";

export default function StyleProvider({ children }: { children: ReactNode }) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
