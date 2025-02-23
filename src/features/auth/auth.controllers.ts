import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { LoginUserDto } from "./auth.schema";
import { createJWT } from "../../utils/jwt.utils";
import sendResponse from "../../utils/api-response";
import { CreateUserDto } from "../user/user.schema";
import { hash, verify } from "../../utils/hash.utils";
import { createUser, getUserByEmail } from "../user/user.services";
import { NotFoundError, UnauthenticatedError } from "../../errors";

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserDto["body"]>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  const isValid = await verify(user.password, password, false);

  if (!isValid) {
    throw new UnauthenticatedError("Password is not valid");
  }

  const payload = {
    email: email,
    userId: user._id,
  };

  const accessToken = createJWT(payload);

  res.setHeader(
    "Set-Cookie",
    "Authorization=" + accessToken + "; HttpOnly; Path=/; SameSite=Lax;"
  );

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: user,
    message: "User logged in successfully",
  });
};

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
