import 'dotenv/config'
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export const createJWT = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, secret);
};
