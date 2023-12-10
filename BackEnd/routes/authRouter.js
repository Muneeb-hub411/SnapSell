import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/testing", requireSignIn, isAdmin, testController);
export default router;
