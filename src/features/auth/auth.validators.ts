import { validate } from "../../middlewares";
import { loginUserSchema } from "./auth.schema";
import { createUserSchema } from "../user/user.schema";

export const validateLoginUser = validate(loginUserSchema);
export const validateCreateUser = validate(createUserSchema);
