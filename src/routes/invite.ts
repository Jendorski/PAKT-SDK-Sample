import { Router } from "express";
import controllerWrapper from "../adaptor";
import InviteController from "../controller/InviteController";

const { sendInvite, acceptInvite, getAnInvite, getInvites, declineInvite } =
  InviteController;

const router = Router();

router.post("/", controllerWrapper(sendInvite));
router.post("/:id", controllerWrapper(acceptInvite));
router.patch("/:id", controllerWrapper(declineInvite));
router.get("/", controllerWrapper(getInvites));
router.get("/:id", controllerWrapper(getAnInvite));

export default router;
