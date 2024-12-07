import {
  CreateNewProductSV,
  UpdateProductSV,
} from "../validators/product.validators.js";
import { randomBytes } from "crypto";
import { Product_Entity } from "../models/product.model.js";

export const createNewProduct = async (req, res) => {
  try {
    // Validate request body
    const { productName, appType, appStatus, appDescription } =
      await CreateNewProductSV.validateAsync(req.body);

    // Generate unique keys
    const appToken = randomBytes(32).toString("hex");
    const appID = randomBytes(16).toString("hex");
    const appSecrectKey = randomBytes(64).toString("hex");

    // Check for existing product
    const existingProduct = await Product_Entity.findOne({ productName });
    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists." });
    }

    // Create new product
    const product = new Product_Entity({
      productName,
      appType,
      appStatus,
      appDescription,
      appSecrectKey,
      appID,
      appToken,
    });

    await product.save();

    // Exclude sensitive fields from response
    const responseProduct = product.toObject();
    delete responseProduct.appSecretKey;
    delete responseProduct.appToken;

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: responseProduct,
    });
  } catch (err) {
    console.error("Error:", err);

    if (err.isJoi === true) {
      return res.status(422).json({ message: err.message });
    }

    return res.status(500).json({ message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product_Entity.find();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let { productDocId, productName, appType, appStatus, appDescription } =
      await UpdateProductSV.validateAsync(req.body);

    let updatedProduct = await Product_Entity.findByIdAndUpdate(
      productDocId,
      {
        $set: {
          productName,
          appType,
          appStatus,
          appDescription,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Error:", err);

    if (err.isJoi === true) {
      return res.status(422).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productDocId } = req.params;
    const deletedProduct = await Product_Entity.findByIdAndDelete(productDocId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};
