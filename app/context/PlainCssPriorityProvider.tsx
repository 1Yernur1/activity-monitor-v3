"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ReactNode } from "react";
const cache = createCache({
  key: "css",
  prepend: true,
});

export default function PlainCssPriorityProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
