import bcrypt from 'bcrypt';
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import InstructorService from '../services/instructor';
import StudentService from '../services/student';
import UserService from '../services/user';
import {
  successResponse,
  errorResponse,
  getPagination,
  getPagingData,
} from "../../helpers"
import { Request, Response } from "express";
import { logger } from "../../config/logger";
import { SALT_ROUNDS, AUTH_TOKEN_LIFETIME, JWT_AUTH_SECRET } from '../../constants';
// import { IProductDocument } from "../model/products/product.types";
const { CREATED, NOT_FOUND, OK, BAD_REQUEST, UNAUTHORIZED } = StatusCodes;


const { createStudent } = StudentService;
const { createInstructor } = InstructorService;


export default class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { body } = req;
      body.password = bcrypt.hashSync(body.password, SALT_ROUNDS);
      UserService.createUser(body);
      req.body.type === 'student' ? createStudent(body) : createInstructor(body);
      return successResponse({
        res,
        message: "user created",
        statusCode: CREATED
      })
    } catch (error) {
      logger("error",  error);
      return errorResponse({
        res,
        message: "error while creating user",
      })
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { username, password } = req.body
    try {
      const user = await UserService.findUser(username)
      if (!user) {
        return errorResponse({
          res,
          message: "Sorry, we couldn't find a user with those details.",
          statusCode: NOT_FOUND,
        });
      }
      const encryptedPassword = user.password;
      const isValid = bcrypt.compareSync(password, encryptedPassword);
      if (!isValid) {
        return errorResponse({
          res,
          message: 'Sorry, those credentials are incorrect.',
          statusCode: BAD_REQUEST,
        });
      }
      const userDetails = pick(
        user,
        'id',
        'type',
        'username',
      );
      const token = jwt.sign({ ...userDetails }, String(JWT_AUTH_SECRET), {
        expiresIn: AUTH_TOKEN_LIFETIME,
      });

      return successResponse({
        res,
        data: token,
        message: 'Logged in successfully',
        statusCode: OK,
      });
    } catch (error: any) {
      logger('error', error?.message || error);
      return errorResponse({
        res,
        message: `We encountered a problem while processing your request. Please try again.`,
      });
    }
  }

//   static async getClass(req: Request, res: Response) {
//     try {
//       const { class_id } = req.params
//       const cl = await getClass(class_id); 
//       if (!cl) {
//         return errorResponse({
//           res,
//           message: "class not found",
//           statusCode: NOT_FOUND
//         })
//       }
//       return successResponse({
//         res,
//         data:  cl,
//         message: "class fetched",
//         statusCode: OK
//       })
//     } catch (error) {
//       logger("error", error)
//       errorResponse({
//         res,
//         message: "we encountered a problem while fetching a class"
//       })
//     }
//   }

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

//   static async getClasses(req: Request, res: Response) {
//     try {
//       const { page, size, queryCondition } = req.query;
//       const { limit, offset } = getPagination(Number(page), Number(size));
//       const count = await totalClassCount();
//       if (!count) {
//         throw new Error("no count return")
//       }
//       const classes  = await getClasses();
//       if (!count) {
//         return errorResponse({
//           res,
//           message: "classes not found",
//           statusCode: NOT_FOUND
//         })
//       }
//       let data = {
//         count: count,
//         rows: classes
//       }
//       const respData = getPagingData(data, Number(page), limit);
//       return successResponse({
//         res,
//         data: respData,
//         message: "fetch all classes",
//         statusCode: OK
//       })
//     } catch (error) {
//       return errorResponse({
//         res,
//         message: "we encoutered a problem while fetching classes"
//       })
//     }
//   }

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