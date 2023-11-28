"use client";

import { useEffect, useState } from "react";
import { getAllTextItemsByActivity } from "../../service/fetcher";
import { useSession } from "next-auth/react";
import { TranslateItemModel } from "@/app/model/TextItemModel";
import { Typography } from "@mui/material";
import { TranslateItem } from "./TranslateItem";

export const TranslateBoard = ({ activityId }: { activityId: number }) => {
  const session = useSession();
  const [translateItemList, setTranslateItemList] = useState<
    TranslateItemModel[]
  >([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    if (session.data?.user) {
      const { user } = session.data;
      const { idToken } = user;
      getAllTextItemsByActivity(activityId, idToken)
        .then((data) => setTranslateItemList(data))
        .catch((error) => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [session]);

  const loading = isLoading && <Typography>Loading...</Typography>;
  const content =
    !(isLoading || isError) &&
    translateItemList.map((item) => (
      <TranslateItem key={item.ordinal} translateItem={item} />
    ));
  return (
    <div>
      {isError && <p className="text-red-500 text-center">Something wrong</p>}
      {loading}
      {content}
    </div>
  );
};
