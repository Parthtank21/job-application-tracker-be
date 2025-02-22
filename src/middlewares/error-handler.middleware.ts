import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/api-response";

interface ICustomError extends Error {
  statusCode: number;
  errors?: { [key: string]: { message: string } };
  code?: number;
  value?: string;
}

const errorHandlerMiddleware = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = Object.values(err.errors!)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.msg = `No item found with id: ${err.value}`;
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.msg = "Entity already exists";
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return sendResponse({
    res,
    statusCode: customError.statusCode,
    message: customError.msg,
  });
};

export default errorHandlerMiddleware;
