import Joi from "joi";

const praiseSchema = Joi.object({
	praised: Joi.boolean().required(),
	praised_by: Joi.array().required(),
	total: Joi.number().integer().required(),
});

export default praiseSchema;
