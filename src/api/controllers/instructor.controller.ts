import { StatusCodes, ReasonPhrases } from "http-status-codes";
import InstructorService from '../services/instructor'
import {
  successResponse,
  errorResponse,
  getPagination,
  getPagingData,
} from "../../helpers"
import { Request, Response } from "express";
import { logger } from "../../config/logger";
// import { IProductDocument } from "../model/products/product.types";
const { CREATED, NOT_FOUND, OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;


const { createInstructor } = InstructorService


export default class InstructorController {
  static async createInstructor(req: Request, res: Response) {
    try {
      const { body } = req;
      if (req.body.type === 'instructor') createInstructor(body);
      logger("info", 'instructor created:::InstructorController.createInstructor')
      return successResponse({
        res,
        message: "instructor created",
        statusCode: CREATED
      })
    } catch (error) {
      logger("error",  error);
      return errorResponse({
        res,
        message: "error while creating instructor",
      })
    }
  }

}