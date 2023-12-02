import express from "express";
import { registerController } from "../controller/authController.js";

//router object
const router = express.Router();

router.post("/register", registerController);
