import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/api-response";
import { NotFoundError, UnauthenticatedError } from "../../errors";
import {
  CreateApplicationDto,
  DeleteApplicationDto,
  GetApplicationDto,
  UpdateApplicationDto,
} from "./application.schema";
import {
  createApplication,
  deleteApplication,
  getApplicationList,
  getSingleApplication,
  updateApplication,
} from "./application.services";

export const createApplicationHandler = async (
  req: Request<{}, {}, CreateApplicationDto["body"]>,
  res: Response
) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const application = await createApplication({
    userId,
    ...req.body,
  });

  sendResponse({
    res,
    statusCode: StatusCodes.CREATED,
    data: application,
    message: "Application created successfully",
  });
};

export const getApplicationsHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const applications = await getApplicationList(userId);

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: applications,
    message: "Applications fetched successfully",
  });
};

export const getSingleApplicationHandler = async (
  req: Request<GetApplicationDto["params"]>,
  res: Response
) => {
  const userId = req.user?.userId;
  const applicationId = req.params.id;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const application = await getSingleApplication(applicationId, userId);

  if (!application) {
    throw new NotFoundError(`Application not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: application,
    message: "Application fetched successfully",
  });
};

export const updateApplicationHandler = async (
  req: Request<
    UpdateApplicationDto["params"],
    {},
    UpdateApplicationDto["body"]
  >,
  res: Response
) => {
  const userId = req.user?.userId;
  const applicationId = req.params.id;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const application = await updateApplication(applicationId, userId, {
    ...req.body,
    userId,
  });

  if (!application) {
    throw new NotFoundError(`Application not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: application,
    message: "Application updated successfully",
  });
};

export const deleteApplicationHandler = async (
  req: Request<DeleteApplicationDto["params"]>,
  res: Response
) => {
  const userId = req.user?.userId;
  const applicationId = req.params.id;

  if (!userId) {
    throw new UnauthenticatedError("Authentication failed");
  }

  const application = await deleteApplication(applicationId, userId);

  if (!application) {
    throw new NotFoundError(`Application not found`);
  }

  sendResponse({
    res,
    statusCode: StatusCodes.OK,
    data: application,
    message: "Application deleted successfully",
  });
};
