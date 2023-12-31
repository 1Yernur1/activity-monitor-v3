"use client";

import { TranslateItemModel } from "@/app/model/TextItemModel";
import { getAllTextItemsByActivity } from "@/app/translate/service/fetcher";
import { Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ReviewItem } from "./ReviewItem";
import { useRouter } from "next/navigation";
import {getActivityById} from "@/app/home/service/fetcher";
import {ActivityModel} from "@/app/model/ActivityModel";

export const ReviewBoard = ({ activityId }: { activityId: number }) => {
  const session = useSession();
  const router = useRouter();
  const [activity, setActivity] = useState<
      ActivityModel | null
      >(null);
  const [translateItemList, setTranslateItemList] = useState<
    TranslateItemModel[]
  >([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (session.data?.user) {
      const { user } = session.data;
      const { idToken } = user;
      getActivityById(activityId, idToken)
          .then((data) => {
            console.log('HERERE: ', data);
            setActivity(data);
            return data;
          })
          .then((data) => {
            return getAllTextItemsByActivity(activityId, idToken);
          })
          .then((data) => {
            setTranslateItemList(data);
          })
          .catch((error) => setIsError(true))
          .finally(() => setIsLoading(false));
    }
  }, [session]);

  const loading = isLoading && <Typography>Loading...</Typography>;
  const backToHome = !isLoading && (
    <Button variant="contained" onClick={() => router.back()}>
      Back
    </Button>
  );
  const content =
    !(isLoading || isError) &&
      <>
        <h1 className="ml-3 mt-4 text-3xl font-semibold text-gray-900">{activity?.title}</h1>
        {translateItemList.map((item) => (
            <ReviewItem key={item.id} reviewItem={item} />))}
      </>
  return (
    <div>
      <div className="pt-4 pl-4">{backToHome}</div>
      {isError && <p className="text-red-500 text-center">Something wrong</p>}
      {loading}
      {content}
    </div>
  );
};
