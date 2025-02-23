import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { hash } from "../../utils/hash.utils";
import { UpdateUserDto } from "./user.schema";
import sendResponse from "../../utils/api-response";
import { NotFoundError, UnauthenticatedError } from "../../errors";
import { deleteUser, getSingleUser, updateUser } from "./user.services";

export const getUserHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const user = await getSingleUser(userId);
  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: user,
    message: "User fetched successfully",
  });
};

export const updateUserHandler = async (
  req: Request<{}, {}, UpdateUserDto["body"]>,
  res: Response
) => {
  const userId = req.user?.userId;
  const updatedData = req.body;
  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  if (req.body.password) {
    const { password } = req.body;
    const hashedPassword = await hash(password, false);
    updatedData["password"] = hashedPassword;
  }

  const user = await updateUser(userId, updatedData);
  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    data: user,
    message: "User updated successfully",
  });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const user = await deleteUser(userId);
  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    message: "User deleted successfully",
  });
};
