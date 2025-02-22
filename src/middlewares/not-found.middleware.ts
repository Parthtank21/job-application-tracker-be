import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../utils/api-response";

const notFoundMiddleware = (req: Request, res: Response) => {
  // return res.status(StatusCodes.NOT_FOUND).send("Route does not exist");
  return sendResponse({
    res,
    statusCode: StatusCodes.NOT_FOUND,
    message: "Route does not exist",
  });
};

export default notFoundMiddleware;
