import { Router } from "express";
import authRouter from "./auth";
import chatRouter from "./chat";
import collectionRouter from "./collection";

const router = Router();

router.use("/collection", collectionRouter);
router.use("/auth", authRouter);
router.use("/chat", chatRouter);

export default router;
