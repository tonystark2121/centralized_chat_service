import express from "express";
import { createNewProduct } from "../controllers/product.controller.js";
const router = express.Router();
console.log("product.routes.js");
router.post("/createNewProduct", createNewProduct);

export default router;
