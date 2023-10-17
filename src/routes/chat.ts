import { Router } from "express";
import controllerWrapper from "../adaptor";
import ChatController from "../controller/ChatController";

const { getMessages } = ChatController;

const router = Router();

router.get("/", controllerWrapper(getMessages));

export default router;
