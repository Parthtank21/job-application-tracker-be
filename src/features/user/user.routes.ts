import express, { IRouter } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
} from "./user.controllers";
import {
  validateCreateUser,
  validateDeleteUser,
  validateGetUser,
  validateUpdateUser,
} from "./user.validators";

const router: IRouter = express.Router();

router.route("/").post(validateCreateUser, createUserHandler);
router
  .route("/:id")
  .get(validateGetUser, getUserHandler)
  .put(validateUpdateUser, updateUserHandler)
  .delete(validateDeleteUser, deleteUserHandler);

export default router;
