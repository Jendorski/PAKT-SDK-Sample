import { Router } from "express";
import accountRouter from "./account";
import authRouter from "./auth";
import bookmarkRouter from "./bookmark";
import chatRouter from "./chat";
import collectionRouter from "./collection";
import fileRouter from "./file";
import inviteRouter from "./invite";
import reviewRouter from "./review";

const router = Router();

router.use("/collection", collectionRouter);
router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/file", fileRouter);
router.use("/invite", inviteRouter);
router.use("/review", reviewRouter);
router.use("/account", accountRouter);
router.use("/bookmark", bookmarkRouter);

export default router;
