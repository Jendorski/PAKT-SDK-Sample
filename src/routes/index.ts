import { Router } from "express";
import authRouter from "./auth";
import chatRouter from "./chat";
import collectionRouter from "./collection";
import fileRouter from "./file";
import inviteRouter from "./invite";

const router = Router();

router.use("/collection", collectionRouter);
router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/file", fileRouter);
router.use("/invite", inviteRouter);

export default router;
