import Joi from "joi";

const CreateNewProductSV = Joi.object({
  productName: Joi.string().required(),
  appType: Joi.string().required(),
  appStatus: Joi.string().required().default("testing"),
  appDescription: Joi.string().required(),
});

const UpdateProductSV = Joi.object({
  productDocId: Joi.string().hex().length(24).required().messages({
    "string.length": "productDocId is invalid",
    "string.hex": "productDocId is invalid",
  }),
  productName: Joi.string(),
  appType: Joi.string(),
  appStatus: Joi.string(),
  appDescription: Joi.string(),
});

export { CreateNewProductSV, UpdateProductSV };
