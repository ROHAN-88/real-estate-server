import Joi from "joi";

export const userRegisterValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string()
    .min(8)
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { "any.only": "{{#label}} does not match" } }),

  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "preferNotToSay"),
  dob: Joi.date().required(),
  role: Joi.string().valid("buyer", "seller"),
});

//! login validation
export const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
});
