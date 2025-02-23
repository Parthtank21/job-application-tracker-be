import { validate } from "../../middlewares";
import {
  createApplicationSchema,
  deleteApplicationSchema,
  getApplicationSchema,
  updateApplicationSchema,
} from "./application.schema";

export const validateCreateApplication = validate(createApplicationSchema);
export const validateGetApplication = validate(getApplicationSchema);
export const validateUpdateApplication = validate(updateApplicationSchema);
export const validateDeleteApplication = validate(deleteApplicationSchema);
