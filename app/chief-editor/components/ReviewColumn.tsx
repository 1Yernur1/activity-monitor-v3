import { ReviewModel } from "@/app/model/ReviewModel";
import { Typography } from "@mui/material";
import { ReviewCard } from "./ReviewCard";

export const ReviewColumn = ({
  reviewsList,
  status,
}: {
  reviewsList: ReviewModel[];
  status: string;
}) => {
  return (
    <div>
      <Typography variant="h6" mb={"1rem"}>
        {status}
      </Typography>
      <div className="flex flex-col gap-4">
        {reviewsList.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
