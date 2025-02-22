import { Response } from "express";

interface IResponse {
  res: Response;
  statusCode: number;
  data?: any;
  message: string;
}

const sendResponse = ({ res, statusCode, data = [], message }: IResponse) => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data,
  });
};

export default sendResponse;
