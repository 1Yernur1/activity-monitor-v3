"use client";

import { useEffect } from "react";
import { getAllTextItemsByActivity } from "../../service/fetcher";
import { useSession } from "next-auth/react";

export const TranslateBoard = ({ activityId }: { activityId: number }) => {
  const session = useSession();
  useEffect(() => {
    if (session.data?.user) {
      const { user } = session.data;
      const { idToken } = user;
      getAllTextItemsByActivity(activityId, idToken)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }, []);
  return (
    <div>
      <h1>this is translate board</h1>
    </div>
  );
};
