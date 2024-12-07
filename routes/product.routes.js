import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.post("/createNewProduct", createNewProduct);
router.get("/getAllProducts", getAllProducts);
router.put("/updateProduct", updateProduct);
router.delete("/deleteProduct/:productDocId", deleteProduct);

export default router;
