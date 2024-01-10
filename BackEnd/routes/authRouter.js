import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

router.get("/testing", requireSignIn, isAdmin, testController);
export default router;

//portected auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
