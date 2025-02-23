import express, { IRouter } from "express";
import { validateLoginUser } from "./auth.validators";
import { loginUserHandler } from "./auth.controllers";

const router: IRouter = express.Router();

router.route("/login").post(validateLoginUser, loginUserHandler);

export default router;
