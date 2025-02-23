import express, { IRouter } from "express";
import { createUserHandler, loginUserHandler } from "./auth.controllers";
import { validateCreateUser, validateLoginUser } from "./auth.validators";

const router: IRouter = express.Router();

router.route("/login").post(validateLoginUser, loginUserHandler);
router.route("/register").post(validateCreateUser, createUserHandler);

export default router;
