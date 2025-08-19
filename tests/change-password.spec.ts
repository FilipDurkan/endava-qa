import test from "@playwright/test";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser
} from "../helpers/userHelpers";
import { user } from "../helpers/userData";

// ----------------------------
// Test: Registered user changes password and can login with the new password
// ----------------------------
test("Registered user can change password and login with new password", async ({
  page
}) => {
  const newPassword = "NewPassword456!";

  // Register a new user (or handle existing email)
  await registerUser(page, user);

  // Change the user's password from the old one to the new password
  await changePassword(page, user.password, newPassword);

  // Logout after changing password
  await logoutUser(page);

  // Update the user object to reflect the new password
  const newUser = { ...user, password: newPassword };

  // Login with the newly updated password to verify change was successful
  await loginUser(page, newUser);

  // Logout again to complete the test scenario
  await logoutUser(page);
});
