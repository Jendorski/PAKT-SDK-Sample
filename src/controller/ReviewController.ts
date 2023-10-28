import { Request, Response } from "express";
import { viewAllReviews } from "../services/review";
import Utils from "../utils/response";

const { failed, success } = Utils;

const ReviewController = {
  create: async (req: Request, res: Response) => {},
  getReviews: async (req: Request, res: Response) => {
    const resp = await viewAllReviews({ filter: { ...req.query } });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default ReviewController;
