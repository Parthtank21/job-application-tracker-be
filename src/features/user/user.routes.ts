import express, { IRouter } from "express";
import {
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from "./user.controllers";
import {
  validateDeleteUser,
  validateGetUser,
  validateUpdateUser,
} from "./user.validators";

const router: IRouter = express.Router();

router
  .route("/")
  .get(validateGetUser, getUserHandler)
  .put(validateUpdateUser, updateUserHandler)
  .delete(validateDeleteUser, deleteUserHandler);

export default router;
