"use client";
import { Suspense } from "react";
import Loading from "../loading";
import { Header } from "@/app/components/Header";
import { useSearchParams } from "next/navigation";
import { ReviewBoard } from "./components/ReviewBoard";
import { ReviewCreateRemarkModal } from "./components/ReviewCreateRemarkModal";
import { RemarkModal } from "../../remark/RemarkModal";

export default function Page({ params }: { params: { activityId: number } }) {
  const { activityId } = params;
  const searchParams = useSearchParams();
  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen grid grid-cols-6 grid-rows-projects-xs xs:grid-rows-projects">
        <div className="col-span-full">
          <Header />
        </div>
        <div className="col-span-full">
          <ReviewBoard activityId={activityId} />
        </div>
      </div>
      {searchParams.has("createRemark") && <ReviewCreateRemarkModal />}
      {searchParams.has("showRemark") && <RemarkModal />}
    </Suspense>
  );
}
