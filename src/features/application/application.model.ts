import mongoose from "mongoose";

export interface ApplicationInput {
  userId: string;
  companyName: string;
  appliedOn: string;
  location: string;
  postUrl?: string;
  description?: string;
  role: string;
  mobile?: string;
  email?: string;
  website?: string;
  linkedIn?: string;
  status?: "rejected" | "no-response" | "responded" | "selected";
  // referrals?: Types.ObjectId[];
}

export interface ApplicationDocument
  extends ApplicationInput,
    mongoose.Document {
  updatedAt: Date;
  createdAt: Date;
}

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
      index: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    appliedOn: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    postUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    status: {
      type: String,
      enum: ["rejected", "no-response", "responded", "selected"],
      default: "no-response",
    },
    // referrals: {
    //   type: [mongoose.Types.ObjectId],
    //   ref: "User",
    //   required: [true, "User Id is required"],
    // }
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model<ApplicationDocument>(
  "Application",
  ApplicationSchema
);

export default Application;
