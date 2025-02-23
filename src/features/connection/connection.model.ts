import mongoose from "mongoose";

export interface ConnectionInput {
  userId: string;
  name: string;
  mobile?: string;
  company: string;
  email?: string;
  linkedIn?: string;
  description?: string;
  designation: string;
}

export interface ConnectionDocument extends ConnectionInput, mongoose.Document {
  updatedAt: Date;
  createdAt: Date;
}

const ConnectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Application",
      required: [true, "Company is required"],
      index: true,
    },
    email: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    description: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Connection = mongoose.model<ConnectionDocument>(
  "Connection",
  ConnectionSchema
);

export default Connection;
