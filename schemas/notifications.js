import Joi from "joi";

const notificationSchema = Joi.object({
	id: Joi.number().required(),
	key: Joi.string().required(),
	read: Joi.boolean().required(),
	verb: Joi.string().required(),
	recipient: Joi.object().required(),
	actor: Joi.object().required(),
	target_type: Joi.string().required().allow(null),
	target: Joi.object().allow(null),
	obj_type: Joi.string().required().allow(null),
	obj: Joi.object().allow(null),
	created: Joi.date().iso().required(),
}).unknown(true);

export const notificationsSchema = Joi.array().items(notificationSchema);

export default notificationSchema;
