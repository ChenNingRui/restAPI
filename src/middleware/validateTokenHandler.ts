import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import { JwtPayload, verify } from "jsonwebtoken";
import { IUserRequest } from "../types";

export const validateTokenHandler = asyncHandler(
  async (req: IUserRequest, res: Response, next: NextFunction) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && String(authHeader).startsWith("Bearer")) {
      token = String(authHeader).split(" ")[1];
      verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded: JwtPayload) => {
          if (err) {
            res.status(401);
            throw new Error("User is not authorized");
          }
          console.log(decoded);
          req.user = decoded.user;
          next();
        }
      );

      if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
      }
    }
  }
);
