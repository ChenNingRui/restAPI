import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please add the user name"],
    },
    email: {
      type: String,
      require: [true, "Please add the user email address"],
      unique: [true, "Email address already token"],
    },
    password: {
      type: String,
      require: [true, "Please add the user password"],
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
