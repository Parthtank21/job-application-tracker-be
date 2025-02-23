import express, { IRouter } from "express";
import {
  createConnectionHandler,
  deleteConnectionHandler,
  getConnectionsHandler,
  getSingleConnectionHandler,
  updateConnectionHandler,
} from "./connection.controllers";
import {
  validateCreateConnection,
  validateDeleteConnection,
  validateGetConnection,
  validateUpdateConnection,
} from "./connection.validators";

const router: IRouter = express.Router();

router
  .route("/")
  .get(getConnectionsHandler)
  .post(validateCreateConnection, createConnectionHandler);
router
  .route("/:id")
  .put(validateUpdateConnection, updateConnectionHandler)
  .get(validateGetConnection, getSingleConnectionHandler)
  .delete(validateDeleteConnection, deleteConnectionHandler);

export default router;
