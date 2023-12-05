import { Router } from "express";
import controllerWrapper from "../adaptor";
import NotificationController from "../controller/NotificationController";

const { fetchNotifications } = NotificationController;

const router = Router();

router.get("/", controllerWrapper(fetchNotifications));

export default router;
