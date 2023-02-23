import { StatusCodes, ReasonPhrases } from "http-status-codes";
import ClassService from "../../services/class";
import {
  successResponse,
  errorResponse,
  getPagination,
  getPagingData,
} from "../../../helpers"
import { Request, Response } from "express";
import { logger } from "../../../config/logger";
// import { IProductDocument } from "../model/products/product.types";
const { CREATED, NOT_FOUND, OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;


const { createClass, getClass, totalClassCount, getClasses } = ClassService


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
      logger("error",  error);
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
        data:  cl,
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

  // static async deleteProduct(req: Request, res: Response) {
  //   try {
  //     const { product_id } = req.params
  //     const product = await getProduct(product_id);
  //     console.log("Product: ", product)
  //     if (!product) {
  //       return errorResponse({
  //         res,
  //         message: "products not found",
  //         statusCode: NOT_FOUND
  //       })
  //     }
  //     console.log(product_id, 'id')
  //     await deleteProduct(product_id);
  //     return successResponse({
  //       res,
  //       message: "product deleted",
  //       statusCode: OK
  //     })
  //   } catch (error) {
  //     console.log("Error: ", error)
  //     return errorResponse({
  //       res,
  //       message: "we encoutered a problem while deleting product"
  //     })
  //   }
  // }

  static async getClasses(req: Request, res: Response) {
    try {
      const { page, size, queryCondition } = req.query;
      const { limit, offset } = getPagination(Number(page), Number(size));
      const count = await totalClassCount();
      if (!count) {
        throw new Error("no count return")
      }
      const classes  = await getClasses();
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

  // static async updateProducts(req: Request, res: Response) {
  //   try {
  //     const { product_id} = req.params;
  //     const product = await getProduct(product_id)
  //     if (!product) {
  //       return errorResponse({
  //         res,
  //         message: "products not found",
  //         statusCode: NOT_FOUND
  //       })
  //     }
  //     const body = req.body
  //     await updateProduct(product_id, body)
  //     return successResponse({
  //       res,
  //       message: "product updated",
  //       statusCode: OK
  //     })
  //   } catch (error) {
  //     return errorResponse({
  //       res,
  //       message: "we encoutered a error while updating product"
  //     })
  //   }
  // }
}