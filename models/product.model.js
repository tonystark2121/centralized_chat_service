import mongoose, { Schema } from "mongoose";

const Product_Schema = new Schema({
  productName: { type: String, required: true },
  appSecrectKey: { type: String, required: true },
  appID: { type: String, required: true },
  appToken: { type: String, required: true },
  appType: { type: String, required: true },
  appStatus: { type: String, required: true },
  appDescription: { type: String, required: true },
});

const Product_Entity =
  mongoose.models.Product_Entity ||
  mongoose.model("Product_Entity", Product_Schema);

export { Product_Entity };
