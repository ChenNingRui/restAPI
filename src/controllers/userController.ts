import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { userModel } from "../models/user";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUserRequest } from "../types";

//@desc Register User
//@route POST /Users
//@access private
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const hasUser = await userModel.findOne({ email });
    if (hasUser) {
      res.status(400);
      throw new Error("User already existed!");
    }

    const hashedPassword = await hash(password, 10);
    const user = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  }
);

//@desc get User
//@route GET /Users
//@access private
export const currentUser = asyncHandler(
  async (req: IUserRequest, res: Response) => {
    res.status(201).json(req.user);
  }
);

//@desc login User
//@route POST /Users
//@access private
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await userModel.findOne({ email });
  const isMatched = await compare(password, user.password);
  if (user && isMatched) {
    const accessToken = sign(
      {
        user: {
          user: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    res.status(200).json({ message: `accessToken: ${accessToken}` });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});
