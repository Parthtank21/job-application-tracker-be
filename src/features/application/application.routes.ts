import express, { IRouter } from "express";
import {
  validateCreateApplication,
  validateDeleteApplication,
  validateGetApplication,
  validateUpdateApplication,
} from "./application.validators";
import {
  createApplicationHandler,
  deleteApplicationHandler,
  getApplicationsHandler,
  getSingleApplicationHandler,
  updateApplicationHandler,
} from "./application.controllers";

const router: IRouter = express.Router();

router
  .route("/")
  .get(getApplicationsHandler)
  .post(validateCreateApplication, createApplicationHandler);
router
  .route("/:id")
  .put(validateUpdateApplication, updateApplicationHandler)
  .get(validateGetApplication, getSingleApplicationHandler)
  .delete(validateDeleteApplication, deleteApplicationHandler);

export default router;
