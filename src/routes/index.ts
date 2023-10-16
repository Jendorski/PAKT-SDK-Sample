import { Router } from "express";
import authRouter from "./auth";
import collectionRouter from "./collection";

const router = Router();

router.use("/collection", collectionRouter);
router.use("/auth", authRouter);

export default router;
