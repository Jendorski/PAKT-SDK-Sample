import { AddReviewDto, Status } from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/review";

export const addReview = async ({ review }: { review: AddReviewDto }) => {
  try {
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
