import { comparePassword } from "components/validators/passwordValidator"; // Import the comparePassword function

export const validateUser = (
  email: string,
  password: string,
  storedEmail: string,
  storedPassword: string
): boolean => {
  return email === storedEmail && comparePassword(password, storedPassword);
};
