import Joi from "joi";

const taskSchema = Joi.object({
	id: Joi.number().integer().required(),
	event: Joi.alternatives(Joi.string(), Joi.allow(null)),
	done: Joi.bool().required(),
	in_progress: Joi.bool().required(),
	content: Joi.string().required(),
	created_at: Joi.date().iso().required(),
	updated_at: Joi.date().iso().required(),
	done_at: Joi.alternatives(Joi.date().iso(), Joi.allow(null)),
	description: Joi.alternatives(Joi.string(), Joi.allow(null)),
	product_set: Joi.array(),
	project_set: Joi.array(),
	praise: Joi.number().required(),
	comment_count: Joi.number().required(),
	og_image: Joi.alternatives(Joi.string(), Joi.allow(null)),
	video: Joi.alternatives(Joi.string(), Joi.allow(null)),
	attachment: Joi.alternatives(Joi.string(), Joi.allow(null)),
});

export default taskSchema;
