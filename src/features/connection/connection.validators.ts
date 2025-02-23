import { validate } from "../../middlewares";
import {
  createConnectionSchema,
  deleteConnectionSchema,
  getConnectionSchema,
  updateConnectionSchema,
} from "./connection.schema";

export const validateCreateConnection = validate(createConnectionSchema);
export const validateGetConnection = validate(getConnectionSchema);
export const validateUpdateConnection = validate(updateConnectionSchema);
export const validateDeleteConnection = validate(deleteConnectionSchema);
