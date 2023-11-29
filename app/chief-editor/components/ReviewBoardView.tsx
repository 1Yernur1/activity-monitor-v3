import { ReviewModel } from "@/app/model/ReviewModel";
import { ReviewColumn } from "./ReviewColumn";

export const ReviewBoardView = ({
  reviewsList,
}: {
  reviewsList: ReviewModel[];
}) => {
  const toDoReviewsList = reviewsList.filter(
    (activity) => activity.status === "TODO"
  );
  const inProgressReviewsList = reviewsList.filter(
    (activity) => activity.status === "IN_PROGRESS"
  );

  const revisionReviewsList = reviewsList.filter(
    (activity) => activity.status === "NEEDS_REVISION"
  );
  const doneReviewsList = reviewsList.filter(
    (activity) => activity.status === "OK"
  );

  return (
    <>
      <ReviewColumn status={"To do"} reviewsList={toDoReviewsList} />
      <ReviewColumn
        status={"In Progress"}
        reviewsList={inProgressReviewsList}
      />
      <ReviewColumn status={"Revision"} reviewsList={revisionReviewsList} />
      <ReviewColumn status={"Ok"} reviewsList={doneReviewsList} />
    </>
  );
};
