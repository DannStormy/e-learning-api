import Joi from "joi";

/**
 * Validator for user details during registration
 * @validator
 */

const address = Joi.object().keys({
    street_address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.number().required()
})

export const UserValidation : any = Joi.object({
    type: Joi.string().valid('student', 'instructor').required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    address: Joi.array().min(1).items(address).required(),
    email: Joi.string().email().required(),
});