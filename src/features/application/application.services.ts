import { Types } from "mongoose";
import Application, { ApplicationInput } from "./application.model";

export const createApplication = async (input: ApplicationInput) => {
  const application = await Application.create(input);
  return application;
};

export const getApplicationList = async (userId: string) => {
  const applications = await Application.find({ userId });
  return applications;
};

export const getSingleApplication = async (
  applicationId: string,
  userId: string
) => {
  const application = await Application.findOne({
    _id: applicationId,
    userId,
  }).lean();

  return application;
};

export const updateApplication = async (
  applicationId: string,
  userId: string,
  input: ApplicationInput
) => {
  const application = await Application.findOneAndUpdate(
    { _id: applicationId, userId },
    input,
    {
      runValidators: true,
      new: true,
      lean: true,
    }
  );
  return application;
};

export const deleteApplication = async (
  applicationId: string,
  userId: string
) => {
  const application = await Application.findOneAndDelete({
    _id: applicationId,
    userId,
  }).lean();
  return application;
};
