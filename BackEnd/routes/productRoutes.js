import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createProductController, deleteProductController, getAllProductsController, getSingleProductController, productImageController, updateProductController } from "../controller/productController.js";
import formidable from "express-formidable";
import { deleteCategoryCOntroller } from "../controller/categoryController.js";

const router = express.Router();

// ---Routes--- 

// Create Product
// ('/create-product' is url pattern)
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Get All products
router.get("/get-allProducts", getAllProductsController)

// Get single product
router.get("/get-SingleProduct/:slug", getSingleProductController)

// Get Product Image
router.get('/product-image/:pid', productImageController)

// Delete Product
router.delete('/delete-product/:pid', deleteProductController)

// Update Product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController)

export default router;