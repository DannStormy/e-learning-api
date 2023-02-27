import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ClassService from "../services/class";
import StudentService from '../services/student';
import {
  successResponse,
  errorResponse,
  getPagination,
  getPagingData,
} from "../../helpers"
import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { RequestWithUser } from "../types";
const { CREATED, NOT_FOUND, OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;


const { createClass, getClass, totalClassCount, getClasses, deleteClass } = ClassService


export default class ClassController {
  static async createClass(req: Request, res: Response) {
    try {
      const { body } = req;
      createClass(body);
      return successResponse({
        res,
        message: "class created",
        statusCode: CREATED
      })
    } catch (error) {
      logger("error", error);
      return errorResponse({
        res,
        message: "error while creating class",
      })
    }
  }

  static async getClass(req: Request, res: Response) {
    try {
      const { class_id } = req.params
      const cl = await getClass(class_id);
      if (!cl) {
        return errorResponse({
          res,
          message: "class not found",
          statusCode: NOT_FOUND
        })
      }
      return successResponse({
        res,
        data: cl,
        message: "class fetched",
        statusCode: OK
      })
    } catch (error) {
      logger("error", error)
      errorResponse({
        res,
        message: "we encountered a problem while fetching a class"
      })
    }
  }

  static async deleteClass(req: Request, res: Response) {
    try {
      const { class_id } = req.params
      const cl = await getClass(class_id);
      if (!cl) {
        return errorResponse({
          res,
          message: "class not found",
          statusCode: NOT_FOUND
        })
      }
      await deleteClass(class_id);
      return successResponse({
        res,
        message: "class deleted",
        statusCode: OK
      })
    } catch (error) {
      console.log("Error: ", error)
      return errorResponse({
        res,
        message: "we encoutered a problem while deleting class"
      })
    }
  }

  static async getClasses(req: Request, res: Response) {
    try {
      const { page, size, queryCondition } = req.query;
      const { limit, offset } = getPagination(Number(page), Number(size));
      const count = await totalClassCount();
      if (!count) {
        throw new Error("no count return")
      }
      const classes = await getClasses();
      if (!count) {
        return errorResponse({
          res,
          message: "classes not found",
          statusCode: NOT_FOUND
        })
      }
      let data = {
        count: count,
        rows: classes
      }
      const respData = getPagingData(data, Number(page), limit);
      return successResponse({
        res,
        data: respData,
        message: "fetch all classes",
        statusCode: OK
      })
    } catch (error) {
      return errorResponse({
        res,
        message: "we encoutered a problem while fetching classes"
      })
    }
  }

  static async enrollClass(req: RequestWithUser, res: Response) {
    try {
      const { params, user, body } = req;
      const cl = await ClassService.getClass(params.class_id);
      if (!cl) {
        return errorResponse({
          res,
          message: "class not found",
          statusCode: NOT_FOUND
        })
      }

      const enrolledCl = await StudentService.findEnrolledClass(params.class_id, user?.username as string);
      if (enrolledCl.classes.length > 0) {
        return errorResponse({
          res,
          message: "class already enrolled",
          statusCode: BAD_REQUEST
        })
      }

      await StudentService.enrollClass(cl.id, cl.title, user?.username as string)
      return successResponse({
        res,
        message: "class enrolled",
        statusCode: CREATED
      })
    } catch (error: any) {
      logger("error", error.message);
      return errorResponse({
        res,
        message: "error while enrolling in class",
      })
    }
  }

  static async deleteEnrolledClass(req: RequestWithUser, res: Response) {
    try {
      const { params, user, body } = req;
      const cl = await StudentService.findEnrolledClass(params.class_id, user?.username as string);
      if (cl.classes.length < 1) {
        return errorResponse({
          res,
          message: "class not found",
          statusCode: NOT_FOUND
        })
      }
      const c: any = cl.classes[0].class_id
      await StudentService.deleteEnrolledClass(c, user?.username as string)
      return successResponse({
        res,
        message: "class removed",
        statusCode: CREATED
      })
    } catch (error: any) {
      logger("error", error.message);
      return errorResponse({
        res,
        message: "error while removing class",
      })
    }
  }
}