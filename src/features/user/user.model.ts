import mongoose from "mongoose";

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  password: string;
  isAdmin?: boolean;
  isUser?: boolean;
  emailVerified: boolean;
}

export interface UpdateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: String;
  password?: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  updatedAt: Date;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: { type: Boolean, default: false },
    isUser: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
