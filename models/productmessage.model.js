import mongoose, { Schema } from "mongoose";

const attachmentsSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: false },
    name: { type: String, required: false },
  },
  { _id: false }
);

const ProductMessageSchema = new Schema({
  productDocId: { type: String, required: true, ref: "Product_Entity" },
  userDocId: { type: String, required: true },
  vendorDocId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  messageStatus: {
    type: String,
    required: true,
    enum: ["sent", "delivered", "read", "failed"],
    default: "sent",
  },
  messageTime: {
    type: Date,
    default: Date.now,
  },
  messageReadTime: {
    type: Date,
  },
  messageDeliveredTime: {
    type: Date,
  },
  messageFailedTime: {
    type: Date,
  },
  messageFailedReason: {
    type: String,
  },
  attachements: [attachmentsSchema],
});

const ProductMessage_Entity =
  mongoose.models.ProductMessage_Entity ||
  mongoose.model("ProductMessage_Entity", ProductMessageSchema);

export { ProductMessage_Entity };
