import { Router } from "express";
import { ROUTES } from "../../constants/index";
import ClassController from "../controllers/class.controller";
import { validateClass } from "../middlewares/class";
import { isLoggedIn } from "../middlewares/auth";
const {
  CREATECLASS,
  DELETECLASS,
  ENROLLCLASS,
  DELETEENROLLEDCLASS,
  GETCLASS,
  GETCLASSES
} = ROUTES

const { 
    createClass,
    getClass,
    getClasses,
    deleteClass,
    enrollClass,
    deleteEnrolledClass
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

// classRouter.use(isLoggedIn);

classRouter.post(
  CREATECLASS,
  isLoggedIn,
  validateClass,
  createClass
);

classRouter.post(
  ENROLLCLASS,
  isLoggedIn,
  enrollClass
);

classRouter.delete(
  DELETEENROLLEDCLASS,
  isLoggedIn,
  deleteEnrolledClass
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