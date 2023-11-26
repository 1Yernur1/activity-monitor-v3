import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { ActivitiesListBoard } from "./components/ActivitiesListBoard";

export default function Page() {
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
          <ActivitiesListBoard />
        </div>
      </div>
    </Suspense>
  );
}
