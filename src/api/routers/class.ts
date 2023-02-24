import { Router } from "express";
import { ROUTES } from "../../constants/index";
import ClassController from "../controllers/class.controller";
import { validateClass } from "../middlewares/class";
const {
  CREATECLASS,
  GETCLASS,
  GETCLASSES
} = ROUTES

const { 
    createClass,
    getClass,
    getClasses
} = ClassController;


const classRouter = Router()

classRouter.post(
  CREATECLASS,
  validateClass,
  createClass
);
   
classRouter.get(
  GETCLASS,
  getClass
);

classRouter.get(
  GETCLASSES,
  getClasses
);

// productRouter.patch(
//   UPDATEPRODUCT,
//   updateProducts
// );

// productRouter.delete(
//   DELETEPRODUCT,
//   deleteProduct
// )

export default classRouter