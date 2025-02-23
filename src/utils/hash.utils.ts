import bcrypt from "bcrypt";

export const hash = async (
  password: string,
  isHashed: boolean
): Promise<string> => {
  if (isHashed) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } else {
    return password;
  }
};

export const verify = async (
  password: string,
  candidatePassword: string,
  isHashed: boolean
): Promise<boolean> => {
  if (isHashed) {
    const isMatch = await bcrypt.compare(candidatePassword, password);
    return isMatch;
  } else {
    return password === candidatePassword;
  }
};
