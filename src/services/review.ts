import {
  AddReviewDto,
  FilterReviewDto,
  FindReviewDto,
  ResponseDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/review";

export const addReview = async ({
  authToken,
  review,
}: {
  authToken: string;
  review: AddReviewDto;
}) => {
  try {
    // const sampleReview: AddReviewDto = {
    //   review: "Excellent work done",
    //   rating: 5,
    //   collectionId: "64fa1d5f64d7ee50b86ce6d0",
    //   receiver: "64ff1592db081228cc9bdafd",
    // };
    const add = await init.review.addReview(authToken, review);
    if (add.status === Status.ERROR)
      return internalResponse(true, Number(422), String(add.message), add);
    return internalResponse(false, Number(200), String(add.message), add);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const viewAllReviews = async ({
  authToken,
  filter,
}: {
  authToken: string;
  filter: FilterReviewDto;
}) => {
  try {
    const sampleFilter: FilterReviewDto = {
      userId: "12345678909876543",
    };
    const reviews: ResponseDto<FindReviewDto> = await init.review.viewAll(
      authToken,
      filter ?? sampleFilter
    );
    if (reviews.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(reviews.message),
        reviews
      );
    return internalResponse(
      false,
      Number(200),
      String(reviews.message),
      reviews
    );
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};
