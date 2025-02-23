import cors from "cors";
import express, { Express } from "express";

import userRouter from "./features/user/user.routes";
import healthcheckRouter from "./features/healthcheck/healthcheck.routes";

import {
  morganMiddleware,
  notFoundMiddleware,
  errorHandlerMiddleware,
} from "./middlewares";

const app: Express = express();

// middlerwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

// routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/user", userRouter);

// middlerwares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
