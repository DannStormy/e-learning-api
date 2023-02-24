import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../helpers";
import { ClassValidation } from "../validators/class";
import { UserValidation } from "../validators/user";
import { NextFunction, Request, Response } from "express";
import StudentService from "../services/student";
import InstructorService from "../services/instructor";
const { UNPROCESSABLE_ENTITY } = StatusCodes;


export async function validateClass(req: Request, res: Response, next: NextFunction) {
  try {
    const valid = await ClassValidation.validateAsync(req.body)
    req.body = valid
    return next();
  } catch (error: any) {
    return errorResponse({
      res,
      statusCode: UNPROCESSABLE_ENTITY,
      message: error.details[0].message,
      error: error.details[0].message,
    });
  }
}

export async function validateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const valid = await UserValidation.validateAsync(req.body)
    req.body = valid
    return next();
  } catch (error: any) {
    return errorResponse({
      res,
      statusCode: UNPROCESSABLE_ENTITY,
      message: error.details[0].message,
      error: error.details[0].message,
    });
  }
}

export async function findUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { type, username, email } = req.body;
    if (type === 'student') {
      const student = await StudentService.findStudent(username, email)
      if (student) {
        throw new Error("student found")
      }
    }

    if (type === 'instructor') {
      const instructor = await InstructorService.findInstructor(username, email)
      if (instructor) {
        throw new Error("instructor found")
      }
    }
    return next()
  } catch (error: any) {
    return errorResponse({
      res,
      statusCode: UNPROCESSABLE_ENTITY,
      message: error.message,
      error: error.message
    });
  }
}