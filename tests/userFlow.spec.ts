import { test } from '@playwright/test';
import { registerUser, loginUser, logoutUser, changePassword } from '../helpers/userHelpers';
import { user } from '../helpers/userData';

// ----------------------------
// Visitor flow: Register + Login + Logout

// This test checks the complete flow for a visitor user of visiting a page, registering, logging in, and logging out.
test('Visitor can register, login and logout', async ({ page }) => {


  // Register
  await registerUser(page, user);

  // Logout after registration
  await logoutUser(page);

  // Login with same credentials
  await loginUser(page, user);

  // Logout again
  await logoutUser(page);
});

