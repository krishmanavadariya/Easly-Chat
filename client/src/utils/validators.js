import { isValidUsername } from "6pp";

const customIsValidUsername = (username) => {
  // Check if the username contains only valid characters including hyphens
  const regex = /^[a-zA-Z0-9-]+$/;
  return isValidUsername(username) || regex.test(username);
};

export const usernameValidator = (username) => {
  if (!customIsValidUsername(username))
    return { isValid: false, errorMessage: "Username is Invalid" };
  return { isValid: true, errorMessage: "" };
};
 