import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/api-response";
import { NotFoundError, UnauthenticatedError } from "../../errors";
import {
  CreateConnectionDto,
  GetConnectionDto,
  UpdateConnectionDto,
  DeleteConnectionDto,
} from "./connection.schema";
import {
  getConnectionList,
  getSingleConnection,
  updateConnection,
  deleteConnection,
  createConnection,
} from "./connection.services";

export const createConnectionHandler = async (
  req: Request<{}, {}, CreateConnectionDto["body"]>,
  res: Response
) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const connection = await createConnection({
    userId,
    ...req.body,
  });

  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    data: connection,
    message: "Connection created successfully",
  });
};

export const getConnectionsHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const connections = await getConnectionList(userId);

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: connections,
    message: "Connections fetched successfully",
  });
};

export const getSingleConnectionHandler = async (
  req: Request<GetConnectionDto["params"]>,
  res: Response
) => {
  const userId = req.user?.userId;
  const connectionId = req.params.id;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const connection = await getSingleConnection(connectionId, userId);

  if (!connection) {
    throw new NotFoundError(`Connection not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: connection,
    message: "Connection fetched successfully",
  });
};

export const updateConnectionHandler = async (
  req: Request<UpdateConnectionDto["params"], {}, UpdateConnectionDto["body"]>,
  res: Response
) => {
  const userId = req.user?.userId;
  const connectionId = req.params.id;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const connection = await updateConnection(connectionId, userId, {
    ...req.body,
    userId,
  });

  if (!connection) {
    throw new NotFoundError(`Connection not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: connection,
    message: "Connection updated successfully",
  });
};

export const deleteConnectionHandler = async (
  req: Request<DeleteConnectionDto["params"]>,
  res: Response
) => {
  const userId = req.user?.userId;
  const connectionId = req.params.id;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const connection = await deleteConnection(connectionId, userId);

  if (!connection) {
    throw new NotFoundError(`Connection not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: connection,
    message: "Connection deleted successfully",
  });
};
