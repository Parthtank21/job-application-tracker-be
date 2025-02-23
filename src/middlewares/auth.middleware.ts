import { verifyJWT } from "../utils/jwt.utils";
import { UnauthenticatedError } from "../errors";
import { NextFunction, Request, Response } from "express";

interface JwtPayload {
  email: string;
  userId: string;
}

const getCookies = (req: Request) => {
  const cookies = req.headers.cookie || "";
  const rawCookies = cookies.split(";");
  const parsedCookies: { [key: string]: string } = {};

  rawCookies.forEach((rawCookie) => {
    const cookie = rawCookie.split("=");
    parsedCookies[cookie[0]] = cookie[1];
  });

  return parsedCookies;
};

export const getAuthorization = (req: Request) => {
  return getCookies(req)["Authorization"];
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = getAuthorization(req);

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = verifyJWT(token) as JwtPayload;
    req.user = { ...payload };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default authMiddleware;
