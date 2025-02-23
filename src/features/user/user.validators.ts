import { validate } from "../../middlewares";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "./user.schema";

export const validateCreateUser = validate(createUserSchema);
export const validateGetUser = validate(getUserSchema);
export const validateUpdateUser = validate(updateUserSchema);
export const validateDeleteUser = validate(deleteUserSchema);
