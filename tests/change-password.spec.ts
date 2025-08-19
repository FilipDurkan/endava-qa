import test from "@playwright/test";
import { changePassword, loginUser, logoutUser, registerUser } from "../helpers/userHelpers";
import { user } from "../helpers/userData";
// ----------------------------
//  Registered user changes password

// ----------------------------
test('Registered user can change password and login with new password', async ({ page }) => {

  const newPassword = 'NewPassword456!';
  await registerUser(page, user);

  // Change password
  await changePassword(page, user.password, newPassword);

  // Logout
  await logoutUser(page);

  // Update user object to use new password
  const newUser = {...user, password: newPassword};

  // Login with new password
  await loginUser(page, newUser);

  // Logout again
  await logoutUser(page);
});