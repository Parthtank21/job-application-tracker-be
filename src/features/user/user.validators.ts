import { validate } from "../../middlewares";
import {
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "./user.schema";

export const validateGetUser = validate(getUserSchema);
export const validateUpdateUser = validate(updateUserSchema);
export const validateDeleteUser = validate(deleteUserSchema);
