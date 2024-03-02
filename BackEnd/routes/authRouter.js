import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateUserProfileContoller,
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

// Portected User  route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Portected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update User Profile
router.put("/user-profile", requireSignIn, updateUserProfileContoller)