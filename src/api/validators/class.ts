import Joi from "joi";

/**
 * Validator for user details during registration
 * @validator
 */

const lesson = Joi.object().keys({
  lesson_number:Joi.number().required(),
  lesson_title: Joi.string().required(),
  lesson_body: Joi.string().required()
})
export const ClassValidation: any = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  instructor: Joi.string().required(),
  lessons: Joi.array().min(1).items(lesson).required()
});