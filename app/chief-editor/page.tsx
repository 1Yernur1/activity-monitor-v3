"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import { Header } from "../components/Header";
import { ReviewBoard } from "./components/ReviewBoard";
import { ReviewChangeStatusModal } from "./components/ReviewChangeStatusModal";

export default function Page() {
  const searchParams = useSearchParams();
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen grid grid-cols-6 grid-rows-projects-xs xs:grid-rows-projects">
        <div className="col-span-full">
          <Header />
        </div>
        <div className="col-span-full">
          <ReviewBoard />
        </div>
      </div>

      {searchParams.has("changeStatus") && <ReviewChangeStatusModal />}
    </Suspense>
  );
}
