import Joi from "joi";

export const propertyValidation = Joi.object({
  propertyName: Joi.string().required().min(3).max(50),
  price: Joi.number().required(),
  description: Joi.string().required().min(10).max(100),
  location: Joi.string().required(),
  type: Joi.string().required().valid("buy", "sell", "rent"),
});

export const getAllPropertyQuery = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).required(),
});
