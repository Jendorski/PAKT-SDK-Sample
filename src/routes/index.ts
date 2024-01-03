import { NextFunction, Request, Response, Router } from "express";
import Utils from "../utils/response";
import accountRouter from "./account";
import authRouter from "./auth";
import bookmarkRouter from "./bookmark";
import chatRouter from "./chat";
import collectionRouter from "./collection";
import connectionFilterRouter from "./connection-filter";
import fileRouter from "./file";
import inviteRouter from "./invite";
import notificationRouter from "./notifications";
import paymentRouter from "./payment";
import reviewRouter from "./review";
import withdrawalRouter from "./withdrawal";

const { failed } = Utils;
const router = Router();

router.use("/collection", collectionRouter);
router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/file", fileRouter);
router.use("/invite", inviteRouter);
router.use("/review", reviewRouter);
router.use("/account", accountRouter);
router.use("/bookmark", bookmarkRouter);
router.use("/notification", notificationRouter);
router.use("/payment", paymentRouter);
router.use("/withdrawal", withdrawalRouter);
router.use("/conn", connectionFilterRouter);

router.use("**", (req: Request, res: Response, next: NextFunction) => {
  return failed(
    res,
    null,
    `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`,
    404
  );
});

export default router;
