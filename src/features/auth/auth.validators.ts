import { validate } from "../../middlewares";
import { loginUserSchema } from "./auth.schema";

export const validateLoginUser = validate(loginUserSchema);
