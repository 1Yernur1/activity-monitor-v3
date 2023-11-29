"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAllReviewsAsChief } from "../service/fetcher";
import { ReviewModel } from "@/app/model/ReviewModel";
import { Typography } from "@mui/material";
import { ReviewBoardView } from "./ReviewBoardView";

export const ReviewBoard = () => {
  const session = useSession();
  const [reviewsList, setReviewsList] = useState<ReviewModel[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    if (session.data?.user) {
      const { user } = session.data;
      const { userId, idToken } = user;
      getAllReviewsAsChief(userId, idToken)
        .then((data) => setReviewsList(data))
        .catch((err) => setIsError(err))
        .finally(() => setIsFetching(false));
    }
  }, [session]);

  const loading = isFetching && <Typography>Loading...</Typography>;
  const error = isError && (
    <p className="text-red-500 text-center">Something wrong</p>
  );
  const content = !(isFetching || isError) && (
    <ReviewBoardView reviewsList={reviewsList} />
  );
  return (
    <div className="h-full">
      <div className="overflow-auto h-full col-start-1 col-span-full">
        <div className="min-w-[75rem] grid grid-cols-4 gap-x-2 px-4">
          {loading}
          {content}
          {error}
        </div>
      </div>
    </div>
  );
};
