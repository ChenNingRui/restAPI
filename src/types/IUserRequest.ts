import { Request } from "express";
import mongoose from "mongoose";

export type IUserRequest = Request & {
  user: {
    id: mongoose.Schema.Types.ObjectId;
  };
};
