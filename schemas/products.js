import Joi from "joi";

export const productSchema = Joi.object().keys({
	id: Joi.number().integer().required(),
	name: Joi.string(),
	slug: Joi.string().required(),
	user: Joi.number().integer().required(),
	team: Joi.array().items(
		Joi.number().integer(),
		Joi.number().integer(),
		Joi.number().integer()
	),
	product_hunt: Joi.string().allow(null, ""),
	twitter: Joi.string().allow(null, ""),
	website: Joi.string().allow(null, ""),
	projects: Joi.array().items(
		Joi.object().keys({
			id: Joi.number().integer().required(),
			name: Joi.string().required(),
			private: Joi.boolean(),
			user: Joi.number().integer().required(),
		})
	),
	launched: Joi.boolean().required(),
	icon: Joi.string().uri().allow(null, ""),
	description: Joi.string().allow(null, ""),
	accent: Joi.string().required().allow(null, ""),
	created_at: Joi.string().required(),
	launched_at: Joi.string().required().allow(null, ""),
	tags: Joi.array().allow(null),
});

export const productsSchema = Joi.array().items(productSchema);
