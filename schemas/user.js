import Joi from "joi";

export const userSchema = Joi.object().keys({
	id: Joi.number().integer().required(),
	username: Joi.string().required(),
	first_name: Joi.string().allow(null, ""),
	last_name: Joi.string().allow(null, ""),
	status: Joi.string().allow(null, ""),
	description: Joi.string().allow(null, ""),
	verified: Joi.boolean(),
	private: Joi.boolean(),
	avatar: Joi.string().uri().required().allow(null, ""),
	streak: Joi.number().integer().required().allow(null),
	timezone: Joi.string().required().allow(null),
	week_tda: Joi.number().integer(),
	twitter_handle: Joi.string().allow(null, ""),
	instagram_handle: Joi.string().allow(null, ""),
	product_hunt_handle: Joi.string().allow(null, ""),
	github_handle: Joi.string().allow(null, ""),
	telegram_handle: Joi.string().allow(null, ""),
	nomadlist_handle: Joi.string().allow(null, ""),
	bmc_handle: Joi.string().allow(null, ""),
	header: Joi.string().uri().allow(null, ""),
	is_staff: Joi.boolean(),
	donor: Joi.boolean(),
	shipstreams_handle: Joi.string().allow(null, ""),
	website: Joi.string().allow(null, ""),
	tester: Joi.boolean(),
	is_live: Joi.boolean(),
	digest: Joi.boolean(),
	gold: Joi.boolean(),
	accent: Joi.string().allow(null, ""),
	maker_score: Joi.number().integer().allow(null, ""),
	dark_mode: Joi.boolean(),
	ads_enabled: Joi.boolean(),
	weekends_off: Joi.boolean(),
	hardcore_mode: Joi.boolean(),
	email_notifications: Joi.boolean(),
	og_image: Joi.string().uri().allow(null, ""),
	date_joined: Joi.string(),
});

export const privilegedUserSchema = userSchema.keys({
	email: Joi.string().required().allow(null),
	needs_setup: Joi.boolean().required(),
});
