import { test } from "@playwright/test";
import {
  registerUser,
  loginUser,
  logoutUser,
  changePassword
} from "../helpers/userHelpers";
import { user } from "../helpers/userData";

// ----------------------------
// Test: Visitor flow – Register, Login, and Logout
// ----------------------------
// This test validates the full lifecycle of a visitor user:
// 1. Registering a new account
// 2. Logging out after registration
// 3. Logging in with the registered credentials
// 4. Logging out again
test("Visitor can register, login and logout", async ({ page }) => {
  // Register a new user
  await registerUser(page, user);

  // Logout immediately after registration
  await logoutUser(page);

  // Login with the same user credentials to verify login works
  await loginUser(page, user);

  // Logout again to complete the user flow
  await logoutUser(page);
});
