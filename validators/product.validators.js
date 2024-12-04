import Joi from "joi";

const CreateNewProductSV = Joi.object({
  productName: Joi.string().required(),
  appType: Joi.string().required(),
  appStatus: Joi.string().required().default("testing"),
  appDescription: Joi.string().required(),
});

export default CreateNewProductSV;
