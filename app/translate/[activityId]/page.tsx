import { Suspense } from "react";
import Loading from "../loading";
import { Header } from "@/app/components/Header";
import { TranslateBoard } from "./components/TranslateBoard";

export default function Page({ params }: { params: { activityId: number } }) {
  const { activityId } = params;
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen grid grid-cols-6 grid-rows-projects-xs xs:grid-rows-projects">
        <div className="col-span-full">
          <Header />
        </div>
        <div className="col-span-full">
          <TranslateBoard activityId={activityId} />
        </div>
      </div>
    </Suspense>
  );
}
