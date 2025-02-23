import { Types } from "mongoose";
import Connection, { ConnectionInput } from "./connection.model";

export const createConnection = async (input: ConnectionInput) => {
  const connection = await Connection.create(input);
  return connection;
};

export const getConnectionList = async (userId: string) => {
  const connections = await Connection.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "applications",
        localField: "company",
        foreignField: "_id",
        as: "companyDetails",
      },
    },
    {
      $addFields: {
        companyName: { $arrayElemAt: ["$companyDetails.companyName", 0] },
      },
    },
    {
      $project: {
        companyDetails: 0,
      },
    },
  ]);

  return connections;
};

export const getSingleConnection = async (
  connectionId: string,
  userId: string
) => {
  const connection = await Connection.findOne({
    _id: connectionId,
    userId,
  }).lean();
  return connection;
};

export const updateConnection = async (
  connectionId: string,
  userId: string,
  input: ConnectionInput
) => {
  const connection = await Connection.findOneAndUpdate(
    { _id: connectionId, userId },
    input,
    {
      runValidators: true,
      new: true,
      lean: true,
    }
  );
  return connection;
};

export const deleteConnection = async (
  connectionId: string,
  userId: string
) => {
  const connection = await Connection.findOneAndDelete({
    _id: connectionId,
    userId,
  }).lean();
  return connection;
};
