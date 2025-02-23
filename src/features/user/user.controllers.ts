import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CreateUserDto,
  DeleteUserDto,
  GetUserDto,
  UpdateUserDto,
} from "./user.schema";
import {
  createUser,
  deleteUser,
  getSingleUser,
  updateUser,
} from "./user.services";
import { hash } from "../../utils/hash.utils";
import sendResponse from "../../utils/api-response";
import { NotFoundError } from "../../errors";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserDto["body"]>,
  res: Response
) => {
  const { password, ...rest } = req.body;
  const hashedPassword = await hash(password, false);
  const newUser = await createUser({ ...rest, password: hashedPassword });

  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    message: "User registered successfully",
  });
};

export const getUserHandler = async (
  req: Request<GetUserDto["params"]>,
  res: Response
) => {
  const userId = req.params.id;
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
  req: Request<UpdateUserDto["params"], {}, UpdateUserDto["body"]>,
  res: Response
) => {
  const userId = req.params.id;
  const updatedData = req.body;

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

export const deleteUserHandler = async (
  req: Request<DeleteUserDto["params"]>,
  res: Response
) => {
  const userId = req.params.id;
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
