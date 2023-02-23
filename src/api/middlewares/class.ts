import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../../helpers";

import { ClassValidation } from "../validators/class";
import { NextFunction, Request, Response } from "express";
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