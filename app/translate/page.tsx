"use client";
import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "../components/Header";
import { ActivityBoard } from "./components/ActivityBoard";
import { StatusModal } from "./components/StatusModal";
import { useSearchParams } from "next/navigation";
import { ProjectInfoModal } from "./components/ProjectInfoModal";
import { ActivityLogModal } from "./components/ActivityLogModal";
import { ActivityInfoModal } from "./components/ActivityInfoModal";

export default function Page() {
  const searchParams = useSearchParams();
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen grid grid-cols-6 grid-rows-projects-xs xs:grid-rows-projects">
        <div className="col-span-full">
          <Header />
        </div>
        <div className="col-span-full">
          <ActivityBoard />
        </div>
      </div>
      {searchParams.has("status") && <StatusModal />}
      {searchParams.has("projectId") && <ProjectInfoModal />}
      {searchParams.has("activityInfo") && <ActivityInfoModal />}
      {searchParams.has("logInfo") && <ActivityLogModal />}
    </Suspense>
  );
}
