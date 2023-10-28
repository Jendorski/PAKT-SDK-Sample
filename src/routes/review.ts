import { Router } from "express";
import ReviewController from "../controller/ReviewController";

const { create, getReviews } = ReviewController;

const router = Router();

router.post("/", create);
router.get("/", getReviews);

export default router;
