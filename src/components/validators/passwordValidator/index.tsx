import bcrypt from "bcryptjs";

export const comparePassword = (inputPassword: string, storedPassword: string): boolean => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};
