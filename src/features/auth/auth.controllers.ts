import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginUserDto } from "./auth.schema";
import { verify } from "../../utils/hash.utils";
import { createJWT } from "../../utils/jwt.utils";
import sendResponse from "../../utils/api-response";
import { getUserByEmail } from "../user/user.services";
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
    user_id: user.id,
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
