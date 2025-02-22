import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/api-response";

export const healthcheckHandler = (req: Request, res: Response) => {
  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: "Server is running",
  });
};
