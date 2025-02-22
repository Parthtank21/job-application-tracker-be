import express, { IRouter } from "express";
import { healthcheckHandler } from "./healthcheck.controllers";

const router: IRouter = express.Router();

router.route("/").get(healthcheckHandler);

export default router;
