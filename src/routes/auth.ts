import { Router } from "express";
import controllerWrapper from "../adaptor";
import AuthController from "../controller/AuthController";

const { register, login, resendVerification, resetPassword, verifyAccount } =
  AuthController;

const router = Router();

router.post("/login", controllerWrapper(login));
router.post("/register", controllerWrapper(register));
router.post("/resend", controllerWrapper(resendVerification));
router.post("/password/reset", controllerWrapper(resetPassword));
router.post("/verify", controllerWrapper(verifyAccount));

export default router;
