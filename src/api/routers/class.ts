import { Router } from "express";
import { ROUTES } from "../../constants/index";
import ClassController from "../controllers/classes/class.controller";
import { validateClass } from "../middlewares/class";
const {
  CREATECLASS,
} = ROUTES

const { 
    createClass
} = ClassController;


const classRouter = Router()

classRouter.post(
  CREATECLASS,
  validateClass,
  createClass
);
   
// productRouter.get(
//   GETPRODUCTS,
//   getProducts
// );

// productRouter.patch(
//   UPDATEPRODUCT,
//   updateProducts
// );

// productRouter.delete(
//   DELETEPRODUCT,
//   deleteProduct
// )

export default classRouter