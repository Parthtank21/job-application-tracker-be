import User, { UpdateUserInput, UserInput } from "./user.model";

export const createUser = async (input: UserInput) => {
  const user = await User.create(input);
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }).lean();
  return user;
};

export const getSingleUser = async (userId: string) => {
  const user = await User.findById(userId).lean().select("-password");
  return user;
};

export const updateUser = async (userId: string, input: UpdateUserInput) => {
  const user = await User.findByIdAndUpdate(userId, input, {
    runValidators: true,
    new: true,
    lean: true,
  }).select("-password");
  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId).lean();
  return user;
};
