import Joi from "joi";

export const threadSchema = Joi.object({
	id: Joi.number().required(),
	slug: Joi.string().required(),
	type: Joi.string().required(),
	title: Joi.string().required(),
	pinned: Joi.bool().required(),
	owner: Joi.object().required(),
	body: Joi.string().required(),
	created_at: Joi.date().iso().required(),
	updated_at: Joi.date().iso().required(),
	reply_count: Joi.number().required(),
});

export const threadsSchema = Joi.array().items(threadSchema);

export const replySchema = Joi.object({
	id: Joi.number().required(),
	parent: Joi.string().required(),
	owner: Joi.object().required(),
	body: Joi.string().required(),
	created_at: Joi.date().iso().required(),
	updated_at: Joi.date().iso().required(),
	praise: Joi.number().required(),
});

export const repliesSchema = Joi.array().items(threadSchema);
