import {
  AddReviewDto,
  FilterReviewDto,
  FindReviewDto,
  ResponseDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/review";

export const addReview = async ({ review }: { review: AddReviewDto }) => {
  try {
    const sampleReview: AddReviewDto = {
      review: "Excellent work done",
      rating: 5,
      collection: "64fa1d5f64d7ee50b86ce6d0",
    };
    const add = await init.review.addReview(review);
    if (add.status === Status.ERROR)
      return internalResponse(
        true,
        Number(add.code ?? add.statusCode),
        String(add.message),
        add
      );
    return internalResponse(
      false,
      Number(add.code ?? add.statusCode),
      String(add.message),
      add
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const viewAllReviews = async ({
  filter,
}: {
  filter: FilterReviewDto;
}) => {
  try {
    const reviews: ResponseDto<FindReviewDto> = await init.review.viewAll(
      filter
    );
    if (reviews.status === Status.ERROR)
      return internalResponse(
        true,
        Number(reviews.code ?? reviews.statusCode),
        String(reviews.message),
        reviews
      );
    return internalResponse(
      false,
      Number(reviews.code ?? reviews.statusCode),
      String(reviews.message),
      reviews
    );
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};
