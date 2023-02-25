import { Router } from "express";
import { ROUTES } from "../../constants/index";
import ClassController from "../controllers/class.controller";
import { validateClass } from "../middlewares/class";
import { isLoggedIn } from "../middlewares/auth";
const {
  CREATECLASS,
  DELETECLASS,
  GETCLASS,
  GETCLASSES
} = ROUTES

const { 
    createClass,
    getClass,
    getClasses,
    deleteClass
} = ClassController;


const classRouter = Router()

classRouter.get(
  GETCLASS,
  getClass
);

classRouter.get(
  GETCLASSES,
  getClasses
);

classRouter.use(isLoggedIn);

classRouter.post(
  CREATECLASS,
  validateClass,
  createClass
);

classRouter.delete(
  DELETECLASS,
  deleteClass
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