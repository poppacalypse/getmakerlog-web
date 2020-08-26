import Joi from "joi";

const commentSchema = Joi.object({
	id: Joi.number().required(),
	user: Joi.object().required(),
	content: Joi.string().required(),
	created_at: Joi.date().iso().required(),
});

export const commentsSchema = Joi.array().items(commentSchema);

export default commentSchema;
