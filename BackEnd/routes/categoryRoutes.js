import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryCOntroller,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";

const router = express.Router();

// ---Routes---

// Create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// Update Category
router.put("/update-category/:id", requireSignIn, updateCategoryController);

// Get All Categories
router.get('/all-category', getAllCategoriesController)

// Get Single Category
router.get('/single-category/:slug', getSingleCategoryController)

// Delete Category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryCOntroller)

export default router;
