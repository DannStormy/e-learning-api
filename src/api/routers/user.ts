import { Router } from "express";
import { ROUTES } from "../../constants/index";
import UserController from "../controllers/user.controller";
import { validateUser, findUser } from "../middlewares/class";
const {
  CREATEUSER,
} = ROUTES

const { 
    createUser,
} = UserController;


const studentRouter = Router()

studentRouter.post(
  CREATEUSER,
  validateUser,
  findUser,
  createUser
);
   
export default studentRouter