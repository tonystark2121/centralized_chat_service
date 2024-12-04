import CreateNewProductSV from "../validators/product.validators.js";
import { randomBytes } from "crypto";
import { Product_Entity } from "../models/product.model.js";

export const createNewProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

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
