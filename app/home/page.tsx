"use client";
import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { ActivitiesListBoard } from "./components/ActivitiesListBoard";
import { useSearchParams } from "next/navigation";
import { ActivityEditModal } from "./components/ActivityEditModal";
import { ActivityChangeStatusModal } from "./components/ActivityChangeStatusModal";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("projectId");

  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen grid grid-cols-6 grid-rows-projects-xs xs:grid-rows-projects">
        <div className="col-span-full">
          <Header />
        </div>
        <div className="bg-black text-white ">
          <SideBar />
        </div>
        <div className="col-start-2 col-span-full">
          <ActivitiesListBoard projectId={id || "1"} />
        </div>
      </div>
      {searchParams.has("edit") && <ActivityEditModal />}
      {searchParams.has("changeStatus") && <ActivityChangeStatusModal />}
    </Suspense>
  );
}
