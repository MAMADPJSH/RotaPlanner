import Joi from "joi";

export const groupSchema = Joi.object({
  group_name: Joi.string().min(2).max(100).required(),
});
