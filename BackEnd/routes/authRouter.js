import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateUserProfileContoller,
  getOrdersController,
  getAllOrdersController,
  orderStatusContoller,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

router.get("/testing", requireSignIn, isAdmin, testController);

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

// Orders
router.get('/orders', requireSignIn, getOrdersController)

// All Orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

// Order Status Update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusContoller)

export default router;